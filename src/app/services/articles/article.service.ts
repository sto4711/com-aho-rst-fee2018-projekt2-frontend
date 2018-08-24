import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

import {Token} from 'src/app/services/login/token';
import {Article} from 'src/app/services/articles/article';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles$: Observable<Article[]>;
  constructor(
    protected http: HttpClient
    , private clientContextService: ClientContextService
  ) {
    //super(http);
  }

  searchArticles( term: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.clientContextService.getBackendURL_adminArticles() + '?filterName=' + term, {
        headers: {'Content-Type': 'application/json' }
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
      return this.http.get<Article[]>(this.clientContextService.getBackendURL_articleDetails() + '?id=' + term , {
        headers: {'Content-Type': 'application/json' }
      }
    ).pipe(
      tap(() => console.log('get products ok'))
    );
  }

}
