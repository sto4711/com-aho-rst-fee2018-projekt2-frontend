import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {A_rest_client} from 'src/app/commons/a_rest_client';
import {Login} from 'src/app/services/login/login';
import {Token} from 'src/app/services/login/token';


@Injectable({
  providedIn: 'root'
})
export class LoginService extends A_rest_client {

  constructor(private http: HttpClient) {
    super();
  }

  /** gets token back */
  signin(login: Login): Observable<Token> {
    return this.http.post<Token>(A_rest_client.BACKEND_WEBSHOP_URL + 'auth/signin', login, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((token: Token) => console.log("signin ok"))/*,
      catchError(this.handleError<Token>('signin'))*/
    );
  }

  signout(token: Token): Observable<any> {
    return this.http.post<Token>("http://localhost:3000/webshop/" + 'auth/signout', null, {
      headers: {'Content-Type': 'application/json', 'Authorization': token.value}
    },).pipe(
      tap((result: string) => console.log("signout ok"))
    );
  }


}
