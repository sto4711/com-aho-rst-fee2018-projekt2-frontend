import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {User} from 'src/app/services/user/user';
import {Token} from 'src/app/services/user/token';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SnackBarService} from '../commons/snack-bar/snack-bar.service';
import {Login} from "./login";


@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  private user$: User;
  private static CODE_TRANSLATION_NO_TOKEN: string = 'SIGN-IN-FIRST-PLEASE';
  private static CODE_TRANSLATION_LOGOUT_SUCCESSFUL: string = 'LOGOUT-SUCCESSFUL';

  constructor(
    private http: HttpClient,
    private router: Router,
    private clientContextService: ClientContextService,
    private snackBarService: SnackBarService
  ) {
  }


  public getUser(): Observable<User> {
    const userId: string = localStorage.getItem('userId');

    if (this.user$) {
      return of<User>(this.user$);
    }
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

  public signin(login: Login): Observable<User> {
    return this.http.post<User>(ClientContextService.BACKEND_URL_USER + 'signin', login, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((user: User) => {
        this.user$ = user;
        console.log('signin ok');
      })/*,
      catchError(this.handleError<Token>('signin'))*/
    );
  }

  public signout(): Observable<string> {
    return this.http.post<string>(ClientContextService.BACKEND_URL_USER + 'signout', {}, {
      headers: {'Content-Type': 'application/json', 'Authorization': this.user$.token}
    },).pipe(
      tap((result: string) => {
        this.user$ = null;
        console.log('signout ok');
        this.snackBarService.showInfo(UserService.CODE_TRANSLATION_LOGOUT_SUCCESSFUL);
      })
    );
  }

  public create(user: User): Observable<Token> {
    return this.http.post<Token>(ClientContextService.BACKEND_URL_USER + 'create', user, {
      headers: {'Content-Type': 'application/json'}
    },).pipe(
      tap((user: User) => {
        this.user$ = user;
        console.log('UserService.create() ok');
      })
    );
  }

  public getUsers(token: Token): Observable<User[]> {
    return this.http.get<User[]>(ClientContextService.BACKEND_URL_USERS, {
        headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    ).pipe(
      tap((users: User[]) => console.log('UserService.get() ok'))
    );
  }


}
