import { Component, OnInit, Input } from '@angular/core';
import {Article} from 'src/app/services/articles/article';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';

@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
  styleUrls: ['./article-template.component.css']
})
export class ArticleTemplateComponent implements OnInit {

  @Input() article: Article;
  imageURL: string = this.clientContextService.getBackendURL_public();

  constructor(
    private clientContextService: ClientContextService

  ) { }

  ngOnInit() {
  }

}
