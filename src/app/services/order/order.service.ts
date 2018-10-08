import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Order} from "./order";
import {ShoppingBasketService} from "../shopping-basket/shopping-basket.service";
import {Address} from "./address";
import {ContactData} from "./contact-data";
import {DeliveryType} from "./delivery-type";
import {PaymentType} from "./payment-type";
import {UserService} from "../user/user.service";
import {backendUrls} from "../../constants/backend-urls";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order: Order = null;
  public static STATE_APPROVED: string = 'APPROVED';

  constructor(
    private http: HttpClient
    , private userService: UserService
    , private shoppingBasketService: ShoppingBasketService
  ) {
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
    return this.http.post<Order>(backendUrls.order + 'create', {"shoppingBasketId": shoppingBasketId}, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.userService.getToken()}
      }
    ).pipe(
      tap(() => console.log('OrderService.create() ok'))
    );
  }

  public get(id: string): Observable<Order> {
    return this.http.get<Order>(backendUrls.orderDetails + '?id=' + id, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.userService.getToken()}
      }
    ).pipe(
      tap(() => console.log('OrderService.get() ok'))
    );
  }

  public getAll(): Observable<Order> {
    return this.http.get<Order>(backendUrls.orderAll, {
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
    return this.http.patch<Order>(backendUrls.order + 'state', {
        "orderId": this.order._id,
        "state": OrderService.STATE_APPROVED
      }, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.userService.getToken()}
      }
    );
  }

  public updateOrder(orderData: any): Observable<Order> {
    return this.http.patch<Order>(backendUrls.order + 'update', orderData, {
        headers: {'Content-Type': 'application/json'}
      }
    );
  }

  public deleteOrder(orderID: Order["_id"]): Observable<Order> {
    return this.http.patch<Order>(backendUrls.order + 'delete-order', {'_id': orderID}, {
        headers: {'Content-Type': 'application/json'}
      }
    );
  }

  public async resetOrder() {
    await this.getOrder().toPromise();
    await this.deleteOrder(this.order._id).toPromise();
    this.clear();
    this.shoppingBasketService.clear();
    await this.shoppingBasketService.initBasket().toPromise();
    console.log('OrderService.resetOrder(), ok');
  }

  private change(urlPath: string, bodyJson: any): Observable<Order> {
    return this.http.patch<Order>(backendUrls.order + urlPath, bodyJson, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.userService.getToken()}
      }
    ).pipe(
      tap((order) => {
        this.order = order;
      })
    );
  }


}
