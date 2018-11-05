import {Address} from "../order/address";
import {ContactData} from "../order/contact-data";
import {DeliveryType} from "../order/delivery-type";
import {PaymentType} from "../order/payment-type";

export class User {
  public name: string;
  public firstname: string;
  public email: string;
  public pwd: string;
  public type: string;
  public token: string;
  public _id:string;


  constructor(_id: string,firstname: string, name: string, email: string, pwd: string, type:string ) {
    this._id = _id;
    this.firstname = firstname;
    this.name = name;
    this.email = email;
    this.pwd = pwd;
    this.type = type;
  }




}
