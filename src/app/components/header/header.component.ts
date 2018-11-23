import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {WindowSizeService} from '../../services/window-size/window-size.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None


})

 export class HeaderComponent implements OnInit {

  public currentWindowWidth: number;
  public windowTopPosition: number;


  @HostListener('window:scroll', ['$event']) public onScrollEvent(): void {
    this.windowTopPosition = this.windowSizeService.windowTop();
   }

  constructor(
    private windowSizeService: WindowSizeService
  ) { }

  public ngOnInit(): void {
    this.windowSizeService.onResize$().subscribe( result => {
      this.currentWindowWidth = result.innerWidth;
    });
    this.windowTopPosition = this.windowSizeService.windowTop();
  }



  // noinspection JSMethodCanBeStatic
  public hamburger(): void {
    if (window.innerWidth <= 562 ) {
    document.getElementsByClassName('bg-main-nav')[0].classList.toggle('expand');
    document.getElementsByClassName('main-nav')[0].classList.toggle('xs-nav');
    document.getElementsByClassName('hamburger')[0].classList.toggle('change');
      }

    }



}
