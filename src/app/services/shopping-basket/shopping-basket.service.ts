import {Injectable} from '@angular/core';
import {ClientContextService} from "../client-context/client-context.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ShoppingBasket} from "./shopping-basket";
import {ShoppingBasketItem} from "./shopping-basket-item";

@Injectable({
  providedIn: 'root'
})
export class ShoppingBasketService {

  constructor(
    private http: HttpClient
    , private clientContextService: ClientContextService
  ) {
  }

  create(): Observable<ShoppingBasket> {
    return this.http.post<ShoppingBasket>(this.clientContextService.getBackendURL_shoppingBasket() + 'create', {
      headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('create ok'))/*,
      catchError(this.handleError<Token>('signin'))*/
    );
  }

  get( shoppingBasketID: ShoppingBasket["_id"]): Observable<ShoppingBasket> {
    return this.http.get<ShoppingBasket>(this.clientContextService.getBackendURL_shoppingBasket() + '?id=' + shoppingBasketID, {
        headers: {'Content-Type': 'application/json' }
      }
    ).pipe(
      tap(() => console.log('get ok'))
    );
  }


  addItem(shoppingBasketItem: ShoppingBasketItem): Observable<ShoppingBasket> {
    return this.http.post<ShoppingBasket>(this.clientContextService.getBackendURL_shoppingBasket() + 'addItem', shoppingBasketItem, {
      headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('create ok'))/*,
      catchError(this.handleError<Token>('signin'))*/
    );
  }

  removeItem(shoppingBasketItem: ShoppingBasketItem): Observable<ShoppingBasket> {
    return this.http.post<ShoppingBasket>(this.clientContextService.getBackendURL_shoppingBasket() + 'removeItem', shoppingBasketItem, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('create ok'))
    );
  }



}
