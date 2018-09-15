import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ShoppingBasket} from "../shopping-basket/shopping-basket";
import {tap} from "rxjs/operators";
import {ClientContextService} from "../client-context/client-context.service";
import {HttpClient} from "@angular/common/http";
import {Token} from "../login/token";
import {ShoppingBasketItem} from "../shopping-basket/shopping-basket-item";
import {Article} from "../articles/article";
import {Order} from "./order";
import {ShoppingBasketService} from "../shopping-basket/shopping-basket.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order: Order = null;

  constructor(
    private http: HttpClient
    ,private clientContextService: ClientContextService
    ,private shoppingBasketService: ShoppingBasketService
  ) {
    console.log('OrderService.init()');
  }

  private init() {
    const orderId = localStorage.getItem('orderId');
    if (orderId == null) {
      console.log('no order');

      // this.postCreate()
      //   .subscribe(shoppingBasket => {
      //       this.shoppingBasket = shoppingBasket;
      //       localStorage.setItem('shoppingBasketId', this.shoppingBasket._id);
      //       console.log('init(), no shoppingBasket -> created');
      //     }
      //   );
    } else {
      console.log('order already exists');
      // this.get(shoppingBasketId)
      //   .subscribe(shoppingBasket => {
      //       this.shoppingBasket = shoppingBasket;
      //       console.log('init(), shoppingBasket loaded');
      //     }
      //   );
    }
  }


  public postCreate(shoppingBasketId: string): Observable<ShoppingBasket> {
    return this.http.post<ShoppingBasket>(ClientContextService.BACKEND_URL_ORDER + 'create', {"shoppingBasketId" : shoppingBasketId}, {
      headers: {'Content-Type': 'application/json' }
      }
    ).pipe(
      tap(() => console.log('OrderService.create ok'))
    );
  }

  public getOrderDetails( id: string): Observable<Order> {
    return this.http.get<Order>(ClientContextService.BACKEND_URL_ORDER_DETAILS + '?id=' + id , {
        headers: {'Content-Type': 'application/json' }
      }
    ).pipe(
      tap(() => console.log('getOrderDetails ok'))
    );
  }





}
