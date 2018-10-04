import {Injectable} from '@angular/core';
import {ClientContextService} from "../client-context/client-context.service";
import {Observable, of} from "rxjs";
import {tap, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ShoppingBasket} from "./shopping-basket";
import {ShoppingBasketItem} from "./shopping-basket-item";


@Injectable({
  providedIn: 'root'
})
export class ShoppingBasketService {

  public shoppingBasket: ShoppingBasket = null;

  constructor(
    private http: HttpClient
  ) {
   // this.initBasket();
  }

  public getShoppingBasket(): ShoppingBasket {
    return this.shoppingBasket;
  }

  public initBasket(): Observable<boolean> {
    const shoppingBasketId = localStorage.getItem('shoppingBasketId');

    if (shoppingBasketId) {
      return this.get(shoppingBasketId)
        .pipe(
          tap((shoppingBasket: ShoppingBasket) => {
            this.shoppingBasket = shoppingBasket;
            localStorage.setItem('shoppingBasketId', this.shoppingBasket._id);
            console.log('initShoppingBasket(), shoppingBasket loaded');
          })
         ,map((value) => true)
        );

        // .subscribe(shoppingBasket => {
        //     this.shoppingBasket = shoppingBasket;
        //     localStorage.setItem('shoppingBasketId', this.shoppingBasket._id);
        //     console.log('initShoppingBasket(), shoppingBasket loaded');
        //   }
        // );
    }
    else {
      return this.create()
        .pipe(
          tap((shoppingBasket: ShoppingBasket) => {
            this.shoppingBasket = shoppingBasket;
            localStorage.setItem('shoppingBasketId', this.shoppingBasket._id);
            console.log('initShoppingBasket(), no shoppingBasket -> created');
          })
          ,map((value) => true)
        );
        // .subscribe(shoppingBasket => {
        //     this.shoppingBasket = shoppingBasket;
        //     localStorage.setItem('shoppingBasketId', this.shoppingBasket._id);
        //     console.log('initShoppingBasket(), no shoppingBasket -> created');
        //   }
        // );
    }
  }

  public clear() {
    localStorage.removeItem('shoppingBasketId');
    this.initBasket();
  }

  public create(): Observable<ShoppingBasket> {
    return this.http.post<ShoppingBasket>(ClientContextService.BACKEND_URL_SHOPPING_BASKET + 'create', {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('create ok'))
    );
  }

  public get(shoppingBasketID: ShoppingBasket["_id"]): Observable<ShoppingBasket> {
    return this.http.get<ShoppingBasket>(ClientContextService.BACKEND_URL_SHOPPING_BASKET + '?id=' + shoppingBasketID, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('get ok'))
    );
  }


  addItem(articleId: ShoppingBasketItem["articleID"], articleAmount: ShoppingBasketItem["articleAmount"]): Observable<ShoppingBasket> {
    const shoppingBasketItem = new ShoppingBasketItem(this.shoppingBasket._id, articleId, articleAmount);
    return this.http.post<ShoppingBasket>(ClientContextService.BACKEND_URL_SHOPPING_BASKET + 'add-item', shoppingBasketItem, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((shoppingBasket: ShoppingBasket) => this.shoppingBasket = shoppingBasket)
    );
  }

  changeItemAmount(articleId: ShoppingBasketItem["articleID"], articleAmount: ShoppingBasketItem["articleAmount"]): Observable<ShoppingBasket> {
    const shoppingBasketItem = new ShoppingBasketItem(this.shoppingBasket._id, articleId, articleAmount);
    return this.http.patch<ShoppingBasket>(ClientContextService.BACKEND_URL_SHOPPING_BASKET + 'change-item-amount', shoppingBasketItem, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((shoppingBasket: ShoppingBasket) => this.shoppingBasket = shoppingBasket)
    );
  }

  removeItem(articleId: ShoppingBasketItem["articleID"]): Observable<ShoppingBasket> {
    const shoppingBasketItem = new ShoppingBasketItem(this.shoppingBasket._id, articleId, 4711);
    return this.http.post<ShoppingBasket>(ClientContextService.BACKEND_URL_SHOPPING_BASKET + 'remove-item', shoppingBasketItem, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((shoppingBasket: ShoppingBasket) => this.shoppingBasket = shoppingBasket)
    );
  }

}
