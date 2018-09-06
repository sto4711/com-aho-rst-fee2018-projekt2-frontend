import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../services/articles/article.service';
import {ShoppingBasketComponent} from '../shopping-basket/shopping-basket.component';
import {ClientContextService} from '../../services/client-context/client-context.service';
import {Article} from "../../services/articles/article";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})


export class ArticleDetailComponent implements OnInit {
  public article: Article;
  public imageURL: string = this.clientContextService.getBackendURL_public();
  public selectedValue = 1;
  public articleName: string;
  private articleAmount: number = 1;
  public title: string;
  amount = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private shoppingBasketComponent: ShoppingBasketComponent,
    private clientContextService: ClientContextService
  ) {
    // reload page when ID changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.title = 'Unsere Artikel';

  }


  selectedArticleAmount(amount) {
    this.articleAmount = amount;
  }

  addShoppingBasketItem() {
    this.shoppingBasketComponent.addShoppingBasketItem(this.article._id, this.article.name, this.articleAmount);
  }

  public ngOnInit() {

    this.route.paramMap
      .subscribe(params => {
        this.articleService.getArticleDetails(this.route.snapshot.queryParams['id'])
          .subscribe(
            result => {
              this.article = result;
            }
          );
      });
  }


}

