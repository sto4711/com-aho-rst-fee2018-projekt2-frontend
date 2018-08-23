import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Router } from '@angular/router';
import {ArticleService} from '../../services/articles/article.service';
import {Observable} from 'rxjs';
import {Article} from '../../services/articles/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  articleDetails: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService


  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe( params => {
        console.log(params);
       let id = params.get('_id');
         this.articleDetails =  this.articleService.getArticleDetails(id)
          .subscribe(
          result => {

           this.articleDetails = result;
           console.log((this.articleDetails));
          }
        );
      });
  }

}

