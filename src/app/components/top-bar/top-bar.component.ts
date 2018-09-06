import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/articles/article.service';
import {ShoppingBasketComponent} from '../shopping-basket/shopping-basket.component';


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
     private shoppingBasketComponent: ShoppingBasketComponent


   ) {  }

    ngOnInit() {
      this.shoppingBasketComponent.checkBasketExists();
      // this.shoppingBasketComponent.currentMessage.subscribe(message => this.itemAmount = message );
      this.displayBasket();
  }

  displayBasket(){
    this.BasketOverview = this.shoppingBasketComponent.shoppingBasketService
      .get(ShoppingBasketComponent.getLocalBasketId())
      .subscribe(result => {
        this.BasketOverview =  result;
        this.BasketTotalSum = this.BasketOverview['totalSum'];
        }
      );
  }
}
