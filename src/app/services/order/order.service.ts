import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ShoppingBasket} from "../shopping-basket/shopping-basket";
import {tap} from "rxjs/operators";
import {ClientContextService} from "../client-context/client-context.service";
import {HttpClient} from "@angular/common/http";
import {Token} from "../login/token";
import {ShoppingBasketItem} from "../shopping-basket/shopping-basket-item";

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





}
