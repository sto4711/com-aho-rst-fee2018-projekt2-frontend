import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDeleteService} from '../../services/commons/dialog/confirm-delete.service';
import {ClientContextService} from '../../services/client-context/client-context.service';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order/order.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  isLinear = false;
  deliveryAdress: FormGroup;
  contactData: FormGroup;
  delieveryType: FormGroup;
  paymentType: FormGroup;
  itemChangePossible = false;

  constructor(
    private _formBuilder: FormBuilder
  , public shoppingBasketService: ShoppingBasketService
    , private orderService: OrderService
    , public dialog: MatDialog
    , private snackBar: MatSnackBar
    , private clientContextService: ClientContextService
    , private router: Router
  ) { }

  ngOnInit() {
    this.deliveryAdress = this._formBuilder.group({
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
      email: ['', Validators.required, Validators.email],
      telefonnummer: ['', Validators.required]
    });
    this.delieveryType = this._formBuilder.group({
      priority: ['', Validators.required],
      economy: ['', Validators.required]
    });
    this.paymentType = this._formBuilder.group({
      paypal: ['', Validators.required],
      mastercard: ['', Validators.required],
      visa: ['', Validators.required]

    });

  }

  private routeToLogin() {
    this.snackBar.open('Bitte melden Sie sich zuerst an', null, {duration: 1500});
    this.clientContextService.nextRoute = 'shopping-basket';
    this.router.navigate(['my-account']).then();
  }

  public pay(value) {
    if (this.clientContextService.getToken().value === '') {
      this.routeToLogin();
    } else {
      this.orderService.create(this.shoppingBasketService.shoppingBasket._id, this.clientContextService.getToken())
        .subscribe(order => {
            this.snackBar.open('Auftrag wurde erstellt', null, {duration: 1500});
            this.router.navigate(['/order-detail'], {queryParams: {id: order._id}}).then();
          },
          error => {
            if (error.status === 401) {
              this.routeToLogin();
            }
          }
        );
    }
  }

}
