import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbTranslationService} from '../../services/breadcrumb-translation/breadcrumb-translation.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public breadcrumbTranslationService: BreadcrumbTranslationService
  ) {
  }

  public ngOnInit() {
    this.route.paramMap
      .subscribe((result) => {
        this.breadcrumbTranslationService.firstParam = this.route.snapshot.queryParams.article;
        this.route.data.subscribe(data => {
          this.breadcrumbTranslationService.breadcrumbPath = data.breadcrumbPath;
          this.breadcrumbTranslationService.get();
        });
      });
  }

}
