import { Component, OnInit, Input } from '@angular/core';
import {Article} from 'src/app/services/articles/article';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
  styleUrls: ['./article-template.component.scss']
})
export class ArticleTemplateComponent implements OnInit {

  @Input() article: Article;
  imageURL: string = ClientContextService.BACKEND_URL_PUBLIC;

  constructor(
    private clientContextService: ClientContextService,
    private router: Router

  ) { }

  ngOnInit() {
  }
  goToDetail(articleQueryParameter){
    //articleName = articleName.replace(/ /g,"-");
    this.router.navigate(['article-detail'], { queryParams: {article: articleQueryParameter} });
  }
}
