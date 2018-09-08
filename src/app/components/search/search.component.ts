import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ArticleService} from '../../services/articles/article.service';
import {Article} from "../../services/articles/article";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  stateCtrl = new FormControl();
  filteredArticle: Observable<Article[]>;
  articles = [];

  constructor(
    private articleService: ArticleService,
  ) {
    this.filteredArticle = this.stateCtrl.valueChanges
      .pipe(
        startWith(null),
        map(term => this.searchArticle(term))
      );

  }


  private searchArticle(term: string): Article[] {
    if (term && term.length > 3) {
      const termLower = term.toLowerCase();
      this.articleService.searchArticles(termLower)
        .subscribe(
          result => {
            this.articles = result;
          }
        );
      return this.articles.filter(article => article.name.toLowerCase().indexOf(termLower) === 0);
    }
    else {
      this.articles = [];
      return this.articles;
    }
  }

}
