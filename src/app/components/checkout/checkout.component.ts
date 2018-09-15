import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ClientContextService} from '../../services/client-context/client-context.service';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order/order.service';
import {TranslateService} from "@ngx-translate/core";
import {Order} from "../../services/order/order";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  public isLinear = true;
  public deliveryAddress: FormGroup;
  public contactData: FormGroup;
  public deliveryType: FormGroup;
  public paymentType: FormGroup;
  public itemChangePossible: boolean = false;
  private static CODE_TRANSLATION_ORDER_CREATED: string = 'ORDER-CREATED';
  private static CODE_TRANSLATION_MANDATORY_FIELDS_NOTIFICATION: string = 'FILL-OUT-MANDATORY-FIELDS-PLEASE';
  private static CODE_TRANSLATION_ORDER_SIGN_IN_FIRST: string = 'SIGN-IN-FIRST-PLEASE';

  constructor(
    private _formBuilder: FormBuilder
    , public shoppingBasketService: ShoppingBasketService
    , public orderService: OrderService
    , public dialog: MatDialog
    , private snackBar: MatSnackBar
    , private clientContextService: ClientContextService
    , private router: Router
    , private translate: TranslateService
  ) {
    this.initValidation();
  }

  public ngOnInit() {
    this.orderService.initLazy()
      .subscribe(order => this.setFormGroupValues(order));
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

  public onSelectionChange(event) {
    switch (event.selectedIndex) {
      case 1:
        this.orderService.updateDeliveryAddress(this.deliveryAddress.getRawValue()).subscribe(order => this.setFormGroupValues(order));
        break;
      case 2:
        this.orderService.updateContactData(this.contactData.getRawValue()).subscribe(order => this.setFormGroupValues(order));
        break;
      case 3:
        this.orderService.updateDeliveryType(this.deliveryType.getRawValue()).subscribe(order => this.setFormGroupValues(order));
        break;
      case 4:
        this.orderService.updatePaymentType(this.paymentType.getRawValue()).subscribe(order => this.setFormGroupValues(order));
        break;
    }
  }

  public commitOrder() {
    this.orderService.commit(this.clientContextService.getToken())
      .subscribe(order => {
          this.translate.get(CheckoutComponent.CODE_TRANSLATION_ORDER_CREATED).subscribe(translated => {
              this.snackBar.open(translated, null, {duration: 1500, panelClass: 'snackbar'});
              this.router.navigate(['/order-detail'], {queryParams: {id: order._id}}).then();
            }
          );
        },
        error => {
          if (error.status === 401) {
            this.translate.get(CheckoutComponent.CODE_TRANSLATION_ORDER_SIGN_IN_FIRST).subscribe(translated => {
                this.snackBar.open(translated, null, {duration: 1500, panelClass: 'snackbar'});
                this.clientContextService.nextRoute = 'checkout';
                this.router.navigate(['my-account']).then();
              }
            );
          }
        }
      );
  }


}
