import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap, startWith} from 'rxjs/operators';
import {HttpErrorResponse} from "@angular/common/http";

import {InfoService} from 'src/app/services/info/info.service';
import {LoginService} from 'src/app/services/login/login.service';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {ArticleService} from 'src/app/services/articles/article.service';
import {Article} from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  title: string = 'Bikes';
  articles$: Observable<Article[]>;
  imageURL: string = this.clientContextService.getBackendURL_public();
  private searchTerms = new Subject<string>();

  constructor(
    private infoService: InfoService
    , private loginService: LoginService
    , private clientContextService: ClientContextService
    , private articleService: ArticleService
    , private router: Router
  ) {
  }

  ngOnInit(): void {
    this.articles$ = this.searchTerms.pipe(
      startWith(''),
      debounceTime(300), // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore new term if same as previous term
      switchMap((term: string) => this.articleService.searchArticles(  term)),
      catchError((error: HttpErrorResponse) => {
        return of(this.handleError('search bikes', error));
      })
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  private handleError<T>(operation = 'operation', error: any) {
    if (error instanceof HttpErrorResponse && error.status == 401) {
      this.infoService.showError(operation + ' not authenticated, please login');
      this.router.navigate(['login']).then();
    } else {
      alert(error.message);
    }
    return [];
  }
}
