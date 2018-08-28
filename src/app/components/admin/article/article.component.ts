import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login/login.service";
import {catchError, debounceTime, distinctUntilChanged, startWith, switchMap} from "rxjs/operators";
import {ClientContextService} from "../../../services/client-context/client-context.service";
import {Router} from "@angular/router";
import {Observable, of, Subject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ArticleService} from "../../../services/articles/article.service";
import {Article} from "../../../services/articles/article";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  title: string = 'Demo searching by enter letters';
  products$: Observable<Article[]>;
  imageURL: string =  this.clientContextService.getBackendURL_public();
  private searchTerms = new Subject<string>();

  constructor(
    private loginService: LoginService
    , private clientContextService: ClientContextService
    , private articleService: ArticleService
    , private router: Router
  ) {
  }

  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      startWith(''),
      debounceTime(300), // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore new term if same as previous term
      switchMap((term: string) => this.articleService.searchArticles(term)),
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
      this.router.navigate(['my-account']).then();
    } else {
      alert(error.message);
    }

    return [];
  }

}
