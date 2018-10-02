import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ClientContextService} from "../client-context/client-context.service";
import {Order} from "./order";
import {ShoppingBasketService} from "../shopping-basket/shopping-basket.service";
import {Address} from "./address";
import {ContactData} from "./contact-data";
import {DeliveryType} from "./delivery-type";
import {PaymentType} from "./payment-type";
import {SnackBarService} from "../commons/snack-bar/snack-bar.service";
import {UserService} from "../user/user.service";
import {ShoppingBasket} from "../shopping-basket/shopping-basket";

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


  constructor(
    private http: HttpClient
    , private userService: UserService
    , private shoppingBasketService: ShoppingBasketService
    , private router: Router
    , private snackBarService: SnackBarService
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const hasNoToken: boolean = (this.userService.getToken() === '' ? true : false);
    let basketIsEmpty: boolean = true;
    if (this.shoppingBasketService.shoppingBasket) {
      basketIsEmpty = (this.shoppingBasketService.shoppingBasket.items.length === 0 ? true : false);
    }

    return of<boolean>((basketIsEmpty || hasNoToken ? false : true))
      .pipe(
        tap((ok: boolean) => {
          if (basketIsEmpty) {
            this.router.navigate(['home']).then();
          }
          else if (hasNoToken) {
            this.snackBarService.showInfo(OrderService.CODE_TRANSLATION_SIGN_IN_FIRST);
            this.router.navigate(['my-account']).then();
          }
        })
      );
  }

  public getOrder(): Observable<Order> {
    const orderId: string = localStorage.getItem('orderId');

    if (this.order) {
      this.order.doNotStep = false;
      return of<Order>(this.order);
    }
    else if (!orderId) {
      console.log('OrderService.getOrder(), no order -> will be created');
      return this.create()
        .pipe(
          tap((order) => {
            this.order = order;
            localStorage.setItem('orderId', this.order._id);
            if (this.order.state === 'NEW COPY OF') {
              this.order.doNotStep = true;
            }
          })
        );
    }
    else {
      console.log('OrderService.getOrder() order already exists, get order');
      return this.get(orderId)
        .pipe(
          tap((order) => {
            this.order = order;
            this.order.doNotStep = false;
          })
        );
    }
  }

  private create(): Observable<Order> {
    const shoppingBasketId: string = this.shoppingBasketService.shoppingBasket._id;
    return this.http.post<Order>(ClientContextService.BACKEND_URL_ORDER + 'create', {"shoppingBasketId": shoppingBasketId}, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.userService.getToken()}
      }
    ).pipe(
      tap(() => console.log('OrderService.create() ok'))
    );
  }

  public get(id: string): Observable<Order> {
    return this.http.get<Order>(ClientContextService.BACKEND_URL_ORDER_DETAILS + '?id=' + id, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.userService.getToken()}
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


  public clear() {
    this.order = null;
    localStorage.removeItem('orderId');
    console.log('OrderService.clear(), ok');
  }

  public approve(): Observable<Order> {
    return this.http.patch<Order>(ClientContextService.BACKEND_URL_ORDER + 'state', {
        "orderId": this.order._id,
        "state": OrderService.STATE_APPROVED
      }, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.userService.getToken()}
      }
    ).pipe(
      tap(result => {
        this.clear();
        this.shoppingBasketService.clear();
      })
    );

  }

  public updateOrder(orderData: any): Observable<Order> {
    return this.http.patch<Order>(ClientContextService.BACKEND_URL_ORDER + 'update', orderData, {
        headers: {'Content-Type': 'application/json'}
      }
    );
  }

  public deleteOrder(orderID: Order["_id"]): Observable<Order> {
    return this.http.patch<Order>(ClientContextService.BACKEND_URL_ORDER + 'delete-order', {'_id': orderID}, {
        headers: {'Content-Type': 'application/json'}
      }
    );
  }

  public resetOrder() {
    this.getOrder()
      .subscribe(order => {
          const orderId = order._id;
          this.clear();
          this.deleteOrder(orderId)
            .subscribe(result => {
              console.log('OrderService.resetOrder(), ok');
              }
            );
        }
      );
  }

  private change(urlPath: string, bodyJson: any): Observable<Order> {
    return this.http.patch<Order>(ClientContextService.BACKEND_URL_ORDER + urlPath, bodyJson, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.userService.getToken()}
      }
    ).pipe(
      tap((order) => {
        this.order = order;
      })
    );
  }


}
