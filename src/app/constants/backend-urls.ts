import {environment} from "../../environments/environment";

export const backendUrls = {
  public: environment.backendUrl,
  articles: environment.backendUrl + 'webshop/articles/',
  articlesLatest: environment.backendUrl + 'webshop/articles/latest',
  articlesDetails: environment.backendUrl + 'webshop/article-details/',
  users: environment.backendUrl + 'webshop/users/',
  user: environment.backendUrl + 'webshop/user/',
  userDetails: environment.backendUrl + 'webshop/user-details/',
  shoppingBasket: environment.backendUrl + 'webshop/shopping-basket/',
  order: environment.backendUrl + 'webshop/order/',
  orderDetails: environment.backendUrl + 'webshop/order-details/',
  orderAll: environment.backendUrl + 'webshop/order-all/',
};

