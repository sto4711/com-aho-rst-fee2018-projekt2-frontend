import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  info: string  = '';

  constructor() { }

  showInfo(info: string)  {
    this.info = info;
  }
}
