import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

import {Token} from 'src/app/services/login/token';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {User} from "../admin/user/user";
import {Login} from "./login";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {
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



}
