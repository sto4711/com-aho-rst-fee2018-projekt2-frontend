import {ShoppingBasketItem} from "../shopping-basket/shopping-basket-item";

export class Order {
  public _id :string =  '';
  public userID : string = '';
  public shoppingBasketDate : Date= new Date();
  public items  :ShoppingBasketItem[] = [];
  public totalSum: number = 0;
  public created : Date;
  public state :string =  '';

  constructor(_id: string) {
    this._id = _id;
  }




}
