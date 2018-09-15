import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ShoppingBasket} from "../shopping-basket/shopping-basket";
import {tap} from "rxjs/operators";
import {ClientContextService} from "../client-context/client-context.service";
import {HttpClient} from "@angular/common/http";
import {Token} from "../login/token";
import {ShoppingBasketItem} from "../shopping-basket/shopping-basket-item";
import {Article} from "../articles/article";
import {Order} from "./order";
import {ShoppingBasketService} from "../shopping-basket/shopping-basket.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order: Order = null;

  constructor(
    private http: HttpClient
    , private clientContextService: ClientContextService
    , private shoppingBasketService: ShoppingBasketService
    , private router: Router
  ) {
  }

  public initLazy(): Observable<Order> {
    const orderId: string = localStorage.getItem('orderId');

    if (!this.shoppingBasketService.shoppingBasket) {
      //hack....
      console.log('OrderService.initLazy() THIS IS NOT FINAL... Basket not yet loaded, route to Basket')
      this.router.navigate(['shopping-basket']).then();
      return of<Order>(new Order());
    }
    else if (!orderId) {
      console.log('OrderService.initLazy(), no order -> will be created');
      return this.create(
      ).pipe(
        tap((order) => {
          this.order = order;
          localStorage.setItem('orderId', this.order._id);
        })
      );
    }
    else {
      console.log('OrderService.initLazy() order already exists, get order');
      return this.get(orderId
      ).pipe(
        tap((order) => this.order = order)
      );
    }
  }

  public create(): Observable<Order> {
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


}
