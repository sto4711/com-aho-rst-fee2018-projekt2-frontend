import { Component  } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject, Subscriber} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
 import {ArticleService} from '../../services/articles/article.service';
import {Article} from '../../components/search/article';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent   {
  articlesResult: any;

  stateCtrl = new FormControl();
  filteredArticle: Observable<Article[]>;

  articles = [];

  constructor(
    private articleService: ArticleService,

  ) {
    this.filteredArticle = this.stateCtrl.valueChanges

      .pipe(
        startWith(''),
        map(article => article ? this._filterArticle(article) : this.articles.slice())
      );

  }

  private _filterArticle(value: string): Article[] {
    const filterValue = value.toLowerCase();
    if (filterValue.length > 3) {
      this.articlesResult = this.articleService.searchArticles(filterValue)
        .subscribe(
          result => {
            this.articles = result;
          }
        );
      return this.articles.filter(article => article.name.toLowerCase().indexOf(filterValue) === 0);

    }
    else{
      this.articles = [];
      return this.articles;
    }

  }


}
