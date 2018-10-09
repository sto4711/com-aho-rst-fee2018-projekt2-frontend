import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../user/user.service";
import {ShoppingBasketService} from "../shopping-basket/shopping-basket.service";
import {OrderService} from "../order/order.service";
import {Logger} from "../logger/logger";

@Injectable()
export class InitAppService implements CanActivate {

  constructor(
    private orderService: OrderService
    , private shoppingBasketService: ShoppingBasketService
    , private userService: UserService
  ) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let ok: boolean = true;
    try {
      await this.shoppingBasketService.initBasket().toPromise();
      await this.userService.initUser().toPromise();
      Logger.consoleLog(this.constructor.name, 'canActivate', 'shopping basket & user loaded');
    } catch {
      ok = false;
    }
    return new Promise<boolean>((resolve, reject) => {
      resolve(ok);
    });
  }

}
