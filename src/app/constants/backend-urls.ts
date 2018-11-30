import {environment} from '../../environments/environment';

export const backendUrls: {
  root: string;
  article: string; articles: string; articlesLatest: string;
  users: string; user: string;
  shoppingBasket: string;

  signInUser: string; signOutUser: string;
  createUser: string; createShoppingBasket: string;

  updateUser: string; deleteUser: string;


  changeRatingArticle: string;


  addItemShoppingBasket: string; removeItemShoppingBasket: string;
  changeItemAmountShoppingBasket: string; order: string; orderCreate: string; orderUpdate: string;
  orderChangeDeliveryAddress: string;
  orderChangeContactData: string;
  orderChangeDeliveryType: string;
  orderChangePaymentType: string;
  orderState: string;
  orderDelete: string; orderDetails: string; orderAll: string; userOrders: string
} = {
  root: environment.backendUrl,
  article: environment.backendUrl + 'backend/article/',
  articles: environment.backendUrl + 'backend/articles/',
  articlesLatest: environment.backendUrl + 'backend/articles/latest',
  user: environment.backendUrl + 'backend/user/',
  users: environment.backendUrl + 'backend/users/',
  shoppingBasket: environment.backendUrl + 'backend/shopping-basket/',


  changeRatingArticle: environment.backendUrl + 'backend/change-rating/article',

  signInUser: environment.backendUrl + 'backend/sign-in/user',
  signOutUser: environment.backendUrl + 'backend/sign-out/user',

  createUser: environment.backendUrl + 'backend/create/user',
  createShoppingBasket: environment.backendUrl + 'backend/create/shopping-basket',


  updateUser: environment.backendUrl + 'backend/update/user',
  addItemShoppingBasket: environment.backendUrl + 'backend/add-item/shopping-basket',
  removeItemShoppingBasket: environment.backendUrl + 'backend/remove-item/shopping-basket',
  changeItemAmountShoppingBasket: environment.backendUrl + 'backend/change-item-amount/shopping-basket',




  deleteUser: environment.backendUrl + 'backend/delete/user',




  order: environment.backendUrl + 'backend/order/',
  orderDetails: environment.backendUrl + 'backend/order-details/',
  orderAll: environment.backendUrl + 'backend/order-all/',


  orderCreate: environment.backendUrl + 'backend/order/create',
  orderUpdate: environment.backendUrl + 'backend/order/update',

  orderChangeDeliveryAddress: environment.backendUrl + 'backend/order/change-delivery-address',
  orderChangeContactData: environment.backendUrl + 'backend/order/change-contact-data',
  orderChangeDeliveryType: environment.backendUrl + 'backend/order/change-delivery-type',
  orderChangePaymentType: environment.backendUrl + 'backend/order/change-payment-type',


  orderState: environment.backendUrl + 'backend/order/state',
  orderDelete: environment.backendUrl + 'backend/order/delete-order',


  userOrders: environment.backendUrl + 'backend/user-orders/',
};

