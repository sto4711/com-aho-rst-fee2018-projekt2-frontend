import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  private breadcrumb: string;
  private mainUrl: string;
  private firstParam: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
    console.log('breadcrumb');
    this.route.paramMap
      .subscribe( (result) => {

         this.firstParam = this.route.snapshot.queryParams.article;

        this.route.data.subscribe( data => {
          this.mainUrl = data.mainUrl;
          this.breadcrumb = data.breadcrumb;

         });

      });
  }

}
