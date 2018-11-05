import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {Order} from '../../../services/order/order';
import {TranslateService} from '@ngx-translate/core';
import {LangService} from '../../../services/lang-service/lang.service';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../services/user/user';
import {Sort} from '@angular/material';
import {SnackBarService} from '../../../services/commons/snack-bar/snack-bar.service';
import {ConfirmYesNoService} from '../../../services/commons/dialog/confirm-yes-no.service';
import {Observable, of} from 'rxjs';
import {CanComponentDeactivateGuard} from '../../../services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {map} from 'rxjs/operators';
import {CanComponentDeactivate} from '../../../services/commons/can-component-deactivate-guard/can-component-deactivate';
import {Address} from '../../../services/order/address';
import {ContactData} from '../../../services/order/contact-data';
import {DeliveryType} from '../../../services/order/delivery-type';
import {PaymentType} from '../../../services/order/payment-type';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']

})
export class OverviewComponent implements OnInit, CanComponentDeactivate {
  private static CODE_TRANSLATION_UPDATED = 'ORDER-UPDATE-SAVE';
  private static CODE_TRANSLATION_DELETED = 'ORDER-IS-DELETED';
  private static CODE_TRANSLATION_DELETE_FOR_SURE = 'TO-DELETE-THIS-ORDER-FOR-SURE';

  private static CODE_TRANSLATION_USER_UPDATED = 'USER-DATA-UPDATED';
  private static CODE_TRANSLATION_USER_DELETED = 'USER-IS-DELETED';
  private static CODE_TRANSLATION_DELETE_USER_FOR_SURE = 'TO-DELETE-THIS-USER-FOR-SURE';
  public orders: Order[];
  public sortedOrderData: Order[];
  public users: User[];
  public sortedUserData: User[];
  public p = 1;
  public t = 1;
  public panelOpenState = false;
  public changed = false;
  public orderState = [
    {value: 'APPROVED', viewValue: '???'},
    {value: 'COMPLETED', viewValue: '???'},
    {value: 'CANCELED', viewValue: '???'}
  ];

  public roles = [
    {value: 'admin', viewValue: 'admin'},
    {value: 'customer', viewValue: 'customer'}
  ];

  public paymethode = [
    {value: 'Paypal', viewValue: 'Paypal'},
    {value: 'Mastercard', viewValue: 'Mastercard'},
    {value: 'Visa', viewValue: 'Visa'}
  ];



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

    this.langService.getLanguage().subscribe(() => this.translateOrderState());
    this.translateOrderState();
  }
  private static getOrderElement(orderId) {
    return document.getElementsByClassName(orderId);
  }
  public static compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  public ngOnInit() {
    this.getUsers();
    this.getAllOrders();
  }
  public canDeactivate(): Observable<boolean> {
    if (this.changed === true) {
      return this.confirmYesNoService.confirm(CanComponentDeactivateGuard.CODE_TRANSLATION_DISCARD_CHANGES)
        .pipe(
          map((value) => (value === 'yes'))
        );
    } else {
      return of(true);
    }
  }

  public confirmDelete(dataId, formType) {
    const confirmMessage = (formType === 'orderDelete' ? OverviewComponent.CODE_TRANSLATION_DELETE_FOR_SURE :
      OverviewComponent.CODE_TRANSLATION_DELETE_USER_FOR_SURE);
    this.translate.get(confirmMessage).subscribe(translated => {
        this.confirmYesNoService.confirm(' ' + translated).subscribe(
          result => {
            if (result === 'yes') {
              (formType === 'orderDelete' ? this.deleteOrder(dataId) : this.deleteUser(dataId));
            }
          }
        );
      }
    );
  }

  public getAllOrders() {
    this.orderService.getAll().subscribe(result => this.orders = result);
  }



  public updateOrder(orderData) {
    this.changed = false;
    OverviewComponent.getOrderElement(orderData.value._id)[0].classList.toggle('show');
    const deliveryAddress: Address = new Address(orderData.value.givenname, orderData.value.surname,
          orderData.value.streetHousenumber, orderData.value.postCode, orderData.value.city);
    const contactData: ContactData = new ContactData(orderData.value.email, orderData.value.phone);
    const deliveryType: DeliveryType = new DeliveryType(orderData.value.delivery);
    const paymentType: PaymentType = new PaymentType(orderData.value.payment);
    this.orderService.updateOrder(new Order(orderData.value._id, orderData.value.userID,
          orderData.value.state, deliveryAddress, contactData, deliveryType, paymentType))
      .subscribe(() => this.snackBarService.showInfo(OverviewComponent.CODE_TRANSLATION_UPDATED));
  }

  public formChange(dataId) {
    OverviewComponent.getOrderElement(dataId)[0].classList.add('show');
    this.changed = true;
  }

  public deleteOrder(orderId) {
    this.orderService.deleteOrder(orderId)
      .subscribe(() => {
          this.getAllOrders();
          this.snackBarService.showInfo(OverviewComponent.CODE_TRANSLATION_DELETED);
        }
      );
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  public updateUser(userData) {
    this.changed = false;
    OverviewComponent.getOrderElement(userData.value.user_id)[0].classList.toggle('show');
    const updatedUser = {
      _id: userData.value.user_id,
      firstname: userData.value.firstname,
      name: userData.value.name,
      email: userData.value.email,
      pwd: userData.value.pwd,
      type: userData.value.type
    };
    this.userService.updateUser(updatedUser).subscribe(() =>
      this.snackBarService.showInfo(OverviewComponent.CODE_TRANSLATION_USER_UPDATED));
  }

  public deleteUser(userId) {
    this.userService.deleteUser(userId)
      .subscribe(() => {
          this.getUsers();
          this.snackBarService.showInfo(OverviewComponent.CODE_TRANSLATION_USER_DELETED);
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
          return OverviewComponent.compare(a.deliveryAddress.givenname, b.deliveryAddress.givenname, isAsc);
        case 'date':
          return OverviewComponent.compare(a.orderDate, b.orderDate, isAsc);
        case 'state':
          return OverviewComponent.compare(a.state, b.state, isAsc);
        default:
          return 0;
      }
    });
    this.sortedUserData = userData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'user-name':
          return OverviewComponent.compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
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
