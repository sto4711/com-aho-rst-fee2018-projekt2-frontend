import {Component, OnInit, Input, Directive} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {Order} from '../../../services/order/order';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../../services/lang-service/lang.service';
import {LoginService} from "../../../services/login/login.service";
import {ClientContextService} from "../../../services/client-context/client-context.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public orders = [];
  public p: number = 1;
  public panelOpenState: boolean = false;

  public orderState = [
    {value: 'APPROVED', viewValue: '???'},
    {value: 'COMPLETED', viewValue: '???'},
    {value: 'CANCELED', viewValue: '???'}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private translate: TranslateService,
    private langService: LangService,
    private clientContextService: ClientContextService,
    private snackBar: MatSnackBar
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.langService.getLanguage().subscribe(language => {
      this.translateOrderState();
    });

    this.translateOrderState();
  }

  public ngOnInit() {
    this.orderService.getAll()
      .subscribe(
        result => {
          this.orders.push(result);
        }
      );
  }

  public onSelectionChange(orderState) {
    debugger;
    // this.orderService.updateState(this.clientContextService.getToken(), OrderService.STATE_APPROVED)
    //   .subscribe(order => {
    //       this.translate.get(OrderService.CODE_TRANSLATION_ORDER_CREATED).subscribe(translated => {
    //           this.snackBar.open(translated, null, {duration: 2500, panelClass: 'snackbar'});
    //         }
    //       );
    //     },
    //     error => {
    //       if (error.status === 401) {
    //         this.translate.get(LoginService.CODE_TRANSLATION_SIGN_IN_FIRST).subscribe(translated => {
    //             this.snackBar.open(translated, null, {duration: 2500, panelClass: 'snackbar'});
    //             this.router.navigate(['my-account']).then();
    //           }
    //         );
    //       }
    //     }
    //   );
  }

  private translateOrderState() {
    for (let i = 0; i < this.orderState.length; i++) {
      this.translate.get(this.orderState[i].value).subscribe(translated => {
          this.orderState[i].viewValue = translated;
        }
      );
    }
  }

}
