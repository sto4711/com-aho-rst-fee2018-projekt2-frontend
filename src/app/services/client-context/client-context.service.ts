import { Injectable } from '@angular/core';
import {Token} from '../login/token';

@Injectable({
  providedIn: 'root'
})

export class ClientContextService {

  private token: Token = {value : ''};

  constructor() {
  }

  setToken(token: Token){
    this.token = token;
  }

  getToken()  {
    return this.token;
  }
}
