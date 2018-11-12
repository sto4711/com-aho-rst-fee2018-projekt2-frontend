import {Component, OnInit, Input} from '@angular/core';
import {Article} from 'src/app/services/articles/article';
import {Router} from '@angular/router';
import {backendUrls} from '../../constants/backend-urls';

@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
  styleUrls: ['./article-template.component.scss']
})
export class ArticleTemplateComponent implements OnInit {

  @Input() public article: Article;
  public imageURL: string = backendUrls.public;
  public loading  = true;

  constructor(
    private router: Router
  ) {
  }

  public onLoad() {
    this.loading = false;
  }

  public ngOnInit() {
  }

  public onGoToDetail(articleQueryParameter) {
    this.router.navigate(['article-detail'], {queryParams: {article: articleQueryParameter}}).then();
  }
}
