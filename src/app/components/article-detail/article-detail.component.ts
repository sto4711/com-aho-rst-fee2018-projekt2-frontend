import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../services/articles/article.service';
import {ClientContextService} from '../../services/client-context/client-context.service';
import {Article} from "../../services/articles/article";
import {ShoppingBasketService} from "../../services/shopping-basket/shopping-basket.service";
import {ArticleRating} from "../../services/articles/article-rating";
import {TranslateService} from "@ngx-translate/core";
import {SnackBarService} from "../../services/commons/snack-bar/snack-bar.service";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})

export class ArticleDetailComponent implements OnInit {
  public article: Article;
  public imageURL: string = ClientContextService.BACKEND_URL_PUBLIC;
  public selectedValue = 1;
  private articleAmount: number = 1;
  public loading: boolean = true;

  public amount = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'}
  ];
  private static CODE_TRANSLATION_ADDED = 'ADDED-TO-SHOPPING-BASKET';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private shoppingBasketService: ShoppingBasketService,
    private translate: TranslateService,
    private snackBarService: SnackBarService
  ) {
    // reload page when ID changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  public ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.articleService.getArticleDetails(this.route.snapshot.queryParams['article'])
          .subscribe(
            result => {
              this.article = result;
              this.loading = false;
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
          this.translate.get(ArticleDetailComponent.CODE_TRANSLATION_ADDED).subscribe(translated => {
            this.snackBarService.showInfo(this.article.name + ' ' + translated)
            }
          );
        }
      );
  }

  public changeArticleRating(rateUp) {
    this.articleService.changeRating(new ArticleRating(this.article._id, rateUp))
      .subscribe(article => {
          this.article = article;
        }
      );
  }

}

