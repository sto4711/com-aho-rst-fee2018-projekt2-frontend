import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ArticlesResponseCacheService} from '../services/articles-response-cache/articles-response-cache.service';
import {Logger} from '../services/logger/logger';

@Injectable()
export class ArticlesCacheInterceptor implements HttpInterceptor {

  constructor(private articlesResponseCacheService: ArticlesResponseCacheService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url.indexOf('articles') > 0) { // cache articles only
      const cachedResponse: any = this.articlesResponseCacheService.get(req);
      console.log(typeof  cachedResponse);
      if (cachedResponse) {
        Logger.consoleLog(this.constructor.name, 'intercept', 'response in cache, no backend call');
        return of(cachedResponse);
      } else {
        return next.handle(req).pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              this.articlesResponseCacheService.put(req, event);
            }
          })
        );
      }
    }
    return next.handle(req);
  }

}
