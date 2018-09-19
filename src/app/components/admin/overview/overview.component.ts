import {Component, OnInit, Input, Directive} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {Order} from '../../../services/order/order';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../../services/lang-service/lang.service';
import {LoginService} from '../../../services/login/login.service';
import {ClientContextService} from '../../../services/client-context/client-context.service';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../../../services/admin/user/user.service';
import {User} from '../../../services/admin/user/user';
import {Sort} from '@angular/material';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public orders: any;
  public p: number = 1;
  public panelOpenState: boolean = false;
  public users: User[];
  public sortedData: Order;
  public orderState = [
    {value: 'APPROVED', viewValue: '???'},
    {value: 'COMPLETED', viewValue: '???'},
    {value: 'CANCELED', viewValue: '???'}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private translate: TranslateService,
    private langService: LangService
    , private clientContextService: ClientContextService

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
  //  this.getUsers();
    this.orderService.getAll()
      .subscribe(
        result => {
          this.orders = result;
         }
      );

  }
  public sortData(sort: Sort) {
    const data = this.orders ;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      console.log(a.deliveryAddress);
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.deliveryAddress.givenname, b.deliveryAddress.givenname, isAsc);
        case 'date': return this.compare(a.orderDate, b.orderDate, isAsc);
        case 'state': return this.compare(a.state, b.state, isAsc);
        default: return 0;
      }
    });
  }
  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
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

  getUsers(): void {
    this.userService.get(this.clientContextService.getToken())
      .subscribe(users => {
          this.users = users;
        },
        error => {
          this.router.navigate(['login']).then();
        }
      );
  }

}
