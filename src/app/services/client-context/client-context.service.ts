import { Injectable } from '@angular/core';
import {Token} from '../login/token';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ClientContextService {
  private token: Token = {value : ''};

  public static BACKEND_URL_PUBLIC :string  = 'http://' + environment.backendHost + ':' + environment.backendPort + '/';
  public static BACKEND_URL_ARTICLES :string  = ClientContextService.BACKEND_URL_PUBLIC + 'webshop/articles/';
  public static BACKEND_URL_ARTICLES_LATEST :string  = ClientContextService.BACKEND_URL_PUBLIC + 'webshop/articles/latest';
  public static BACKEND_URL_ARTICLE_DETAILS :string  = ClientContextService.BACKEND_URL_PUBLIC + 'webshop/article-details/';
  public static BACKEND_URL_USERS :string  = ClientContextService.BACKEND_URL_PUBLIC + 'webshop/users/';
  public static BACKEND_URL_USER :string  = ClientContextService.BACKEND_URL_PUBLIC + 'webshop/user/';
  public static BACKEND_URL_USER_DETAILS :string  = ClientContextService.BACKEND_URL_PUBLIC + 'webshop/user-details/';
  public static BACKEND_URL_SHOPPING_BASKET :string  = ClientContextService.BACKEND_URL_PUBLIC + 'webshop/shopping-basket/';
  public static BACKEND_URL_ORDER :string  = ClientContextService.BACKEND_URL_PUBLIC + 'webshop/order/';
  public static BACKEND_URL_ORDER_DETAILS = ClientContextService.BACKEND_URL_PUBLIC + 'webshop/order-details/';
  public static BACKEND_URL_ORDER_ALL = ClientContextService.BACKEND_URL_PUBLIC + 'webshop/order-all/';


  constructor() {
  }

  public setToken(token: Token){
    this.token = token;
  }

  public getToken() :Token {
    return this.token;
  }




}
