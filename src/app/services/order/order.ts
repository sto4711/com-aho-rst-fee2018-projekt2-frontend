import {ShoppingBasketItem} from "../shopping-basket/shopping-basket-item";
import {Address} from "./address";

export class Order {
  public _id :string =  '';
  public userID : string = '';
  public shoppingBasketDate : Date= new Date();
  public items  :ShoppingBasketItem[] = [];
  public totalSum: number = 0;
  public created : Date;
  public state :string =  '';
  public deliveryAddress: Address;

  constructor(_id: string, deliveryAddress: Address) {
    this._id = _id;
    this.deliveryAddress = deliveryAddress;
  }




}
