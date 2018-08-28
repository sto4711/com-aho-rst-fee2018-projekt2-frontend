import {Injectable} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {ClientContextService} from "../../services/client-context/client-context.service";
import {ShoppingBasketService} from "../../services/shopping-basket/shopping-basket.service";
import {ShoppingBasket} from "../../services/shopping-basket/shopping-basket";
import {ShoppingBasketItem} from "../../services/shopping-basket/shopping-basket-item";
import {DialogService} from "../../services/commons/dialog/dialog.service";

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

  private shoppingBasket: ShoppingBasket = null;


  constructor(
    private shoppingBasketService: ShoppingBasketService
    , private clientContextService: ClientContextService
    , private dialogService :DialogService
  ) {
  }

  ngOnInit() {
  }

  getLocalBasketId() {
    return localStorage.getItem('cartId')

  }

  createShoppingBasket() {
    let cartId = this.getLocalBasketId();
    if (!cartId) {
      this.shoppingBasketService.create()
        .subscribe(shoppingBasket => {
            this.jsonResult = JSON.stringify(shoppingBasket);
            this.shoppingBasket = shoppingBasket;
            localStorage.setItem('cartId', this.shoppingBasket._id);
          },
          error => {
            //
          },
        )
    }
    return this.getLocalBasketId();
  }


  getShoppingBasket() {
    let shoppingBasket_id = this.getLocalBasketId();

    this.shoppingBasketService.getShoppingCart(shoppingBasket_id)
      .subscribe(shoppingBasket => {
          this.jsonResult = JSON.stringify(shoppingBasket);
        },
        error => {
          //
        }
      );

  }

  addShoppingBasketItem(articleId) {
    let shoppingBasket_id = this.createShoppingBasket();

    this.shoppingBasketService.addItem(new ShoppingBasketItem(shoppingBasket_id, articleId, 1))
      .subscribe(shoppingBasket => {
          this.jsonResult = JSON.stringify(shoppingBasket);
          this.dialogService.confirm('addItem()', 'alles ok');
        },
        error => {
          //
        }
      );
  }

  removeShoppingBasketItem(articleId) {
    let shoppingBasket_id = this.getLocalBasketId();

    this.shoppingBasketService.removeItem(new ShoppingBasketItem(shoppingBasket_id, articleId, 0))
      .subscribe(shoppingBasket => {
          this.jsonResult = JSON.stringify(shoppingBasket);
        },
        error => {
          //
        }
      );
  }


}
