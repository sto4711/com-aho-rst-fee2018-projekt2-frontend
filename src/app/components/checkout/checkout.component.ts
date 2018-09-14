import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ClientContextService} from '../../services/client-context/client-context.service';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order/order.service';
import {TranslateService} from "@ngx-translate/core";


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
    , private orderService: OrderService
    , public dialog: MatDialog
    , private snackBar: MatSnackBar
    , private clientContextService: ClientContextService
    , private router: Router
    , private translate: TranslateService
  ) {}

  public ngOnInit() {
    this.deliveryAddress = this._formBuilder.group({
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      strasse: ['', Validators.required],
      plz: ['', [Validators.required, Validators.pattern('^[0-9]+$'),
        Validators.maxLength(4),
        Validators.minLength(4)]
      ],
      stadt: ['', Validators.required]

    });
    this.contactData = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        Validators.maxLength(100),
        Validators.minLength(10)]
      ],
      telefonnummer: ['', [Validators.required, Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$'),
        Validators.maxLength(30),
        Validators.minLength(10)]
      ]
    });

    this.deliveryType = this._formBuilder.group({
      priority: [false, Validators.required],
      economy: [false, Validators.required]
    });
    this.paymentType = this._formBuilder.group({
      paypal: [false, Validators.required],
      mastercard: [false, Validators.required],
      visa: [false, Validators.required]
    });
  }

  private routeToLogin() {
    this.translate.get(CheckoutComponent.CODE_TRANSLATION_ORDER_SIGN_IN_FIRST).subscribe(translated => {
        this.snackBar.open(translated, null, {duration: 1500});
        this.clientContextService.nextRoute = 'checkout';
        this.router.navigate(['my-account']).then();
      }
    );
  }

  public createOrder() {


    let obj = this.deliveryType.getRawValue();
    debugger;




    // if (this.clientContextService.getToken().value === '') {
    //   this.routeToLogin();
    // } else {
    //   this.orderService.create(this.shoppingBasketService.shoppingBasket._id, this.clientContextService.getToken())
    //     .subscribe(order => {
    //         this.translate.get(CheckoutComponent.CODE_TRANSLATION_ORDER_CREATED).subscribe(translated => {
    //             this.snackBar.open(translated, null, {duration: 1500});
    //             this.router.navigate(['/order-detail'], {queryParams: {id: order._id}}).then();
    //           }
    //         );
    //       },
    //       error => {
    //         if (error.status === 401) {
    //           this.routeToLogin();
    //         }
    //       }
    //     );
    // }
  }

}
