import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {Article} from 'src/app/services/articles/article';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {ShoppingBasket} from "../shopping-basket/shopping-basket";
import {ArticleRating} from "./article-rating";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles$: Observable<Article[]>;
  constructor(
    protected http: HttpClient
    , private clientContextService: ClientContextService
  ) {}

  searchArticles( term: string): Observable<Article[]> {
    if(term==='')  {
      return EMPTY;
    }

    return this.http.get<Article[]>(this.clientContextService.getBackendURL_allArticles() + '?filter=' + term, {
        headers: {'Content-Type': 'application/json' }
      }
    ).pipe(
      tap(() => console.log('searchArticles ok'))
    );
  }

  getArticlesNewest( limit: number): Observable<Article[]> {
    return this.http.get<Article[]>(this.clientContextService.getBackendURL_newestArticles() + '?limit=' + limit, {
        headers: {'Content-Type': 'application/json' }
      }
    ).pipe(
      tap(() => console.log('getArticlesNewest ok'))
    );
  }


  getArticleDetails( id: Article["_id"]): Observable<Article> {
      return this.http.get<Article>(this.clientContextService.getBackendURL_articleDetails() + '?id=' + id , {
        headers: {'Content-Type': 'application/json' }
      }
    ).pipe(
      tap(() => console.log('getArticleDetails ok'))
    );
  }

  changeRating( articleRating: ArticleRating): Observable<Article> {
    return this.http.post<Article>(this.clientContextService.getBackendURL_articleDetails() + 'change-rating', articleRating, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((article: Article) => console.log('changeRating ok'))
    );
  }



}
