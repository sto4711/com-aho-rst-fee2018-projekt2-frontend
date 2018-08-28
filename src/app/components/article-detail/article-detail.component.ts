import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Router } from '@angular/router';
import {ArticleService} from '../../services/articles/article.service';
import {ShoppingBasketPlayComponent} from '../shopping-basket-play/shopping-basket-play.component';
import {ClientContextService} from "../../services/client-context/client-context.service";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  articleDetails: any;
  imageURL: string = this.clientContextService.getBackendURL_public();
  articleID : string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private ShoppingBasketPlayComponent: ShoppingBasketPlayComponent,
    private clientContextService: ClientContextService


  ) {
    this.route.paramMap
      .subscribe( params => {
         this.articleID =  this.route.snapshot.queryParams["id"];
        this.articleDetails =  this.articleService.getArticleDetails(this.articleID)
          .subscribe(
            result => {
              this.articleDetails = result;
            }

          );
      });
  }

  addShoppingBasketItem(){

  this.ShoppingBasketPlayComponent.addShoppingBasketItem(this.articleID);
   }
  ngOnInit() {}

}

