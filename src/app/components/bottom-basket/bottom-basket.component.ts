import {Component, OnInit} from '@angular/core';
import {ShoppingBasketService} from "../../services/shopping-basket/shopping-basket.service";
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bottom-basket',
  templateUrl: './bottom-basket.component.html',
  styleUrls: ['./bottom-basket.component.scss']
})
export class BottomBasketComponent implements OnInit {

  public showBasket: boolean = true;
  constructor(
    public shoppingBasketService: ShoppingBasketService,
     private router: Router

  ) { }
  public ngOnInit(): void {

    this.router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationEnd) {
         if(window.location.pathname == '/shopping-basket') {
          this.showBasket = false;
          console.log(this.showBasket);
        }
      }

    });

  }
 
}
