import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbPath} from "./breadcrumb-path";
import {BreadcrumbService} from "../../services/breadcrumb/breadcrumb.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public breadcrumbService: BreadcrumbService
  ) {
  }

  public ngOnInit() {
    this.route.paramMap
      .subscribe((result) => {
        this.breadcrumbService.firstParam = this.route.snapshot.queryParams.article;
        this.route.data.subscribe(data => {
          this.breadcrumbService.breadcrumbPath = data.breadcrumbPath;
          this.breadcrumbService.translateBreadcrumb();
        });
      });
  }

}
