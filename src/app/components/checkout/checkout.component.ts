import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

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
  delievery: 'economy';

  constructor(private _formBuilder: FormBuilder) { }

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

  placeOrder() {
    console.log(this.delieveryType);
  }
}
