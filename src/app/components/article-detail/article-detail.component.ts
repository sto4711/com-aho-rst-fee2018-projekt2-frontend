import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../services/articles/article.service';
import {ClientContextService} from '../../services/client-context/client-context.service';
import {Article} from "../../services/articles/article";
import {ShoppingBasketService} from "../../services/shopping-basket/shopping-basket.service";
import {MatSnackBar} from "@angular/material";
import {ArticleRating} from "../../services/articles/article-rating";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})


export class ArticleDetailComponent implements OnInit {
  public article: Article;
  public imageURL: string = this.clientContextService.getBackendURL_public();
  public selectedValue = 1;
  private articleAmount: number = 1;

  amount = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private clientContextService: ClientContextService,
    private shoppingBasketService: ShoppingBasketService,
    private snackBar: MatSnackBar
  ) {
    // reload page when ID changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  public ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.articleService.getArticleDetails(this.route.snapshot.queryParams["id"])
          .subscribe(
            result => {
              this.article = result;
            }
          );
      });
  }

  public selectedArticleAmount(amount) {
    this.articleAmount = amount;
  }

  public addShoppingBasketItem() {
    this.shoppingBasketService.addItem(this.article._id, this.articleAmount)
      .subscribe(shoppingBasket => {
          this.snackBar.open(this.article.name + ' zum Warenkorb hinzugefügt.', null, {duration: 1500});
        }
      );
  }

  public changeArticleRating(rateUp) {
    this.articleService.changeRating(new ArticleRating(this.article._id,rateUp))
      .subscribe(article => {
        this.article = article;
          this.snackBar.open(this.article.name + ' Bewertung geändert.', null, {duration: 1500});
        }
      );
  }

}

