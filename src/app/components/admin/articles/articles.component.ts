import { Component, OnInit } from '@angular/core';
import {Article} from 'src/app/services/articles/article';
import {Observable} from 'rxjs';
import {ArticleService} from '../../../services/articles/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public articles$: Observable<Article[]>;
  public n: number = 1;

  constructor(
    private articleService: ArticleService
  ) {
    this.articles$ = this.articleService.searchArticles('');
    this.articles$.subscribe( result => {
      console.log(result);
    });
  }

  ngOnInit() {
  }

}
