import {Component, OnInit, Input} from '@angular/core';

import {Article} from 'src/app/services/articles/article';
import {Observable} from 'rxjs';
import {ArticleService} from '../../services/articles/article.service';

@Component({
  selector: 'app-article-listing',
  templateUrl: './article-listing.component.html',
  styleUrls: ['./article-listing.component.css']
})
export class ArticleListingComponent implements OnInit {
  articles$: Observable<Article[]>;

  p: number = 1;

  constructor(
    private articleService: ArticleService
  ) {
    this.articles$ = this.articleService.searchArticles('');
  }

  ngOnInit() {
  }


}

