import {ShoppingBasket} from "../shopping-basket/shopping-basket";
import {Address} from "./address";
import {ContactData} from "./contact-data";
import {DeliveryType} from "./delivery-type";
import {PaymentType} from "./payment-type";

export class Order {
  public _id :string =  '';
  public userID : string = '';
  public shoppingBasket : ShoppingBasket;
  public orderDate : Date;
  public state :string =  '';
  public deliveryAddress: Address = new Address();
  public contactData : ContactData = new ContactData();
  public deliveryType : DeliveryType = new DeliveryType();
  public paymentType : PaymentType = new PaymentType();
  public doNotStep: boolean = false;

  constructor() {
  }




}
