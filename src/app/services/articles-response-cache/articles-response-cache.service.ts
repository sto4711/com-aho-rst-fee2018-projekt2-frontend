import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import {CacheEntry} from './cache-entry';

@Injectable()
export class ArticlesResponseCacheService  {
  private static maxAge: number = 30000;
  private cache: any = new Map();

  constructor() {
  }

  public get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const cached: CacheEntry = this.cache.get(req.urlWithParams);
    if (cached) {
      return cached.response;
    }
      return undefined;
  }

  public put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const expired: number = Date.now() - ArticlesResponseCacheService.maxAge;
    const url: string  = req.url;
    this.cache.set(url, new CacheEntry(response, Date.now()));
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}
