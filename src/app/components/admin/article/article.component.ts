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
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  title: string = 'Demo searching by enter letters';
  articles$: Observable<Article[]>;
  imageURL: string =  ClientContextService.BACKEND_URL_PUBLIC;
  private searchTerms = new Subject<string>();

  constructor(
    private loginService: LoginService
    , private articleService: ArticleService
    , private router: Router
  ) {
  }

  ngOnInit(): void {
    this.articles$ = this.searchTerms.pipe(
      startWith(null),
      debounceTime(300), // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore new term if same as previous term
      switchMap((term: string) => this.articleService.searchArticles(term)),
      catchError((error: HttpErrorResponse) => {
        return of<Article[]>([]);//continue with no message
      })
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }


}
