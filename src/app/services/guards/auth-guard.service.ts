import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {SnackBarService} from '../commons/snack-bar/snack-bar.service';
import {tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Logger} from '../logger/logger';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  public static CODE_TRANSLATION_ORDER_CREATED = 'ORDER-CREATED';
  public static CODE_TRANSLATION_SIGN_IN_FIRST = 'SIGN-IN-FIRST-PLEASE';
  public static CODE_TRANSLATION_YOU_NEED_ADMINISTRATOR_RIGHTS = 'YOU-NEED-ADMINISTRATOR-RIGHTS';

  constructor(
    private userService: UserService
    , private snackBarService: SnackBarService
    , private router: Router
  ) {
  }


  public canActivate(): Observable<boolean> {
    const canActivate: boolean = this.userService.getToken() !== '';

    return of<boolean>((canActivate))
      .pipe(
        tap((ok: boolean) => {
          if (!ok) {
            this.snackBarService.showInfo(AuthGuardService.CODE_TRANSLATION_SIGN_IN_FIRST);
            Logger.consoleLog(this.constructor.name, 'canActivate', 'can not');
            this.router.navigate(['my-account']).then();
          }
        })
      );
  }

}

