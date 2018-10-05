import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {share, tap} from 'rxjs/operators';
import {Article} from 'src/app/services/articles/article';
import {ArticleRating} from "./article-rating";
import {backendUrls} from "../../constants/backend-urls";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles$: Observable<Article[]>;

  constructor(
    private http: HttpClient
  ) {
  }

  searchArticles(term: string): Observable<Article[]> {
    if (term === null) {
      return of<Article[]>([]);
    }

    return this.http.get<Article[]>(backendUrls.articles + '?filter=' + term, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      share()  /* observable$ | async is used several times in template. To avoid similar backend calls */
    );
  }

  getArticlesLatest(limit: number): Observable<Article[]> {
    return this.http
      .get<Article[]>(  backendUrls.articlesLatest + '?limit=' + limit, {
          headers: {'Content-Type': 'application/json'}
        }
      ).pipe(
        share()  /* observable$ | async is used several times in template. To avoid similar backend calls */
      );
  }

  getArticleDetails(articleQueryParameter: Article["articleQueryParameter"]): Observable<Article> {
    return this.http.get<Article>(  backendUrls.articlesDetails + '?article=' + articleQueryParameter, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      share()  /* observable$ | async is used several times in template. To avoid similar backend calls */
    );
  }

  changeRating(articleRating: ArticleRating): Observable<Article> {
    return this.http.patch<Article>(backendUrls.articlesDetails + 'change-rating', articleRating, {
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap((article: Article) => console.log('changeRating ok'))
    );
  }


}
