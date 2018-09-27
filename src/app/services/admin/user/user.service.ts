import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {User} from 'src/app/services/admin/user/user';
import {Token} from 'src/app/services/login/token';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';


@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  public static CODE_TRANSLATION_NO_TOKEN: string = 'SIGN-IN-FIRST-PLEASE';

  constructor(
    private http: HttpClient,
    private router: Router,
    private clientContextService: ClientContextService,
    private snackBarService: SnackBarService

  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const hasNoToken: boolean = (this.clientContextService.getToken().value === '' ? true : false);
    return of<boolean>((hasNoToken))
      .pipe(
        tap((ok: boolean) => {
          if (hasNoToken) {
             // this.router.navigate(['admin/overview']).then();
          } else {
            this.snackBarService.showInfo(UserService.CODE_TRANSLATION_NO_TOKEN);
            this.router.navigate(['my-acount']).then();
          }
        })
      );
  }

  /** gets all the users back */
  get(token: Token): Observable<User[]> {
    return this.http.get<User[]>(ClientContextService.BACKEND_URL_USERS , {
        headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    ).pipe(
      tap((users: User[]) => console.log('UserService.get() ok'))/*,
      catchError(this.handleError<Token>('signin'))*/
    );
  }

  public create(user: User): Observable<Token> {
    return this.http.post<Token>(ClientContextService.BACKEND_URL_USER + 'create', user, {
      headers: {'Content-Type': 'application/json'}
    },).pipe(
      tap((/*result: string*/) => console.log('UserService.create() ok'))
    );
  }


}
