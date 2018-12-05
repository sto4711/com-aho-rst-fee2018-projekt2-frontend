import {Component, OnInit} from '@angular/core';

import {ArticleService} from 'src/app/services/articles/article.service';
import {Article} from 'src/app/services/articles/article';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit  {
  public articles$: Observable<Article[]>;
  private currentURL:

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,

  ) {
    this.articles$ = this.articleService.getArticlesLatest(4);
  }

  public ngOnInit(): void {
    this.route.paramMap
      .subscribe( () => {
        this.currentURL =
        if (this.queryParams[/'home'] && this.route.snapshot.queryParams['article'] !== '') {

        }
      });
  }
}
