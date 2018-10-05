import { Component, OnInit, Input } from '@angular/core';
import {Article} from 'src/app/services/articles/article';
import {Router} from '@angular/router';
import {backendUrls} from "../../constants/backend-urls";

@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
  styleUrls: ['./article-template.component.scss']
})
export class ArticleTemplateComponent implements OnInit {

  @Input() article: Article;
  imageURL: string = backendUrls.public;
  loading: boolean = true;
  constructor(
    private router: Router
  ) { }


  onLoad() {
    this.loading = false;
  }

  ngOnInit() {
  }
  goToDetail(articleQueryParameter){
     this.router.navigate(['article-detail'], { queryParams: {article: articleQueryParameter} });
  }
}
