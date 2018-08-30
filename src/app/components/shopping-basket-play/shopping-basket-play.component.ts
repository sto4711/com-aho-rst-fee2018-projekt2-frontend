import {Injectable} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {ClientContextService} from '../../services/client-context/client-context.service';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {ShoppingBasket} from '../../services/shopping-basket/shopping-basket';
import {ShoppingBasketItem} from '../../services/shopping-basket/shopping-basket-item';

@Component({
  selector: 'app-shopping-basket-play',
  templateUrl: './shopping-basket-play.component.html',
  styleUrls: ['./shopping-basket-play.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class ShoppingBasketPlayComponent implements OnInit {
  public jsonResult = '';
  public shoppingBasket: ShoppingBasket = new ShoppingBasket();


  public totalSum = 45;
  public articleMinus;
  public articlePlus;

  constructor(
    private shoppingBasketService: ShoppingBasketService
  ) {
  }

  public ngOnInit() {
    if (ShoppingBasketPlayComponent.getLocalBasketId() === null) {
      this.createShoppingBasket();
    } else {
      this.getShoppingBasket();
    }
  }

  private static getLocalBasketId() {
    return localStorage.getItem('cartId');
  }

  createShoppingBasket() {
    this.shoppingBasketService.create()
      .subscribe(shoppingBasket => {
          this.jsonResult = JSON.stringify(shoppingBasket);
          this.shoppingBasket = shoppingBasket;
          localStorage.setItem('cartId', this.shoppingBasket._id);
        }
      );
  }

  getShoppingBasket() {
    this.shoppingBasketService.get(ShoppingBasketPlayComponent.getLocalBasketId())
      .subscribe(shoppingBasket => {
          this.jsonResult = JSON.stringify(shoppingBasket);
          this.shoppingBasket = shoppingBasket;
        }
      );
  }


  addShoppingBasketItem(articleId, articleAmount) {
    const shoppingBasketItem = new ShoppingBasketItem(ShoppingBasketPlayComponent.getLocalBasketId(), articleId, articleAmount);
    this.shoppingBasketService.addItem(shoppingBasketItem)
      .subscribe(shoppingBasket => {
          this.jsonResult = JSON.stringify(shoppingBasket);
          this.shoppingBasket = shoppingBasket;
        }
      );
  }


  removeShoppingBasketItem(articleId) {
    const shoppingBasket_id = ShoppingBasketPlayComponent.getLocalBasketId();

    this.shoppingBasketService.removeItem(new ShoppingBasketItem(shoppingBasket_id, articleId, 0))
      .subscribe(shoppingBasket => {
          this.jsonResult = JSON.stringify(shoppingBasket);
        }
      );
  }


}
