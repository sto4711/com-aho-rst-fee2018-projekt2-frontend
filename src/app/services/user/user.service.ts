import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {User} from 'src/app/services/user/user';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SnackBarService} from '../commons/snack-bar/snack-bar.service';
import {Login} from "./login";
import {ShoppingBasket} from "../shopping-basket/shopping-basket";
import {OrderService} from "../order/order.service";


@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  private user: User;
  public differentUserHasLoggedIn: boolean = false;
  private static CODE_TRANSLATION_NO_TOKEN: string = 'SIGN-IN-FIRST-PLEASE';
  private static CODE_TRANSLATION_LOGOUT_SUCCESSFUL: string = 'LOGOUT-SUCCESSFUL';

  constructor(
    private http: HttpClient,
    private router: Router,
    private clientContextService: ClientContextService,
    private snackBarService: SnackBarService
  ) {
    this.initUser();
  }


  public getToken(): string {
    return (this.user ? this.user.token : '');
  }

  public getUser(): User {
      return this.user;
  }

  private initUser() {
    const userId: string = localStorage.getItem('userId');
    if (userId) {
      this.get(userId)
        .subscribe(user => {
            this.user = user;
            console.log('User.getUser(), user loaded');
          }
        );
    }
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const hasNoToken: boolean = (this.getToken() === '' ? true : false);
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

  public get(userID: User["_id"]): Observable<User> {
    return this.http.get<User>(ClientContextService.BACKEND_URL_USER + '?id=' + userID, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('get ok'))
    );
  }


  public signin(login: Login): Observable<User> {
    this.differentUserHasLoggedIn = false;
    return this.http.post<User>(ClientContextService.BACKEND_URL_USER + 'signin', login, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((user: User) => {
        if(this.user) {
          if(this.user._id !== user._id){
            this.differentUserHasLoggedIn = true;
          }
        }
        this.user = user;
        localStorage.setItem('userId', user._id);
        console.log('signin ok');
      })
    );
  }

  public signout(): Observable<string> {
    return this.http.post<string>(ClientContextService.BACKEND_URL_USER + 'signout', {}, {
      headers: {'Content-Type': 'application/json', 'Authorization': this.getToken()}
    },).pipe(
      tap((result: string) => {
        this.user = null;
        localStorage.removeItem('userId');
        console.log('signout ok');
        this.snackBarService.showInfo(UserService.CODE_TRANSLATION_LOGOUT_SUCCESSFUL);
      })
    );
  }

  public create(user: User): Observable<User> {
    return this.http.post<User>(ClientContextService.BACKEND_URL_USER + 'create', user, {
      headers: {'Content-Type': 'application/json'}
    },).pipe(
      tap((user: User) => {
        this.user = user;
        console.log('UserService.create() ok');
      })
    );
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(ClientContextService.BACKEND_URL_USERS, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.getToken()}
      }
    ).pipe(
      tap((users: User[]) => console.log('UserService.get() ok'))
    );
  }


}
