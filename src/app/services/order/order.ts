import {ShoppingBasket} from "../shopping-basket/shopping-basket";
import {Address} from "./address";

export class Order {
  public _id :string =  '';
  public userID : string = '';
  public shoppingBasket : ShoppingBasket;
  public orderDate : Date;
  public state :string =  '';
  public deliveryAddress: Address;

  constructor() {
  }




}
