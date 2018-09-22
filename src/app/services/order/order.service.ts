import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {ClientContextService} from "../client-context/client-context.service";
import {Order} from "./order";
import {ShoppingBasketService} from "../shopping-basket/shopping-basket.service";
import {Address} from "./address";
import {ContactData} from "./contact-data";
import {DeliveryType} from "./delivery-type";
import {PaymentType} from "./payment-type";

@Injectable({
  providedIn: 'root'
})
export class OrderService implements CanActivate {
  private order: Order = null;
  public static STATE_APPROVED: string = 'APPROVED';
  public static STATE_COMPLETED: string = 'COMPLETED';
  public static STATE_CANCELED: string = 'CANCELED';
  public static CODE_TRANSLATION_ORDER_CREATED: string = 'ORDER-CREATED';
  public static CODE_TRANSLATION_SIGN_IN_FIRST: string = 'SIGN-IN-FIRST-PLEASE';
  public static CODE_TRANSLATION_ORDER_DETAIL_TAKEN_OVER_FROM_LATEST: string = 'ORDER-DETAIL-TAKEN-OVER-FROM-LATEST-ORDER';



  constructor(
    private http: HttpClient
    , private clientContextService: ClientContextService
    , private shoppingBasketService: ShoppingBasketService
    , private router: Router
    , private translate: TranslateService
    , private snackBar: MatSnackBar
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const orderId: string = localStorage.getItem('orderId');
    const notReady: boolean = (!orderId && !this.shoppingBasketService.shoppingBasket ? true : false);
    const hasToken: boolean = (this.clientContextService.getToken().value == '' ? false : true);
    let basketIsEmpty: boolean = false;
    if (!notReady) {
      basketIsEmpty = (this.shoppingBasketService.shoppingBasket.items.length === 0 ? true : false);
    }
    const checkoutOk = (!notReady && hasToken && !basketIsEmpty? true: false);

    return of<boolean>(checkoutOk)
      .pipe(
        tap((ok: boolean) => {
          if (notReady || basketIsEmpty) {
            this.router.navigate(['home']).then();
          }
          else if (!hasToken) {
            this.translate.get(OrderService.CODE_TRANSLATION_SIGN_IN_FIRST).subscribe(translated => {
                this.snackBar.open(translated, null, {duration: 2500, panelClass: 'snackbar'});
                this.router.navigate(['my-account']).then();
              }
            );
          }
        })
      );
  }

  public getOrder(): Observable<Order> {
    const orderId: string = localStorage.getItem('orderId');

    if (this.order) {
      return of<Order>(this.order);
    }
    else if (!orderId) {
      console.log('OrderService.initLazy(), no order -> will be created');
      return this.create()
        .pipe(
          tap((order) => {
            this.order = order;
            localStorage.setItem('orderId', this.order._id);
            if(this.order.state === 'NEW SETUP_FROM_LATEST')  {
              this.translate.get(OrderService.CODE_TRANSLATION_ORDER_DETAIL_TAKEN_OVER_FROM_LATEST).subscribe(translated => {
                  this.snackBar.open(translated, null, {duration: 2500, panelClass: 'snackbar'});
                }
              );
            }
          })
        );
    }
    else {
      console.log('OrderService.initLazy() order already exists, get order');
      return this.get(orderId)
        .pipe(
          tap((order) => this.order = order)
        );
    }
  }

  private create(): Observable<Order> {
    const shoppingBasketId: string = this.shoppingBasketService.shoppingBasket._id;
    return this.http.post<Order>(ClientContextService.BACKEND_URL_ORDER + 'create', {"shoppingBasketId": shoppingBasketId}, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.clientContextService.getToken().value}
      }
    ).pipe(
      tap(() => console.log('OrderService.create() ok'))
    );
  }

  public get(id: string): Observable<Order> {
    return this.http.get<Order>(ClientContextService.BACKEND_URL_ORDER_DETAILS + '?id=' + id, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.clientContextService.getToken().value}
      }
    ).pipe(
      tap(() => console.log('OrderService.get() ok'))
    );
  }

  public getAll(): Observable<Order> {
    return this.http.get<Order>(ClientContextService.BACKEND_URL_ORDER_ALL, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('OrderService.get() ok'))
    );
  }

  public updateDeliveryAddress(deliveryAddress: Address): Observable<Order> {
    return this.change('change-delivery-address', {"orderId": this.order._id, "deliveryAddress": deliveryAddress});
  }

  public updateContactData(contactData: ContactData): Observable<Order> {
    return this.change('change-contact-data', {"orderId": this.order._id, "contactData": contactData});
  }

  public updateDeliveryType(deliveryType: DeliveryType): Observable<Order> {
    return this.change('change-delivery-type', {"orderId": this.order._id, "deliveryType": deliveryType});
  }

  public updatePaymentType(paymentType: PaymentType): Observable<Order> {
    return this.change('change-payment-type', {"orderId": this.order._id, "paymentType": paymentType});
  }


  private clear() {
    this.order = null;
    localStorage.removeItem('orderId');
  }

  public approve(): Observable<Order> {
    return this.http.patch<Order>(ClientContextService.BACKEND_URL_ORDER + 'state', {
        "orderId": this.order._id,
        "state": OrderService.STATE_APPROVED
      }, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.clientContextService.getToken().value}
      }
    ).pipe(
      tap(result => {
        this.clear();
        this.shoppingBasketService.clear();
      })
    );

  }

  public updateState(orderId: string, state: string): Observable<Order> {
    return this.http.patch<Order>(ClientContextService.BACKEND_URL_ORDER + 'state', {
        "orderId": orderId,
        "state": state
      }, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.clientContextService.getToken().value}
      }
    );
  }


  private change(urlPath: string, bodyJson: any): Observable<Order> {
    return this.http.patch<Order>(ClientContextService.BACKEND_URL_ORDER + urlPath, bodyJson, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.clientContextService.getToken().value}
      }
    ).pipe(
      tap((order) => this.order = order)
    );
  }


}
