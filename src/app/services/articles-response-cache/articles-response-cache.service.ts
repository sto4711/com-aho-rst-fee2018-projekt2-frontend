import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class ArticlesResponseCacheService  {
  private static maxAge: number = 30000;

  constructor() {
  }

  private cache: any = new Map();

  public get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const cached = this.cache.get(req.urlWithParams);
    if (cached) {
      return cached.response;
    }
      return undefined;
  }

  public put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const expired: number = Date.now() - ArticlesResponseCacheService.maxAge;
    const url: string  = req.url;
    const entry: object = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}
