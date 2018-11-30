import {environment} from '../../environments/environment';

export const backendUrls: {
  root: string;
  signInUser: string; signOutUser: string;
  createUser: string; updateUser: string; deleteUser: string;

  articles: string; articlesLatest: string; articlesDetails: string; users: string; user: string;
  shoppingBasket: string; shoppingBasketCreate: string; shoppingBasketAddItem: string; shoppingBasketRemoveItem: string;
  shoppingBasketChangeItemAmount: string; order: string; orderCreate: string; orderUpdate: string;
  orderChangeDeliveryAddress: string;
  orderChangeContactData: string;
  orderChangeDeliveryType: string;
  orderChangePaymentType: string;
  orderState: string;
  orderDelete: string; orderDetails: string; orderAll: string; userOrders: string
} = {
  root: environment.backendUrl,
  signInUser: environment.backendUrl + 'backend/sign-in/user',
  signOutUser: environment.backendUrl + 'backend/sign-out/user',

  users: environment.backendUrl + 'backend/users/',
  user: environment.backendUrl + 'backend/user/',

  createUser: environment.backendUrl + 'backend/create/user',

  updateUser: environment.backendUrl + 'backend/update/user',

  deleteUser: environment.backendUrl + 'backend/delete/user',

//  - delete/user







  articles: environment.backendUrl + 'backend/articles/',
  articlesLatest: environment.backendUrl + 'backend/articles/latest',
  articlesDetails: environment.backendUrl + 'backend/article-details/',



  shoppingBasket: environment.backendUrl + 'backend/shopping-basket/',
  shoppingBasketCreate: environment.backendUrl + 'backend/shopping-basket/create',
  shoppingBasketAddItem: environment.backendUrl + 'backend/shopping-basket/add-item',
  shoppingBasketRemoveItem: environment.backendUrl + 'backend/shopping-basket/remove-item',
  shoppingBasketChangeItemAmount: environment.backendUrl + 'backend/shopping-basket/change-item-amount',

  order: environment.backendUrl + 'backend/order/',
  orderCreate: environment.backendUrl + 'backend/order/create',
  orderUpdate: environment.backendUrl + 'backend/order/update',

  orderChangeDeliveryAddress: environment.backendUrl + 'backend/order/change-delivery-address',
  orderChangeContactData: environment.backendUrl + 'backend/order/change-contact-data',
  orderChangeDeliveryType: environment.backendUrl + 'backend/order/change-delivery-type',
  orderChangePaymentType: environment.backendUrl + 'backend/order/change-payment-type',



  orderState: environment.backendUrl + 'backend/order/state',
  orderDelete: environment.backendUrl + 'backend/order/delete-order',

  orderDetails: environment.backendUrl + 'backend/order-details/',
  orderAll: environment.backendUrl + 'backend/order-all/',

  userOrders: environment.backendUrl + 'backend/user-orders/',
};

