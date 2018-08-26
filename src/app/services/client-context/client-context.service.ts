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
  private backendURL_allArticles :string  = 'http://localhost:3000/webshop/articles/';
  private backendURL_articleDetails :string  = 'http://localhost:3000/webshop/article-details/';

  private backendURL_allUsers :string  = 'http://localhost:3000/webshop/users/';
  private backendURL_userDetails :string  = 'http://localhost:3000/webshop/user-details/';
  private backendURL_user :string  = 'http://localhost:3000/webshop/user/';

  private backendURL_shoppingBasket :string  = 'http://localhost:3000/webshop/shopping-basket/';


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

  getBackendURL_allArticles():string  {
    return this.backendURL_allArticles;
  }
  getBackendURL_articleDetails():string  {
    return this.backendURL_articleDetails;
  }

  getBackendURL_user():string  {
    return this.backendURL_user;
  }

  getBackendURL_userDetails():string  {
    return this.backendURL_userDetails;
  }

  getBackendURL_allUsers():string  {
    return this.backendURL_allUsers;
  }

  getBackendURL_shoppingBasket():string  {
    return this.backendURL_shoppingBasket;
  }


}
