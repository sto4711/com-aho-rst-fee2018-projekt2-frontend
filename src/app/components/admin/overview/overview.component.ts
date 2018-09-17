import { Component, OnInit, Input, Directive } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {Order} from '../../../services/order/order';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../../services/lang-service/lang.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public orders = [];
  public selectedState = 'approved';
  public p: number = 1;
  private langSwitch: boolean;
  private panelOpenState = false;

  public orderState = [
    {value: 'approved', viewValue: 'In bearbeitung'},
    {value: 'completed', viewValue: 'Versendet'},
    {value: 'canceled', viewValue: 'Annuliert'}
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
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

        this.orderService.getAll( )
          .subscribe(
            result => {
             this.orders.push(result);

            }
          );
  }
  updateOrderState(orderState) {
    this.selectedState = orderState;
   }
}
