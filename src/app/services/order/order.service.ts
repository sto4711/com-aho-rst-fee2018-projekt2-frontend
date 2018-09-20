import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {ClientContextService} from "../client-context/client-context.service";
import {HttpClient} from "@angular/common/http";
import {Order} from "./order";
import {ShoppingBasketService} from "../shopping-basket/shopping-basket.service";
import {Router} from "@angular/router";
import {Address} from "./address";
import {ContactData} from "./contact-data";
import {DeliveryType} from "./delivery-type";
import {PaymentType} from "./payment-type";
import {Token} from "../login/token";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order: Order = null;
  public static STATE_APPROVED: string = 'APPROVED';
  public static STATE_COMPLETED: string = 'COMPLETED';
  public static STATE_CANCELED: string = 'CANCELED';
  public static CODE_TRANSLATION_ORDER_CREATED: string = 'ORDER-CREATED';


  constructor(
    private http: HttpClient
    , private clientContextService: ClientContextService
    , private shoppingBasketService: ShoppingBasketService
    , private router: Router
  ) {
  }

  public getOrder(): Observable<Order> {
    const orderId: string = localStorage.getItem('orderId');

    if (this.order) {
      return of<Order>(this.order);
    }
    else if (!orderId && !this.shoppingBasketService.shoppingBasket) {
      console.log('no Basket found, redirect to Basket')
      this.router.navigate(['shopping-basket']).then();
      return of<Order>(new Order());
    }
    else if (!orderId) {
      console.log('OrderService.initLazy(), no order -> will be created');
      return this.create()
        .pipe(
          tap((order) => {
            this.order = order;
            localStorage.setItem('orderId', this.order._id);
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
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('OrderService.create() ok'))
    );
  }

  public get(id: string): Observable<Order> {
    return this.http.get<Order>(ClientContextService.BACKEND_URL_ORDER_DETAILS + '?id=' + id, {
        headers: {'Content-Type': 'application/json'}
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

  public approve(token: Token): Observable<Order> {
    return this.http.patch<Order>(ClientContextService.BACKEND_URL_ORDER + 'state', {
        "orderId": this.order._id,
        "state": OrderService.STATE_APPROVED
      }, {
        headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    ).pipe(
      tap(result => {
        this.clear();
        this.shoppingBasketService.clear();
      })
    );

  }

  public updateState(token: Token, orderId: string, state: string): Observable<Order> {
    return this.http.patch<Order>(ClientContextService.BACKEND_URL_ORDER + 'state', {
        "orderId": orderId,
        "state": state
      }, {
        headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    );
  }


  private change(urlPath: string, bodyJson: any): Observable<Order> {
    return this.http.patch<Order>(ClientContextService.BACKEND_URL_ORDER + urlPath, bodyJson, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((order) => this.order = order)
    );
  }


}
