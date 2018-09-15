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

  public shoppingBasket: ShoppingBasket = null;

  constructor(
    private http: HttpClient
  ) {
    this.init();
  }


  private init() {
    const shoppingBasketId = localStorage.getItem('shoppingBasketId');
    if (shoppingBasketId == null) {
      this.postCreate()
        .subscribe(shoppingBasket => {
            this.shoppingBasket = shoppingBasket;
            localStorage.setItem('shoppingBasketId', this.shoppingBasket._id);
            console.log('init(), no shoppingBasket -> created');
          }
        );
    } else {
      this.get(shoppingBasketId)
        .subscribe(shoppingBasket => {
            this.shoppingBasket = shoppingBasket;
            console.log('init(), shoppingBasket loaded');
          }
        );
    }
  }


  public postCreate(): Observable<ShoppingBasket> {
    return this.http.post<ShoppingBasket>(ClientContextService.BACKEND_URL_SHOPPINGBASKET + 'create', {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('create ok'))
    );
  }

  public get(shoppingBasketID: ShoppingBasket["_id"]): Observable<ShoppingBasket> {
    return this.http.get<ShoppingBasket>(ClientContextService.BACKEND_URL_SHOPPINGBASKET + '?id=' + shoppingBasketID, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('get ok'))
    );
  }


  addItem(articleId: ShoppingBasketItem["articleID"], articleAmount: ShoppingBasketItem["articleAmount"]): Observable<ShoppingBasket> {
    const shoppingBasketItem = new ShoppingBasketItem(this.shoppingBasket._id, articleId, articleAmount);
    return this.http.post<ShoppingBasket>(ClientContextService.BACKEND_URL_SHOPPINGBASKET + 'add-item', shoppingBasketItem, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((shoppingBasket: ShoppingBasket) => this.shoppingBasket = shoppingBasket)
    );
  }

  changeItemAmount(articleId: ShoppingBasketItem["articleID"], articleAmount: ShoppingBasketItem["articleAmount"]): Observable<ShoppingBasket> {
    const shoppingBasketItem = new ShoppingBasketItem(this.shoppingBasket._id, articleId, articleAmount);
    return this.http.post<ShoppingBasket>(ClientContextService.BACKEND_URL_SHOPPINGBASKET + 'change_item_amount', shoppingBasketItem, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((shoppingBasket: ShoppingBasket) => this.shoppingBasket = shoppingBasket)
    );
  }

  removeItem(articleId: ShoppingBasketItem["articleID"]): Observable<ShoppingBasket> {
    const shoppingBasketItem = new ShoppingBasketItem(this.shoppingBasket._id, articleId, 4711);
    return this.http.post<ShoppingBasket>(ClientContextService.BACKEND_URL_SHOPPINGBASKET + 'remove_item', shoppingBasketItem, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((shoppingBasket: ShoppingBasket) => this.shoppingBasket = shoppingBasket)
    );
  }


}
