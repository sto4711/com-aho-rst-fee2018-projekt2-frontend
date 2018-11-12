import {HttpResponse} from '@angular/common/http';

export class CacheEntry {
  public response: HttpResponse<any>;
  public lastRead: number;

  constructor(response: HttpResponse<any>, lastRead: number) {
    this.response = response;
    this.lastRead = lastRead;
  }
}
