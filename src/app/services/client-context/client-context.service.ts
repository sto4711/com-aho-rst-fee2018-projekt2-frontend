import { Injectable } from '@angular/core';
import {Token} from '../login/token';
import {BreadcrumbPath} from "../../components/breadcrumb/breadcrumb-path";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})

export class ClientContextService {
  static BACKEND_HOST : string = 'localhost';
  static BACKEND_PORT : number = 3000;

  private token: Token = {value : ''};
  public nextRoute = '';

  private backendURL_public :string  = 'http://' + ClientContextService.BACKEND_HOST + ':' + ClientContextService.BACKEND_PORT + '/';

  private backendURL_allArticles :string  = this.backendURL_public + 'webshop/articles/';
  private backendURL_latestArticles :string  = this.backendURL_public + 'webshop/articles/latest';
  private backendURL_articleDetails :string  = this.backendURL_public + 'webshop/article-details/';

  private backendURL_allUsers :string  = this.backendURL_public + 'webshop/users/';
  private backendURL_userDetails :string  = this.backendURL_public + 'webshop/user-details/';
  private backendURL_user :string  = this.backendURL_public + 'webshop/user/';

  private backendURL_shoppingBasket :string  = this.backendURL_public + 'webshop/shopping-basket/';

  private backendURL_order :string  = this.backendURL_public + 'webshop/order/';
  private backendURL_orderDetails = this.backendURL_public + 'webshop/order-details/';

  constructor(private translate: TranslateService) {
  }

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

  getBackendURL_latestArticles():string  {
    return this.backendURL_latestArticles;
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

  getBackendURL_order():string  {
    return this.backendURL_order;
  }

  getBackendURL_orderDetails():string  {
    return this.backendURL_orderDetails;
  }


}
