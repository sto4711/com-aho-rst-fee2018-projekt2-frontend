import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {


  private firstParam: string;
  private breadcrumbPath: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
     this.route.paramMap
      .subscribe( (result) => {

         this.firstParam = this.route.snapshot.queryParams.article;

        this.route.data.subscribe( data => {

          this.breadcrumbPath = data.breadcrumbPath;
         });

      });
  }

}
