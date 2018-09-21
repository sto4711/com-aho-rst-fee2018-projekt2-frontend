import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse} from "@angular/common/http";

@Injectable()
export class RequestCacheService  {
  private static maxAge: number = 30000;

  constructor() {
  }

  private cache = new Map();

  public get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - RequestCacheService.maxAge);
    const expired = isExpired ? 'expired ' : '';
    return cached.response;
  }

  public put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    const expired = Date.now() - RequestCacheService.maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}
