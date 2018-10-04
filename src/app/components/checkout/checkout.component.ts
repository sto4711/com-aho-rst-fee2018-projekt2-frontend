import {Component, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {OrderService} from '../../services/order/order.service';
import {Order} from '../../services/order/order';
import {MatStepper} from '@angular/material';
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";
import {SnackBarService} from "../../services/commons/snack-bar/snack-bar.service";
import {ConfirmYesNoService} from "../../services/commons/dialog/confirm-yes-no.service";
import {CanComponentDeactivate} from "../../services/commons/can-component-deactivate-guard/can-component-deactivate";
import {CanComponentDeactivateGuard} from "../../services/commons/can-component-deactivate-guard/can-component-deactivate-guard";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements CanComponentDeactivate {
  public isLinear = true;
  public deliveryAddress: FormGroup;
  public contactData: FormGroup;
  public deliveryType: FormGroup;
  public paymentType: FormGroup;
  public itemChangePossible: boolean = false;
  public isAutoStepping: boolean = false;
  private static CODE_TRANSLATION_ORDER_DETAIL_TAKEN_OVER_FROM_LATEST: string = 'ORDER-DETAIL-TAKEN-OVER-FROM-LATEST-ORDER';


  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private _formBuilder: FormBuilder
    , public shoppingBasketService: ShoppingBasketService
    , public orderService: OrderService
    , private router: Router
    , private confirmYesNoService: ConfirmYesNoService
    , private snackBarService: SnackBarService
  ) {
    this.initValidation();
  }

  public ngAfterViewInit() {
    this.orderService.getOrder()
      .subscribe(order => {
        Promise.resolve(null).then(() => {//delay with a Promise
          this.setFormGroupValues(order);
          if (!order.doNotStep) {
            this.isAutoStepping = true;
            this.handleSteps(order);
            this.isAutoStepping = false;
          } else {
            this.snackBarService.showInfo(CheckoutComponent.CODE_TRANSLATION_ORDER_DETAIL_TAKEN_OVER_FROM_LATEST);
          }
        });
      });
  }


  public canDeactivate(): Observable<boolean> {
    if (this.deliveryAddress.dirty || this.contactData.dirty || this.deliveryType.dirty || this.paymentType.dirty) {
      return this.confirmYesNoService.confirm(CanComponentDeactivateGuard.CODE_TRANSLATION_DISCARD_CHANGES)
        .pipe(
          map((value) => (value === 'yes' ? true : false))
        );
    }
    else {
      return of(true);
    }
  }

  private initValidation() {
    this.deliveryAddress = this._formBuilder.group({
      givenname: ['', Validators.required],
      surname: ['', Validators.required],
      streetHousenumber: ['', Validators.required],
      postCode: ['', [Validators.required,
        Validators.maxLength(10),
        Validators.minLength(4)]
      ],
      city: ['', Validators.required]

    });
    this.contactData = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        Validators.maxLength(100),
        Validators.minLength(5)]
      ],
      phone: ['', [Validators.required, Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$'),
        Validators.maxLength(30),
        Validators.minLength(10)]
      ]
    });

    this.deliveryType = this._formBuilder.group({
      delivery: [null, Validators.required]
    });
    this.paymentType = this._formBuilder.group({
      payment: [null, Validators.required]
    });
  }

  private setFormGroupValues(order: Order) {
    this.deliveryAddress.setValue(order.deliveryAddress);
    this.contactData.setValue(order.contactData);
    this.deliveryType.setValue(order.deliveryType);
    this.paymentType.setValue(order.paymentType);
  }

  private handleSteps(order: Order) {
    let countSteps = 0;
    countSteps = countSteps + (order.deliveryAddress ? 1 : 0);
    countSteps = countSteps + (order.contactData ? 1 : 0);
    countSteps = countSteps + (order.deliveryType ? 1 : 0);
    countSteps = countSteps + (order.paymentType ? 1 : 0);
    for (let i = 0; i < countSteps; i++) {
      this.stepper.next();
      if (i === 3) {
        document.querySelector('#order-button').scrollIntoView(false);
      }
    }
  }

  public onSelectionChange(event) {
    if (!this.isAutoStepping) {
      if (this.deliveryAddress.dirty) {
        this.deliveryAddress.markAsPristine();
        this.orderService.updateDeliveryAddress(this.deliveryAddress.getRawValue()).subscribe(order => this.setFormGroupValues(order));
      }
      else if (this.contactData.dirty) {
        this.contactData.markAsPristine();
        this.orderService.updateContactData(this.contactData.getRawValue()).subscribe(order => this.setFormGroupValues(order));
      }
      else if (this.deliveryType.dirty) {
        this.deliveryType.markAsPristine();
        this.orderService.updateDeliveryType(this.deliveryType.getRawValue()).subscribe(order => this.setFormGroupValues(order));
      }
      else if (this.paymentType.dirty) {
        this.paymentType.markAsPristine();
        this.orderService.updatePaymentType(this.paymentType.getRawValue()).subscribe(order => this.setFormGroupValues(order));
      }
    }
  }

  public approveOrder() {
    this.orderService.approve()
      .subscribe(order => {
          this.snackBarService.showInfo(OrderService.CODE_TRANSLATION_ORDER_CREATED);
          this.router.navigate(['/order-detail'], {queryParams: {id: order._id}}).then();
        }
      );
  }


}
