import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {User} from 'src/app/services/admin/user/user';
import {A_rest_client} from 'src/app/commons/a_rest_client';
import {Token} from 'src/app/services/login/token';


@Injectable({
  providedIn: 'root'
})
export class UserService extends A_rest_client {

  constructor(private http: HttpClient) {
    super();
  }

  /** gets all the users back */
  get(token: Token): Observable<User[]> {
    return this.http.get<User[]>(A_rest_client.BACKEND_WEBSHOP_URL + 'admin/users', {
      headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    ).pipe(
      tap((users: User[]) => console.log('get users ok'))/*,
      catchError(this.handleError<Token>('signin'))*/
    );
  }

}
