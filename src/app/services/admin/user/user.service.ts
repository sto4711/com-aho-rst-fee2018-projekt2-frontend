import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {User} from 'src/app/services/admin/user/user';
import {Token} from 'src/app/services/login/token';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
    , private clientContextService: ClientContextService
  ) {
  }

  /** gets all the users back */
  get(token: Token): Observable<User[]> {
    return this.http.get<User[]>(     this.clientContextService.getBackendURL_user() , {
        headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    ).pipe(
      tap((users: User[]) => console.log('get users ok'))/*,
      catchError(this.handleError<Token>('signin'))*/
    );
  }

}
