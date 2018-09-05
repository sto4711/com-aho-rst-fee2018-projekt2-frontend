import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/articles/article.service';
import {ShoppingBasketPlayComponent} from '../shopping-basket-play/shopping-basket-play.component';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public itemAmount: string
  public BasketOverview: object;
  public BasketTotalSum: string;


   constructor(
     private articleService: ArticleService,
     private ShoppingBasketPlayComponent: ShoppingBasketPlayComponent


   ) {  }

    ngOnInit() {
      this.ShoppingBasketPlayComponent.checkBasketExists();
      // this.ShoppingBasketPlayComponent.currentMessage.subscribe(message => this.itemAmount = message );
      this.displayBasket();
  }

  displayBasket(){
    this.BasketOverview = this.ShoppingBasketPlayComponent.shoppingBasketService
      .get(ShoppingBasketPlayComponent.getLocalBasketId())
      .subscribe(result => {
        this.BasketOverview =  result;
        this.BasketTotalSum = this.BasketOverview['totalSum'];
        }
      );
  }
}
