import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../services/order/order.service";
import {Order} from "../../services/order/order";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  public jsonOrder: string = '';
  public order: Order;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  public ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.orderService.getOrderDetails(this.route.snapshot.queryParams["id"])
          .subscribe(
            result => {
              this.order = result;
              this.jsonOrder = JSON.stringify(result);
            }
          );
      });
  }


}
