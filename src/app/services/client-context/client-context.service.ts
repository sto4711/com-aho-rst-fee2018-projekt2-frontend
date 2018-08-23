import { Injectable } from '@angular/core';
import {Token} from '../login/token';

@Injectable({
  providedIn: 'root'
})

export class ClientContextService {
  static BACKEND_HOST : string = 'localhost';
  static BACKEND_PORT : number = 3000;

  private token: Token = {value : ''};
  private backendURL_public :string  = 'http://' + ClientContextService.BACKEND_HOST + ':' + ClientContextService.BACKEND_PORT + '/';
  private backendURL_auth :string  = 'http://localhost:3000/webshop/auth/';
  private backendURL_adminUsers :string  = 'http://localhost:3000/webshop/admin/users/';
  private backendURL_adminArticles :string  = 'http://localhost:3000/webshop/admin/articles/';
  private backendURL_allArticles :string  = 'http://localhost:3000/webshop/articles/';

  constructor() {}

  setToken(token: Token){
    this.token = token;
  }

  getToken() :Token {
    return this.token;
  }

  getBackendURL_public() :string {
    return this.backendURL_public;
  }
  getBackendURL_auth():string  {
    return this.backendURL_auth;
  }
  getBackendURL_adminUsers():string  {
    return this.backendURL_adminUsers;
  }
  getBackendURL_adminArticles():string  {
    return this.backendURL_adminArticles;
  }
  getBackendURL_allArticles():string  {
    return this.backendURL_allArticles;
  }

}
