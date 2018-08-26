import { Component, OnInit } from '@angular/core';
import {InfoService} from "../../services/info/info.service";
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

  constructor(    private infoService: InfoService
    , private shoppingBasketService: ShoppingBasketService
    , private clientContextService: ClientContextService
  ) { }

  ngOnInit() {
  }

  onClick_createShoppingBasket() {
    this.shoppingBasketService.create()
      .subscribe(shoppingBasket => {
          this.infoService.showInfo('create ShoppingBasket ok');
          this.jsonResult = JSON.stringify(shoppingBasket);
          this.shoppingBasket = shoppingBasket;
        },
        error => {
          this.infoService.showError(error.message);
        }
      );
  }

  onClick_addShoppingBasketItem() {
    this.shoppingBasketService.addItem(new ShoppingBasketItem(this.shoppingBasket._id,'xEUehKXKxYo0011', 1))
      .subscribe(shoppingBasket => {
          this.infoService.showInfo('add ShoppingBasket item ok');
          this.jsonResult = JSON.stringify(shoppingBasket);
        },
        error => {
          this.infoService.showError(error.message);
        }
      );
  }

  onClick_removeShoppingBasketItem() {
    this.shoppingBasketService.removeItem(new ShoppingBasketItem(this.shoppingBasket._id,'xEUehKXKxYo0011',0))
      .subscribe(shoppingBasket => {
          this.infoService.showInfo('remove ShoppingBasket item ok');
          this.jsonResult = JSON.stringify(shoppingBasket);
        },
        error => {
          this.infoService.showError(error.message);
        }
      );
  }




}
