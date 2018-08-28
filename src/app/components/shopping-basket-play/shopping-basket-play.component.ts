import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})

export class ShoppingBasketPlayComponent implements OnInit {

  public jsonResult: string = '';
  public localBasketId: string;

  private shoppingBasket  : ShoppingBasket = null;


  constructor(    private infoService: InfoService
    , private shoppingBasketService: ShoppingBasketService
    , private clientContextService: ClientContextService
  ) { }

  ngOnInit() {
  }
  getLocalBasketId(){
    return localStorage.getItem('cartId')

  }

    CreateShoppingBasket() {
      let cartId = this.getLocalBasketId();
      if (!cartId) {
        this.shoppingBasketService.create()
          .subscribe(shoppingBasket => {
              this.infoService.showInfo('create ShoppingBasket ok');
              this.jsonResult = JSON.stringify(shoppingBasket);
              this.shoppingBasket = shoppingBasket;
              localStorage.setItem('cartId', this.shoppingBasket._id);
            },
            error => {
              this.infoService.showError(error.message);
            },

          )
      }
      return this.getLocalBasketId();
    }

    async addShoppingBasketItem(articleId) {
  /// Check how to aysnc  !!!
     let shoppingBasket_id = this.CreateShoppingBasket();

     this.shoppingBasketService.addItem(new ShoppingBasketItem(shoppingBasket_id, articleId, 1))
       .subscribe(shoppingBasket => {
           this.infoService.showInfo('add ShoppingBasket item ok');
           this.jsonResult = JSON.stringify(shoppingBasket);

         },
         error => {
           this.infoService.showError(error.message);
         }
       );
  }

  removeShoppingBasketItem(articleId) {
    let shoppingBasket_id = this.getLocalBasketId();

    this.shoppingBasketService.removeItem(new ShoppingBasketItem(shoppingBasket_id,articleId,0))
      .subscribe(shoppingBasket => {
          this.infoService.showInfo('remove ShoppingBasket item ok');
          this.jsonResult = JSON.stringify(shoppingBasket);
        },
        error => {
          this.infoService.showError(error.message);
        }
      );
  }

  getShoppingBasket( ) {
    let shoppingBasket_id = this.getLocalBasketId();

    this.shoppingBasketService.getShoppingCart(shoppingBasket_id)
      .subscribe(shoppingBasket => {
          this.infoService.showInfo('get Cart ok');
          this.jsonResult = JSON.stringify(shoppingBasket);
        },
        error => {
          this.infoService.showError(error.message);
        }
      );

  }

}
