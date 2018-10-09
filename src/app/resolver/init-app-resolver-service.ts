import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot} from "@angular/router";
import {OrderService} from "../services/order/order.service";
import {UserService} from "../services/user/user.service";
import {ShoppingBasketService} from "../services/shopping-basket/shopping-basket.service";
import {Logger} from "../services/logger/logger";

@Injectable()
export class InitAppResolverService implements CanActivate {

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
