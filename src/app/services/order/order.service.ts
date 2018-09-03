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

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
    ,private clientContextService: ClientContextService
  ) {

  }

  create(shoppingBasketId: string, token: Token): Observable<ShoppingBasket> {
    return this.http.post<ShoppingBasket>(this.clientContextService.getBackendURL_order() + 'create', {"shoppingBasketId" : shoppingBasketId}, {
      headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    ).pipe(
      tap(() => console.log('OrderService.create ok'))
    );
  }

  public getOrderDetails( id: string): Observable<Order> {
    return this.http.get<Order>(this.clientContextService.getBackendURL_orderDetails() + '?id=' + id , {
        headers: {'Content-Type': 'application/json' }
      }
    ).pipe(
      tap(() => console.log('getOrderDetails ok'))
    );
  }





}
