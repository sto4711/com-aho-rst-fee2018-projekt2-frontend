import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {Order} from '../../../services/order/order';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../../services/lang-service/lang.service';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../services/user/user';
import {Sort} from '@angular/material';
import {SnackBarService} from '../../../services/commons/snack-bar/snack-bar.service';
import {ConfirmYesNoService} from '../../../services/commons/dialog/confirm-yes-no.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']

})
export class OverviewComponent implements OnInit {
  public orders: Order[];
  public sortedOrderData: Order[];
  public users: User[];
  public sortedUserData: User[];
  public p: number = 1;
  public t: number = 1;
  public panelOpenState: boolean = false;
  public orderChanged: boolean = false;

  public orderState = [
    {value: 'APPROVED', viewValue: '???'},
    {value: 'COMPLETED', viewValue: '???'},
    {value: 'CANCELED', viewValue: '???'}
  ];

  public roles = [
    {value: 'admin', viewValue: 'admin'},
    {value: 'customer', viewValue: 'customer'}
  ];

  private static CODE_TRANSLATION_UPDATED = 'ORDER-UPDATE-SAVE';
  private static CODE_TRANSLATION_DELETED = 'ORDER-IS-DELETED';
  private static CODE_TRANSLATION_DELETE_FOR_SURE = 'TO-DELETE-THIS-ORDER-FOR-SURE';

  private static CODE_TRANSLATION_USER_UPDATED = 'USER-DATA-UPDATED';
  private static CODE_TRANSLATION_USER_DELETED = 'USER-IS-DELETED';
  private static CODE_TRANSLATION_DELETE_USER_FOR_SURE = 'TO-DELETE-THIS-USER-FOR-SURE';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private translate: TranslateService,
    private langService: LangService,
    private snackBarService: SnackBarService,
    public confirmYesNoService: ConfirmYesNoService
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
    this.getUsers();
    this.getAllOrders();

  }


  public getAllOrders() {
    this.orderService.getAll()
      .subscribe(
        result => {
          this.orders = result;
        }
      );
  }

  getUsers(): void {
    const token = this.userService.getToken();
    this.userService.getUsers()
      .subscribe(users => {
          this.users = users;
        },
        error => {
        }
      );

  }


  public formChange(orderId) {
    this.orderChanged = true;
  }

  public updateOrder(orderData) {
    const updatedOrder = {
      _id: orderData.value._id,
      userID: orderData.value.userID,
      state: orderData.value.state,
      deliveryAddress: {
        givenname: orderData.value.givenname, surname: orderData.value.surname,
        streetHousenumber: orderData.value.streetHousenumber,
        postCode: orderData.value.postCode, city: orderData.value.city
      },
      contactData: {email: orderData.value.email, phone: orderData.value.phone},
      deliveryType: {delivery: orderData.value.delivery},
      paymentType: {payment: orderData.value.payment}
    };
    this.orderService.updateOrder(updatedOrder)
      .subscribe(order => {
          this.translate.get(OverviewComponent.CODE_TRANSLATION_UPDATED).subscribe(translated => {
              this.snackBarService.showInfo(' ' + ' ' + translated);

            }
          );
        }
      );
  }

  public confirmDelete(orderData, formType) {
    let confirmMessage = '';
    (formType === 'orderDelete' ? confirmMessage = OverviewComponent.CODE_TRANSLATION_DELETE_FOR_SURE : confirmMessage = OverviewComponent.CODE_TRANSLATION_DELETE_USER_FOR_SURE);
    this.translate.get(confirmMessage).subscribe(translated => {
        this.confirmYesNoService.confirm(' ' + translated).subscribe(
          result => {
            if (result === 'yes') {
              (formType === 'orderDelete' ? this.deleteOrder(orderData) : this.deleteUser(orderData));

            }
          }
        );
      }
    );
  }

  public deleteOrder(orderData) {
    this.orderService.deleteOrder(orderData.value._id)
      .subscribe(order => {
          this.translate.get(OverviewComponent.CODE_TRANSLATION_DELETED).subscribe(translated => {
              this.snackBarService.showInfo(' ' + ' ' + translated);
              this.getAllOrders();
            }
          );
        }
      );
  }

  public updateUser(userData) {
    const updatedUser = {
      _id: userData.value.user_id,
      firstname: userData.value.firstname,
      name: userData.value.name,
      email: userData.value.email,
      pwd: userData.value.pwd,
      type: userData.value.type
    };
    this.userService.updateUser(updatedUser)
      .subscribe(user => {
          this.translate.get(OverviewComponent.CODE_TRANSLATION_USER_UPDATED).subscribe(translated => {
              this.snackBarService.showInfo(' ' + ' ' + translated);

            }
          );
        },
        error => {
          if (error.status === 401) {
            this.translate.get('').subscribe(translated => {
                this.snackBarService.showInfo('' + ' ' + translated);
              }
            );
          }
        }
      );
  }

  public deleteUser(userData) {
    this.userService.deleteUser(userData.value.user_id)
      .subscribe(user => {
          this.translate.get(OverviewComponent.CODE_TRANSLATION_USER_DELETED).subscribe(translated => {
              this.snackBarService.showInfo(' ' + ' ' + translated);
              this.getUsers();
            }
          );
        },
        error => {
          if (error.status === 401) {
            this.translate.get('').subscribe(translated => {
                this.snackBarService.showInfo('' + ' ' + translated);
              }
            );
          }
        }
      );

  }

  public sortData(sort: Sort) {
    const orderData = this.orders;
    const userData = this.users;
    if (!sort.active || sort.direction === '') {
      this.sortedOrderData = orderData;
      this.sortedUserData = userData;
      return;
    }

    this.sortedOrderData = orderData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name-order':
          return this.compare(a.deliveryAddress.givenname, b.deliveryAddress.givenname, isAsc);
        case 'date':
          return this.compare(a.orderDate, b.orderDate, isAsc);
        case 'state':
          return this.compare(a.state, b.state, isAsc);
        default:
          return 0;
      }
    });
    this.sortedUserData = userData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'user-name':
          return this.compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }

  public compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
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
