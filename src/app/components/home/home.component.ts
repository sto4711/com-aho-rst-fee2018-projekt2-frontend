import {Component, OnInit} from '@angular/core';

import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {ArticleService} from 'src/app/services/articles/article.service';
import {Article} from 'src/app/services/articles/article';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles: Observable<Article[]>;

  imageURL: string = this.clientContextService.getBackendURL_public();
  p: number = 1;

  constructor(
    private clientContextService: ClientContextService
    , private articleService: ArticleService,
  ) {
    this.articles = this.articleService.getArticlesNewest(4);
  }

  ngOnInit() {
  }

}
