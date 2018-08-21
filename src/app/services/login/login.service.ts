import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {Login} from 'src/app/services/login/login';
import {Token} from 'src/app/services/login/token';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
    , private clientContextService: ClientContextService) {
  }

  /** gets token back */
  signin(login: Login): Observable<Token> {
    return this.http.post<Token>(this.clientContextService.getBackendURL_auth() + 'signin', login, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(() => console.log('signin ok'))/*,
      catchError(this.handleError<Token>('signin'))*/
    );
  }

  signout(token: Token): Observable<any> {
    return this.http.post<Token>(this.clientContextService.getBackendURL_auth()+ 'signout', null, {
      headers: {'Content-Type': 'application/json', 'Authorization': token.value}
    },).pipe(
      tap((/*result: string*/) => console.log('signout ok'))
    );
  }

  isloggedin() {
    return false;
  }

}
