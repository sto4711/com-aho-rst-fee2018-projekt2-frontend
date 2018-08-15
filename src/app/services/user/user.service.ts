import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from 'src/app/services/user/user';
import {A_rest_client} from "src/app/commons/a_rest_client";
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
    return this.http.get<User[]>(A_rest_client.BACKEND_WEBSHOP_URL + 'admin/user', {
      headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    ).pipe(
      tap((users: User[]) => console.log("get users ok"))/*,
      catchError(this.handleError<Token>('signin'))*/
    );
  }

}
