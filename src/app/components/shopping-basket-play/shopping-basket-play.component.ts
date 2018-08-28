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
  public localBasketId: string;
  public myShoppingBasket: any;
  private shoppingBasket: ShoppingBasket = null;


  constructor(
    private shoppingBasketService: ShoppingBasketService
    , private clientContextService: ClientContextService
  ) {
  }

  ngOnInit() {
    this.getShoppingBasket();
  }

  getLocalBasketId() {
    return localStorage.getItem('cartId');

  }

  async createShoppingBasket() {

      await this.shoppingBasketService.create()
        .subscribe(shoppingBasket => {
            this.jsonResult = JSON.stringify(shoppingBasket);
            this.shoppingBasket = shoppingBasket;
           },
          error => {
            //
          },() =>{
            localStorage.setItem('cartId', this.shoppingBasket._id);

          }
        );

  }

  getShoppingBasket() {
    const shoppingBasket_id = this.getLocalBasketId();

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
    let shoppingBasket_id = this.getLocalBasketId();

    if (!shoppingBasket_id) {
          this.createShoppingBasket().then((basket) => {
            this.addItem(articleId);
      });
    }
    else{
      this.addItem(articleId);
    }

  }

  addItem(articleId){

    let shoppingBasket_id = this.getLocalBasketId();
    console.log(shoppingBasket_id);
    this.shoppingBasketService.addItem(new ShoppingBasketItem(shoppingBasket_id, articleId, 1))
      .subscribe(shoppingBasket => {
          this.jsonResult = JSON.stringify(shoppingBasket);
          this.shoppingBasket = shoppingBasket;
          console.log(this.shoppingBasket);
        },
        error => {
          //
        }
      );
  }

  removeShoppingBasketItem(articleId) {
    const shoppingBasket_id = this.getLocalBasketId();

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
