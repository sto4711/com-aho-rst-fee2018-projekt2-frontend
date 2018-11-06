import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BreadcrumbTranslationService} from '../../services/breadcrumb-translation/breadcrumb-translation.service';
import {BreadcrumbPath} from "./breadcrumb-path";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  public firstParam: string;
  public breadcrumbPath: BreadcrumbPath[] = [];



  constructor(
    private route: ActivatedRoute,
    public breadcrumbTranslationService: BreadcrumbTranslationService,
  ) {
  }

  public ngOnInit() {
    this.route.paramMap
      .subscribe(() => {
        this.breadcrumbTranslationService.firstParam = this.route.snapshot.queryParams.article;
        this.route.data.subscribe(data => {
          this.breadcrumbTranslationService.breadcrumbPath = data.breadcrumbPath;
          this.breadcrumbTranslationService.translate();
        });
      });
  }

}
