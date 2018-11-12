import {environment} from '../../environments/environment';

export const backendUrls: { public: string; articles: string; articlesLatest: string; articlesDetails: string; users: string;
 user: string; userDetails: string; shoppingBasket: string; order: string; orderDetails: string; orderAll: string; userOrders: string } = {
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
  userOrders: environment.backendUrl + 'webshop/user-orders/',
};

