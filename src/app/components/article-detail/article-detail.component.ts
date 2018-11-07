import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../services/articles/article.service';
import {Article} from '../../services/articles/article';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {ArticleRating} from '../../services/articles/article-rating';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../../services/commons/snack-bar/snack-bar.service';
import {backendUrls} from '../../constants/backend-urls';
import {UserService} from '../../services/user/user.service';
import {ArticleURLs} from './articleURL';
import {LanguageService} from "../../services/lang-service/language.service";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})

export class ArticleDetailComponent implements OnInit {
  private static CODE_TRANSLATION_ADDED = 'ADDED-TO-SHOPPING-BASKET';

  public article: Article;
  public imageURL: string = backendUrls.public;
  public selectedValue = 1;
  private articleAmount = 1;
  public loading = true;
  public articleURLs: ArticleURLs;
  public slideIndex = 1;
  public amount = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'}
  ];
  public language = 'de';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private shoppingBasketService: ShoppingBasketService,
    private translate: TranslateService,
    private snackBarService: SnackBarService,
    public userService: UserService,
    private langService: LanguageService
  ) {
    // reload page when ID changes
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.langService.getLanguage().subscribe(langDef  => {
      this.language = langDef.code;
    });
  }

  public ngOnInit() {
    this.route.paramMap
      .subscribe( () => {
        this.articleService.getArticleDetails(this.route.snapshot.queryParams['article'])
          .subscribe(
            result => {
              this.article = result;
              this.loading = false;
              this.articleURLs = {
                img01: this.imageURL + this.article.imageURL,
                img02: this.imageURL + this.article.imageURL2,
                img03: this.imageURL + this.article.imageURL3

              };
              this.showSlides(this.slideIndex);

            }
          );
      });
  }


  public onSelectedArticleAmount(amount) {
    this.articleAmount = amount;
  }

  public onAddShoppingBasketItem() {
    this.shoppingBasketService.addItem(this.article._id, this.articleAmount)
      .subscribe(() => {
          this.translate.get(ArticleDetailComponent.CODE_TRANSLATION_ADDED).subscribe(translated => {
              this.snackBarService.showInfo(this.article.name + ' ' + translated);
            }
          );
        }
      );
  }

  public onChangeArticleRating(rateUp) {
    this.articleService.changeRating(new ArticleRating(this.article._id, rateUp))
      .subscribe(article => {
          this.article = article;
        }
      );
  }

  public showSlides(n) {
    this.slideIndex = n;
    let i;
    const slides = document.getElementsByClassName('article-detail-img');
    const bullets = document.getElementsByClassName('bullet');
    n > slides.length ? this.slideIndex = 1 : n < 1 ? this.slideIndex = slides.length : '';
    for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute('style', 'display:none');
    }
    for (i = 0; i < bullets.length; i++) {
      bullets[i].className = bullets[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].setAttribute('style', 'display:block');
    bullets[this.slideIndex - 1].className += ' active';
  }

  public plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  public currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }
}

