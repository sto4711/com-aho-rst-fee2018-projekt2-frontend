import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/articles/article.service';
import {ShoppingBasketComponent} from '../shopping-basket/shopping-basket.component';
import {ShoppingBasketService} from "../../services/shopping-basket/shopping-basket.service";


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
   constructor(
     private articleService: ArticleService
     ,private shoppingBasketComponent: ShoppingBasketComponent
     ,public shoppingBasketService: ShoppingBasketService
   ) {  }

    ngOnInit() {}

}
