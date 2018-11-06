import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {tap, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ShoppingBasket} from "./shopping-basket";
import {ShoppingBasketItem} from "./shopping-basket-item";
import {backendUrls} from "../../constants/backend-urls";
import {Logger} from "../logger/logger";


@Injectable({
  providedIn: 'root'
})
export class ShoppingBasketService {

  public shoppingBasket: ShoppingBasket = null;

  constructor(
    private http: HttpClient
  ) {
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
            Logger.consoleLog(this.constructor.name, 'initBasket', 'shoppingBasket loaded');
          })
          , map(() => true)
        );
    }
    else {
      return this.create()
        .pipe(
          tap((shoppingBasket: ShoppingBasket) => {
            this.shoppingBasket = shoppingBasket;
            localStorage.setItem('shoppingBasketId', this.shoppingBasket._id);
            Logger.consoleLog(this.constructor.name, 'initBasket', 'no shoppingBasket -> created');
          })
          , map(() => true)
        );
    }
  }

  public clear() {
    localStorage.removeItem('shoppingBasketId');
    this.initBasket();
    Logger.consoleLog(this.constructor.name, 'clear', 'ok');
  }

  public create(): Observable<ShoppingBasket> {
    return this.http.post<ShoppingBasket>(backendUrls.shoppingBasket + 'create', {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => Logger.consoleLog(this.constructor.name, 'create', 'ok'))
    );
  }

  public get(shoppingBasketID: ShoppingBasket["_id"]): Observable<ShoppingBasket> {
    return this.http.get<ShoppingBasket>(backendUrls.shoppingBasket + '?id=' + shoppingBasketID, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => Logger.consoleLog(this.constructor.name, 'get', 'ok'))
    );
  }

  public addItem(articleId: ShoppingBasketItem["articleID"], articleAmount: ShoppingBasketItem["articleAmount"]): Observable<ShoppingBasket> {
    const shoppingBasketItem = new ShoppingBasketItem(this.shoppingBasket._id, articleId, articleAmount);
    return this.http.post<ShoppingBasket>(backendUrls.shoppingBasket + 'add-item', shoppingBasketItem, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((shoppingBasket: ShoppingBasket) => {
        this.shoppingBasket = shoppingBasket;
        Logger.consoleLog(this.constructor.name, 'addItem', 'ok')
      })
    );
  }

  public changeItemAmount(articleId: ShoppingBasketItem["articleID"], articleAmount: ShoppingBasketItem["articleAmount"]): Observable<ShoppingBasket> {
    const shoppingBasketItem = new ShoppingBasketItem(this.shoppingBasket._id, articleId, articleAmount);
    return this.http.patch<ShoppingBasket>(backendUrls.shoppingBasket + 'change-item-amount', shoppingBasketItem, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((shoppingBasket: ShoppingBasket) => {
        this.shoppingBasket = shoppingBasket;
        Logger.consoleLog(this.constructor.name, 'changeItemAmount', 'ok')
      })
    );
  }

  public removeItem(articleId: ShoppingBasketItem["articleID"]): Observable<ShoppingBasket> {
    const shoppingBasketItem = new ShoppingBasketItem(this.shoppingBasket._id, articleId, 4711);
    return this.http.post<ShoppingBasket>(backendUrls.shoppingBasket + 'remove-item', shoppingBasketItem, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((shoppingBasket: ShoppingBasket) => {
        this.shoppingBasket = shoppingBasket;
        Logger.consoleLog(this.constructor.name, 'removeItem', 'ok')
      })
    );
  }

}
