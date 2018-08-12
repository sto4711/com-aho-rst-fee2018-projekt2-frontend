import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  info: string  = '';
  when: Date = null;

  constructor() { }

  showInfo(info: string)  {
    this.info = info;
    this.when = new Date();
  }
}
