import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

import {RequestCacheService} from "../services/request-cache/request-cache.service";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private requestCacheService: RequestCacheService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cachedResponse = this.requestCacheService.get(req);
    if (cachedResponse) {
      console.log('CacheInterceptor.intercept(), response is cached, no backend call');
      return of(cachedResponse);
    } else {
      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.requestCacheService.put(req, event);
          }
        })
      );
    }
  }

}
