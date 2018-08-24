import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';

import {Token} from 'src/app/services/login/token';
import {Article} from 'src/app/services/admin/article/article';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    protected http: HttpClient
    , private clientContextService: ClientContextService
  ) {}

  searchArticles(token: Token, term: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.clientContextService.getBackendURL_adminArticles() + '?filterName=' + term, {
        headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    )/*.pipe(
      tap(() => console.log('get products ok'))
    )*/;
  }

}
