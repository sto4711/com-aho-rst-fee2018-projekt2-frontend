import {Component, HostListener, OnInit} from '@angular/core';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {Router} from '@angular/router';
import {WindowSizeService} from '../../services/window-size/window-size.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  public currentWindowWidth: number;
  public windowTopPosition: number;



  @HostListener('window:scroll', ['$event']) public onScrollEvent(): void {
    this.windowTopPosition = this.windowSizeService.windowTop();
  }
  constructor(
    public shoppingBasketService: ShoppingBasketService,
    private windowSizeService: WindowSizeService,
    private router: Router
  ) {}

  public ngOnInit(): void {
     this.windowSizeService.onResize$().subscribe( result => {
      this.currentWindowWidth = result.innerWidth;
    });
    this.windowTopPosition = this.windowSizeService.windowTop();
  }

  public goToHome(): void {
    this.router.navigate(['/home']).then();
  }
}
