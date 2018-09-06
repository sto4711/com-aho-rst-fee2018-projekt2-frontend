import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [ './breadcrumb.component.css' ],
 })
export class BreadcrumbComponent implements OnInit {
  @Input() title: string;
  @Input() articleName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.params;
    const queryParams = this.route.snapshot.queryParams;
  console.log(queryParams);
  console.log(routeParams);
  }
}
