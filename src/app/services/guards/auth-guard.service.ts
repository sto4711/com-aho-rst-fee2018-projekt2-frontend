import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../user/user.service';
import {SnackBarService} from '../commons/snack-bar/snack-bar.service';
import {OrderService} from "../order/order.service";
import {tap} from "rxjs/operators";
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  public static CODE_TRANSLATION_ORDER_CREATED: string = 'ORDER-CREATED';
  public static CODE_TRANSLATION_SIGN_IN_FIRST: string = 'SIGN-IN-FIRST-PLEASE';
  public static CODE_TRANSLATION_YOU_NEED_ADMINISTRATOR_RIGHTS: string = 'YOU-NEED-ADMINISTRATOR-RIGHTS';

  constructor(
    private userService: UserService
    , private snackBarService: SnackBarService
    , private router: Router
  ) {
  }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const canActivate: boolean = (this.userService.getToken() !== '' ? true : false);

    return of<boolean>((canActivate))
      .pipe(
        tap((ok: boolean) => {
          if (!ok) {
            this.snackBarService.showInfo(AuthGuardService.CODE_TRANSLATION_SIGN_IN_FIRST);
            console.log('AuthGuardService.canActivate() can not');
            this.router.navigate(['my-account']).then();
          }
        })
      );
  }

}

