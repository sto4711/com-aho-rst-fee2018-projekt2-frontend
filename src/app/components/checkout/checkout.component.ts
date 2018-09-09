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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.deliveryAdress = this._formBuilder.group({
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      strasse: ['', Validators.required],
      plz: ['', Validators.required],
      stadt: ['', Validators.required]


    });
    this.contactData = this._formBuilder.group({
      email: ['', Validators.required],
      telefonnummer: ['', Validators.required]
    });
    this.delieveryType = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
