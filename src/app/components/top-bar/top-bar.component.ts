import {Component, OnInit} from '@angular/core';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  constructor(
    public shoppingBasketService: ShoppingBasketService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }
  goToHome(){
    this.router.navigate(['/home']);

  }
}
