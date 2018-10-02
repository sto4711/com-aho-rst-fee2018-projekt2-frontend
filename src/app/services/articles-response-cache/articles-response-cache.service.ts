import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse} from "@angular/common/http";

@Injectable()
export class ArticlesResponseCacheService  {
  private static maxAge: number = 30000;

  constructor() {
  }

  private cache = new Map();

  public get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const cached = this.cache.get(req.urlWithParams);
    if(cached){
      const isExpired = cached.lastRead < (Date.now() - ArticlesResponseCacheService.maxAge);
      const expired = isExpired ? 'expired ' : '';
      return cached.response;
    }else {
      return undefined;
    }
  }

  public put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const expired = Date.now() - ArticlesResponseCacheService.maxAge;
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}
