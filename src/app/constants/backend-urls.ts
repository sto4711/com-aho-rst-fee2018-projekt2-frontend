import {environment} from '../../environments/environment';

export const backendUrls: {
  root: string;
  article: string; articles: string; articlesLatest: string;
  user: string; users: string;
  shoppingBasket: string;
  order: string; orders: string; ordersUser: string;

  signInUser: string; signOutUser: string;
  createUser: string; createShoppingBasket: string; createOrder: string;

  updateUser: string; updateOrder: string;

  deleteUser: string;


  changeRatingArticle: string;




  addItemShoppingBasket: string; removeItemShoppingBasket: string;
  changeItemAmountShoppingBasket: string;
  orderChangeDeliveryAddress: string;
  orderChangeContactData: string;
  orderChangeDeliveryType: string;
  orderChangePaymentType: string;
  orderState: string;
  orderDelete: string
} = {
  root: environment.backendUrl,
  article: environment.backendUrl + 'backend/article/',
  articles: environment.backendUrl + 'backend/articles/',
  articlesLatest: environment.backendUrl + 'backend/articles/latest',
  user: environment.backendUrl + 'backend/user/',
  users: environment.backendUrl + 'backend/users/',
  shoppingBasket: environment.backendUrl + 'backend/shopping-basket/',
  order: environment.backendUrl + 'backend/order/',
  orders: environment.backendUrl + 'backend/orders/',
  ordersUser: environment.backendUrl + 'backend/orders/user',




  changeRatingArticle: environment.backendUrl + 'backend/change-rating/article',

  signInUser: environment.backendUrl + 'backend/sign-in/user',
  signOutUser: environment.backendUrl + 'backend/sign-out/user',

  createUser: environment.backendUrl + 'backend/create/user',
  createShoppingBasket: environment.backendUrl + 'backend/create/shopping-basket',
  createOrder: environment.backendUrl + 'backend/create/order',




  updateUser: environment.backendUrl + 'backend/update/user',
  updateOrder: environment.backendUrl + 'backend/update/order',




  deleteUser: environment.backendUrl + 'backend/delete/user',



  orderDelete: environment.backendUrl + 'backend/order/delete-order',


  addItemShoppingBasket: environment.backendUrl + 'backend/add-item/shopping-basket',
  removeItemShoppingBasket: environment.backendUrl + 'backend/remove-item/shopping-basket',
  changeItemAmountShoppingBasket: environment.backendUrl + 'backend/change-item-amount/shopping-basket',







  orderChangeDeliveryAddress: environment.backendUrl + 'backend/order/change-delivery-address',
  orderChangeContactData: environment.backendUrl + 'backend/order/change-contact-data',
  orderChangeDeliveryType: environment.backendUrl + 'backend/order/change-delivery-type',
  orderChangePaymentType: environment.backendUrl + 'backend/order/change-payment-type',


  orderState: environment.backendUrl + 'backend/order/state',


};

