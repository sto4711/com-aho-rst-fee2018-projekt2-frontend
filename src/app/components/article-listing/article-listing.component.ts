import {Component, OnInit} from '@angular/core';


import {InfoService} from 'src/app/services/info/info.service';
 import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {ArticleService} from 'src/app/services/articles/article.service';
import {Article} from 'src/app/services/articles/article';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-article-listing',
  templateUrl: './article-listing.component.html',
  styleUrls: ['./article-listing.component.css']
})
export class ArticleListingComponent implements OnInit {
  articles$: Observable<Article[]>;
  imageURL: string = this.clientContextService.getBackendURL_public();
  p: number = 1;
  constructor(
    private infoService: InfoService
     , private clientContextService: ClientContextService
    , private articleService: ArticleService
   ) {

    this.articles$ =  this.articleService.getAllArticles( );
  }

  ngOnInit(): void { }

}

