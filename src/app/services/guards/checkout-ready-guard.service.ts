import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../user/user.service';
import {SnackBarService} from '../commons/snack-bar/snack-bar.service';
import {tap} from "rxjs/operators";
import {Observable, of} from 'rxjs';
import {AuthGuardService} from "./auth-guard.service";
import {ShoppingBasketService} from "../shopping-basket/shopping-basket.service";
import {Logger} from "../logger/logger";

@Injectable({
  providedIn: 'root'
})

export class CheckoutReadyGuardService implements CanActivate {

  constructor(
    private shoppingBasketService: ShoppingBasketService
    , private userService: UserService
    , private snackBarService: SnackBarService
    , private router: Router
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const hasNoToken: boolean = (this.userService.getToken() === '' ? true : false);
    const basketIsEmpty: boolean = (this.shoppingBasketService.shoppingBasket.items.length === 0 ? true : false);

    return of<boolean>((basketIsEmpty || hasNoToken ? false : true))
      .pipe(
        tap((ok: boolean) => {
          if (basketIsEmpty) {
            this.router.navigate(['home']).then();
          }
          else if (hasNoToken) {
            this.snackBarService.showInfo(AuthGuardService.CODE_TRANSLATION_SIGN_IN_FIRST);
            Logger.consoleLog(this.constructor.name, 'canActivate', 'can not');
            this.router.navigate(['my-account']).then();
          }
        })
      );
  }

}

