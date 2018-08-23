import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Router } from '@angular/router';
import {ArticleService} from '../../services/articles/article.service';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  articleDetails: any;
  imageURL: string = this.clientContextService.getBackendURL_public();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private clientContextService: ClientContextService

  ) {
    this.route.paramMap
      .subscribe( params => {
        let id = params.get('_id');
        this.articleDetails =  this.articleService.getArticleDetails(id)
          .subscribe(
            result => {
              this.articleDetails = result;
            }
          );
      });
  }

  ngOnInit() {}

}

