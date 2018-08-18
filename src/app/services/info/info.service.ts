import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  info: string  = '';
  error: string  = '';
  when: Date = null;

  constructor() { }

  showInfo(info: string)  {
    this.info = info;
    this.error = '';
    this.when = new Date();
  }

  showError(error: string)  {
    this.info = '';
    this.error = error;
    this.when = new Date();
  }

}
