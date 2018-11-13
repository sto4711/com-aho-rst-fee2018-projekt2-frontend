import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {User} from 'src/app/services/user/user';
import {Login} from './login';
import {backendUrls} from '../../constants/backend-urls';
import {LoggerService} from '../logger/logger.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;
  public differentUserHasLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
  ) {
  }

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
            LoggerService.consoleLog(this.constructor.name, 'initUser', 'user loaded');
          })
          , map(() => true)
        );
    } else {
      return of<boolean>(true);
    }
  }

  public get(userID: User['_id']): Observable<User> {
    return this.http.get<User>(backendUrls.user + '?id=' + userID, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => LoggerService.consoleLog(this.constructor.name, 'get', 'ok'))
    );
  }


  public signIn(login: Login): Observable<User> {
    this.differentUserHasLoggedIn = false;
    return this.http.post<User>(backendUrls.user + 'sign-in', login, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((user: User) => {
        if (this.user) {
          if (this.user._id !== user._id) {
            this.differentUserHasLoggedIn = true;
            LoggerService.consoleLog(this.constructor.name, 'signIn', 'a different user has sign in');
          }
        }
        this.user = user;
        localStorage.setItem('userId', user._id);
        LoggerService.consoleLog(this.constructor.name, 'signIn', 'ok');
      })
    );
  }

  public signOut(): Observable<string> {
    return this.http.post<string>(backendUrls.user + 'sign-out', {'userId': this.user._id}, {
      headers: {'Content-Type': 'application/json'}
    }, ).pipe(
      tap(() => {
        this.user = null;
        localStorage.removeItem('userId');
        LoggerService.consoleLog(this.constructor.name, 'signOut', 'ok');
      })
    );
  }

  public create(user: User): Observable<User> {
    return this.http.post<User>(backendUrls.user + 'create', user, {
      headers: {'Content-Type': 'application/json'}
    }, ).pipe(
      tap(() => {
        this.user = user;
        LoggerService.consoleLog(this.constructor.name, 'create', 'ok');
      })
    );
  }

  public updateUser(user: User): Observable<User> {
    return this.http.post<User>(backendUrls.user + 'updateUser', user, {
      headers: {'Content-Type': 'application/json'}
    }, ).pipe(
      tap(() => {
        LoggerService.consoleLog(this.constructor.name, 'updateUser', 'ok');
      })
    );
  }

  public deleteUser(userID: User['_id']): Observable<User> {
    return this.http.post<User>(backendUrls.user + 'deleteUser', {'_id': userID}, {
      headers: {'Content-Type': 'application/json'}
    }, ).pipe(
      tap( () => LoggerService.consoleLog(this.constructor.name, 'deleteUser', 'ok'))
    );
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(backendUrls.users, {
        headers: {'Content-Type': 'application/json', 'Authorization': this.getToken()}
      }
    ).pipe(
      tap(() => LoggerService.consoleLog(this.constructor.name, 'getUsers', 'ok'))
    );
  }


}
