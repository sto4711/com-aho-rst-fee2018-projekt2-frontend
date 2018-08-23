import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

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
  ) {
    //super(http);
  }

  searchArticles(token: Token, term: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.clientContextService.getBackendURL_adminArticles() + '?filterName=' + term, {
        headers: {'Content-Type': 'application/json', 'Authorization': token.value}
      }
    ).pipe(
      tap(() => console.log('get products ok'))
    );
  }
  getAllArticles( ): Observable<Article[]> {
    return this.http.get<Article[]>(this.clientContextService.getBackendURL_allArticles() , {
        headers: {'Content-Type': 'application/json' }
      }
    ).pipe(
      tap(() => console.log('get products ok'))
    );
  }

  getArticleDetails( term: string): Observable<Article[]> {
    console.log(term);
     return this.http.get<Article[]>(this.clientContextService.getBackendURL_articleDetails() + '?filterName=' + term , {
        headers: {'Content-Type': 'application/json' }
      }
    ).pipe(
      tap(() => console.log('get products ok'))
    );
  }

}
