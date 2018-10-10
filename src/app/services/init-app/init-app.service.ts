import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../user/user.service";
import {ShoppingBasketService} from "../shopping-basket/shopping-basket.service";
import {OrderService} from "../order/order.service";
import {Logger} from "../logger/logger";
import {NavigationCancelService} from "../navigation-cancel/navigation-cancel.service";

@Injectable()
export class InitAppService implements CanActivate {

  constructor(
    private orderService: OrderService
    , private shoppingBasketService: ShoppingBasketService
    , private userService: UserService
    , private navigationCancelService: NavigationCancelService
  ) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let ok: boolean = true;
    try {
      await this.shoppingBasketService.initBasket().toPromise();
      await this.userService.initUser().toPromise();
      this.navigationCancelService.init();
      Logger.consoleLog(this.constructor.name, 'canActivate', 'shopping basket & user loaded');
    } catch {
      ok = false;
    }
    return new Promise<boolean>((resolve) => {
      resolve(ok);
    });
  }

}
