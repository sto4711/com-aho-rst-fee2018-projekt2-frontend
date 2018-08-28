import { Component, OnInit } from '@angular/core';
import {ClientContextService} from "../../services/client-context/client-context.service";
import {ShoppingBasketService} from "../../services/shopping-basket/shopping-basket.service";
import {ShoppingBasket} from "../../services/shopping-basket/shopping-basket";
import {ShoppingBasketItem} from "../../services/shopping-basket/shopping-basket-item";

@Component({
  selector: 'app-shopping-basket-play',
  templateUrl: './shopping-basket-play.component.html',
  styleUrls: ['./shopping-basket-play.component.css']
})
export class ShoppingBasketPlayComponent implements OnInit {

  public jsonResult: string = '';
  private shoppingBasket  : ShoppingBasket = null;

  constructor(
     private shoppingBasketService: ShoppingBasketService
    , private clientContextService: ClientContextService
  ) { }

  ngOnInit() {
  }

  onClick_createShoppingBasket() {
    this.shoppingBasketService.create()
      .subscribe(shoppingBasket => {
          this.jsonResult = JSON.stringify(shoppingBasket);
          this.shoppingBasket = shoppingBasket;
        },
        error => {
          //this.dialogService.confirm('Fehler createShoppingBasket', 'Es ist ein Fehler aufgetreten ' + error);
        }
      );
  }

  onClick_addShoppingBasketItem(form, articleId) {
    this.shoppingBasketService.addItem(new ShoppingBasketItem(this.shoppingBasket._id,articleId, 1))
      .subscribe(shoppingBasket => {
          this.jsonResult = JSON.stringify(shoppingBasket);
        },
        error => {
          //this.dialogService.confirm('Fehler addShoppingBasketItem', 'Es ist ein Fehler aufgetreten ' + error);
        }
      );
  }

  onClick_removeShoppingBasketItem(form, articleId) {
    this.shoppingBasketService.removeItem(new ShoppingBasketItem(this.shoppingBasket._id,articleId,0))
      .subscribe(shoppingBasket => {
          this.jsonResult = JSON.stringify(shoppingBasket);
        },
        error => {
          //this.dialogService.confirm('Fehler removeShoppingBasketItem', 'Es ist ein Fehler aufgetreten ' + error);
        }
      );
  }




}
