import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {User} from 'src/app/services/user/user';
import {Login} from "./login";
import {backendUrls} from "../../constants/backend-urls";
import {Order} from '../order/order';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;
  public differentUserHasLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
  ) {}

  public getToken(): string {
    return (this.user ? this.user.token : '');
  }

  public getUser(): User {
    return this.user;
  }

  public initUser(): Observable<boolean> {
    const userId: string = localStorage.getItem('userId');
    if (userId) {
      return this.get(userId)
        .pipe(
          tap((user: User) => {
            this.user = user;
            console.log('User.getUser(), user loaded');
          })
          , map((value) => true)
        );
    }else {
      return of<boolean>(true);
    }
  }

  public get(userID: User["_id"]): Observable<User> {
    return this.http.get<User>(backendUrls.user + '?id=' + userID, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('get ok'))
    );
  }


  public signIn(login: Login): Observable<User> {
    this.differentUserHasLoggedIn = false;
    return this.http.post<User>(backendUrls.user + 'signIn', login, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((user: User) => {
        if (this.user) {
          if (this.user._id !== user._id) {
            this.differentUserHasLoggedIn = true;
          }
        }
        this.user = user;
        localStorage.setItem('userId', user._id);
        localStorage.setItem('token', user.token);
        console.log('signin ok');
      })
    );
  }

  public signOut(): Observable<string> {
    return this.http.post<string>(backendUrls.user + 'sign-out', {'userId': this.user._id}, {
      headers: {'Content-Type': 'application/json'}
    },).pipe(
      tap((result: string) => {
        this.user = null;
        localStorage.removeItem('userId');
        console.log('signout ok');
      })
    );
  }

  public create(user: User): Observable<User> {
    return this.http.post<User>(backendUrls.user + 'create', user, {
      headers: {'Content-Type': 'application/json'}
    }, ).pipe(
      tap((user: User) => {
        this.user = user;
        console.log('UserService.create() ok');
      })
    );
  }

  public updateUser(user: any): Observable<User> {
     return this.http.post<User>(backendUrls.user + 'updateUser', user, {
      headers: {'Content-Type': 'application/json'}
    }, ).pipe(
      tap((user: User) => {
        console.log('UserService.updateUser() ok');
      })
    );
  }
  public deleteUser(userID: User['_id']): Observable<User> {
    console.log(userID);
     return this.http.post<User>(backendUrls.user + 'deleteUser', {'_id': userID}, {
      headers: {'Content-Type': 'application/json'}
    }, ).pipe(
      tap((user: User) => {
        console.log('UserService.deleteUser() ok');
      })
    );
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(backendUrls.users, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.getToken()}
      }
    ).pipe(
      tap((users: User[]) => console.log('UserService.get() ok'))
    );
  }


}
