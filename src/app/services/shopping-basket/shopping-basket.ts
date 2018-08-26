import {ShoppingBasketItem} from "./shopping-basket-item";

export class ShoppingBasket {
  public _id : string = null;
  public userID : string = '';
  public shoppingBasketDate : Date= new Date();
  public items  :ShoppingBasketItem[] = [];
}
