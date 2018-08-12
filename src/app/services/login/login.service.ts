import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Login} from 'src/app/services/login/login';
import {Token} from 'src/app/services/login/token';
import {Routes} from "@angular/router";
import {LoginComponent} from "../../components/login/login.component";

const backend_URL: string = "http://localhost:3000/webshop/";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  /** gets token back */
  signin(login: Login): Observable<Token> {
    return this.http.post<Token>(backend_URL + 'auth/signin', login, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((token: Token) => console.log("signin ok")),
      catchError(this.handleError<Token>('signin'))
    );
  }

  signout(token: Token): Observable<any>{
    return this.http.post<Token>(backend_URL + 'auth/signout', null, {
      headers: {'Content-Type': 'application/json', 'Authorization': token.value}
    },).pipe(
      tap((token: Token) => console.log("signout ok")),
      catchError(this.handleError<Token>('signout'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
