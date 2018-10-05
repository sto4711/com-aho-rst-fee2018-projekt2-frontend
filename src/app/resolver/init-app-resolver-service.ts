import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {OrderService} from "../services/order/order.service";
import {UserService} from "../services/user/user.service";
import {ShoppingBasketService} from "../services/shopping-basket/shopping-basket.service";
import {tryCatch} from "rxjs/internal-compatibility";


@Injectable()
export class InitAppResolverService implements CanActivate {

  constructor(
    private orderService: OrderService
    , private shoppingBasketService: ShoppingBasketService
    , private userService: UserService
    ) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      await this.shoppingBasketService.initBasket().toPromise();
      await this.userService.initUser().toPromise();
      console.log('InitAppResolverService.resolve(), cache loaded');

      return new Promise<boolean>((resolve, reject) => {
        resolve(true);
      });
    } catch {
      return new Promise<boolean>((resolve, reject) => {
        resolve(false);
      });
    }
  }

}
