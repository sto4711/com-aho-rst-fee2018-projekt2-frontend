import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {Article} from '../../services/articles/article';
import {ArticleService} from '../../services/articles/article.service';
import {HttpErrorResponse} from "@angular/common/http";
import {DialogService} from "../../services/commons/dialog/dialog.service";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  articlesResult: any;
  articles$: Observable<Article[]>;
  stateCtrl = new FormControl();

  articles = [];

  constructor(
    private articleService: ArticleService
    , private dialogService: DialogService
  ) {

    this.articles$ = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore new term if same as previous term
      switchMap((term: string) => this.articleService.searchArticles(term)),
      catchError((error: HttpErrorResponse) => {
        return of(this.handleError('search bikes', error));
      })
    );
  }

  private handleError<T>(operation = 'operation', error: any) {
      this.dialogService.confirm('Error -> ' + operation, 'Es ist ein Fehler aufgetreten ' + error);
      return [];
    }

  }
