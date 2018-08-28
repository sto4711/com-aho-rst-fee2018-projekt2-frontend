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
  articleAmount: string;
  selectedValue = 1;

  amount = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'}
  ];
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
  selectedArticleAmount(amount){
    this.articleAmount = amount;
  }
  addShoppingBasketItem(){

  this.ShoppingBasketPlayComponent.addShoppingBasketItem(this.articleID );
   }

  ngOnInit() {}

}

