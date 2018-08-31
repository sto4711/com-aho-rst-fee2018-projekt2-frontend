import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/articles/article.service';
import {ShoppingBasketPlayComponent} from '../shopping-basket-play/shopping-basket-play.component';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public items: string

   constructor(
     private articleService: ArticleService,
     private ShoppingBasketPlayComponent: ShoppingBasketPlayComponent

   ) {  }

    ngOnInit() {
      this.ShoppingBasketPlayComponent.checkBasketExists();

      this.ShoppingBasketPlayComponent.currentMessage.subscribe(message => this.items = message );

  }

}
