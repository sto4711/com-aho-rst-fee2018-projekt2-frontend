import {Component} from '@angular/core';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent  {
  constructor(
    public shoppingBasketService: ShoppingBasketService,
    private router: Router
  ) {
  }

  public goToHome() {
    this.router.navigate(['/home']).then();
  }
}
