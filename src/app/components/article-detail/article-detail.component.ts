import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../services/articles/article.service';
import {ClientContextService} from '../../services/client-context/client-context.service';
import {Article} from "../../services/articles/article";
import {ShoppingBasketService} from "../../services/shopping-basket/shopping-basket.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
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


  selectedArticleAmount(amount) {
    this.articleAmount = amount;
  }

  addShoppingBasketItem() {
    this.shoppingBasketService.addItem(this.article._id, this.articleAmount)
      .subscribe(shoppingBasket => {
          this.snackBar.open(this.article.name + ' zum Warenkorb hinzugefügt.', null, {duration: 1500});
        }
      );

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


}

