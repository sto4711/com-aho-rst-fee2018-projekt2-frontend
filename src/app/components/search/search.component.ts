import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {ArticleService} from '../../services/articles/article.service';
import {Article} from "../../services/articles/article";
import {HttpErrorResponse} from "@angular/common/http";
import {DialogService} from "../../services/commons/dialog/dialog.service";
import {Router} from "@angular/router";
import {ClientContextService} from "../../services/client-context/client-context.service";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  public stateCtrl = new FormControl();
  public articles$: Observable<Article[]>;


  constructor(
    private articleService: ArticleService
    , private dialogService: DialogService
    , private router: Router
  ) {
    this.articles$ = this.stateCtrl.valueChanges
      .pipe(
        startWith(null),
        debounceTime(300), // wait 300ms after each keystroke before considering the term
        distinctUntilChanged(), // ignore new term if same as previous term
        switchMap((term: string) => this.searchArticle(term)),
        catchError((error: HttpErrorResponse) => {
          return this.handleError('search bikes', error);
        })
      );
  }

  private searchArticle(term: string): Observable<Article[]> {
    if (term && term.length > 3) {
      return this.articleService.searchArticles(term.toLowerCase());
    }
    else {
      return of<Article[]>([]); //empty Observable<Article[]>
    }
  }

  private handleError<T>(operation = 'operation', error: any): Observable<Article[]> {
    this.dialogService.confirm('Error -> ' + operation, 'Es ist ein Fehler aufgetreten ' + error);
    return of<Article[]>([]); //empty Observable<Article[]>
  }

  public onSelected(article: Article) {
    this.router.navigate(['/article-detail'], {queryParams: {article: article.articleQueryParameter}}).then();
  }


}
