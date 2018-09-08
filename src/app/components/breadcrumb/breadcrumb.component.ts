import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbPath} from "./breadcrumb-path";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public firstParam: string;
  public breadcrumbPath: BreadcrumbPath[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  public ngOnInit() {
    this.route.paramMap
      .subscribe((result) => {
        this.firstParam = this.route.snapshot.queryParams.article;
        this.route.data.subscribe(data => {
          this.breadcrumbPath = data.breadcrumbPath;
        });
      });
  }

}
