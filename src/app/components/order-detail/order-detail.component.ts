import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../services/order/order.service';
import {Order} from '../../services/order/order';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../services/lang-service/lang.service';
import {Observable} from "rxjs";
import {Article} from "../../services/articles/article";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  public order: Order;
  private langSwitch: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public orderService: OrderService,
    private translate: TranslateService,
    private langService: LangService

  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.langSwitch = true;
    this.langService.getLanguage().subscribe(language => {
      this.langSwitch = !this.langSwitch;
    });
  }

  public ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.orderService.get(this.route.snapshot.queryParams["id"])
          .subscribe(
            result => {
              this.order = result;
              }
          );
      });
  }


}
