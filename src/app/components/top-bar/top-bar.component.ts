import {Component, OnInit} from '@angular/core';
import {ShoppingBasketService} from "../../services/shopping-basket/shopping-basket.service";


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  constructor(
    public shoppingBasketService: ShoppingBasketService
  ) {
  }

  ngOnInit() {
  }

}
