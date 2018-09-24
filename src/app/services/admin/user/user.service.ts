import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {User} from 'src/app/services/admin/user/user';
import {Token} from 'src/app/services/login/token';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {Login} from "../../login/login";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  /** gets all the users back */
  get(token: Token): Observable<User[]> {
    return this.http.get<User[]>(     ClientContextService.BACKEND_URL_USERS , {
        headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    ).pipe(
      tap((users: User[]) => console.log('UserService.get() ok'))/*,
      catchError(this.handleError<Token>('signin'))*/
    );
  }

  public create(user: User): Observable<User> {
    return this.http.post<User>(ClientContextService.BACKEND_URL_USER + 'create', user, {
      headers: {'Content-Type': 'application/json'}
    },).pipe(
      tap((/*result: string*/) => console.log('UserService.create() ok'))
    );
  }


}
