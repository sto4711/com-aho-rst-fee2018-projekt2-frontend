import {Component, OnInit, Input, Directive} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {Order} from '../../../services/order/order';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../../services/lang-service/lang.service';
 import {ClientContextService} from '../../../services/client-context/client-context.service';
import {UserService} from '../../../services/admin/user/user.service';
import {User} from '../../../services/admin/user/user';
import {Sort} from '@angular/material';
import {SnackBarService} from '../../../services/commons/snack-bar/snack-bar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  public orderData: FormGroup;

  public orderState = [
    {value: 'APPROVED', viewValue: '???'},
    {value: 'COMPLETED', viewValue: '???'},
    {value: 'CANCELED', viewValue: '???'}
  ];
  private static CODE_TRANSLATION_UPDATED = 'ORDER-STATUS-UPDATED';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private translate: TranslateService,
    private langService: LangService,
    private clientContextService: ClientContextService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,


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
    this.orderData = this.formBuilder.group({
      givenname: ['', Validators.required],
    });

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


  public updateOrder(orderData){
    console.log(orderData);
  }

 /* public onSelectionChange(orderState, orderId) {
     this.orderService.updateState(orderState.value, orderId)
      .subscribe(order => {
          this.translate.get(OverviewComponent.CODE_TRANSLATION_UPDATED).subscribe(translated => {
            this.snackBarService.showInfo(' ' + ' ' + translated);

           }
          );
         },
       error => {
          if (error.status === 401) {
            this.translate.get('').subscribe(translated => {
                this.snackBarService.showInfo('' + ' ' + translated);
                 this.router.navigate(['my-account']).then();
              }
              );
          }
       }
      );
  }
*/
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
