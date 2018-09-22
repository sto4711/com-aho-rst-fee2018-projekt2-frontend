import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ClientContextService} from '../../services/client-context/client-context.service';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order/order.service';
import {TranslateService} from '@ngx-translate/core';
import {Order} from '../../services/order/order';
import { MatStepper } from '@angular/material';
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent  {
  public isLinear = true;
  public deliveryAddress: FormGroup;
  public contactData: FormGroup;
  public deliveryType: FormGroup;
  public paymentType: FormGroup;
  public itemChangePossible: boolean = false;
  public isAutoStepping: boolean = false;
  private static CODE_TRANSLATION_SESSION_IS_NO_MORE_VALID_PLEASE_SIGNIN_AGAIN: string = 'SESSION-IS-NO-MORE-VALID-PLEASE-SIGNIN-AGAIN';


  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private _formBuilder: FormBuilder
    , public shoppingBasketService: ShoppingBasketService
    , public orderService: OrderService
    , public dialog: MatDialog
    , private snackBar: MatSnackBar
    , private router: Router
    , private translate: TranslateService
  ) {
    this.initValidation();
  }

  public ngAfterViewInit() {
    this.isAutoStepping = true;
    this.orderService.getOrder()
      .subscribe(order => {
        Promise.resolve(null).then(() => {//delay with a Promise
          this.setFormGroupValues(order);
          this.handleSteps(order);
          this.isAutoStepping = false;
        });
      });
  }

  private initValidation() {
    this.deliveryAddress = this._formBuilder.group({
      givenname: ['', Validators.required],
      surname: ['', Validators.required],
      streetHousenumber: ['', Validators.required],
      postCode: ['', [Validators.required, Validators.pattern('^[0-9]+$'),
        Validators.maxLength(4),
        Validators.minLength(4)]
      ],
      city: ['', Validators.required]

    });
    this.contactData = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        Validators.maxLength(100),
        Validators.minLength(10)]
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
        document.querySelector('#order-review').scrollIntoView(false);
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
          this.translate.get(OrderService.CODE_TRANSLATION_ORDER_CREATED).subscribe(translated => {
              this.snackBar.open(translated, null, {duration: 2500, panelClass: 'snackbar'});
              this.router.navigate(['/order-detail'], {queryParams: {id: order._id}}).then();
            }
          );
        },
        error => {
          if (error.status === 401) {
            this.translate.get(CheckoutComponent.CODE_TRANSLATION_SESSION_IS_NO_MORE_VALID_PLEASE_SIGNIN_AGAIN).subscribe(translated => {
                this.snackBar.open(translated, null, {duration: 2500, panelClass: 'snackbar'});
                this.router.navigate(['my-account']).then();
              }
            );
          }
        }

      );
  }


}
