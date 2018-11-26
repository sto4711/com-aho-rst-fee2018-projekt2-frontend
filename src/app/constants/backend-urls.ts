import {environment} from '../../environments/environment';

export const backendUrls: {
  root: string;
  articles: string; articlesLatest: string; articlesDetails: string;
  users: string; user: string; userSignIn: string; userSignOut: string; userCreate: string
 shoppingBasket: string;
 order: string; orderDetails: string; orderAll: string; userOrders: string
} = {
  root: environment.backendUrl,

  articles: environment.backendUrl + 'backend/articles/',
  articlesLatest: environment.backendUrl + 'backend/articles/latest',
  articlesDetails: environment.backendUrl + 'backend/article-details/',

  users: environment.backendUrl + 'backend/users/',
  user: environment.backendUrl + 'backend/user/',
  userSignIn: environment.backendUrl + 'backend/user/sign-in',
  userSignOut: environment.backendUrl + 'backend/user/sign-out',
  userCreate: environment.backendUrl + 'backend/user/create',



  shoppingBasket: environment.backendUrl + 'backend/shopping-basket/',
  order: environment.backendUrl + 'backend/order/',
  orderDetails: environment.backendUrl + 'backend/order-details/',
  orderAll: environment.backendUrl + 'backend/order-all/',
  userOrders: environment.backendUrl + 'backend/user-orders/',
};

