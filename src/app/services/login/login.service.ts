import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Login} from 'src/app/services/login/login';
import {Token} from 'src/app/services/login/token';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {User} from "../admin/user/user";
import {MatSnackBar} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";
import {OrderService} from "../order/order.service";


@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {
  public static CODE_TRANSLATION_SIGN_IN_FIRST: string = 'SIGN-IN-FIRST-PLEASE';

  constructor(
    private http: HttpClient
    , private clientContextService: ClientContextService
    , private translate: TranslateService
    , private snackBar: MatSnackBar
    , private router: Router
    , private orderService: OrderService
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const hasToken = (this.clientContextService.getToken().value == '' ? false : true);

    return of<boolean>(hasToken)
      .pipe(
        tap((ok: boolean) => {
          if (!hasToken) {
            this.translate.get(LoginService.CODE_TRANSLATION_SIGN_IN_FIRST).subscribe(translated => {
                this.snackBar.open(translated, null, {duration: 2500, panelClass: 'snackbar'});
                this.router.navigate(['my-account']).then();
              }
            );
          }
        })
      );
  }

  /** gets token back */
  public signin(login: Login): Observable<Token> {
    return this.http.post<Token>(ClientContextService.BACKEND_URL_USER + 'signin', login, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('signin ok'))/*,
      catchError(this.handleError<Token>('signin'))*/
    );
  }

  public signout(token: Token): Observable<any> {
    return this.http.post<Token>(ClientContextService.BACKEND_URL_USER + 'signout', null, {
      headers: {'Content-Type': 'application/json', 'Authorization': token.value}
    },).pipe(
      tap((/*result: string*/) => console.log('signout ok'))
    );
  }

  public create(login: Login): Observable<User> {
    return this.http.post<User>(ClientContextService.BACKEND_URL_USER + 'create', login, {
      headers: {'Content-Type': 'application/json'}
    },).pipe(
      tap((/*result: string*/) => console.log('create ok'))
    );
  }


}
