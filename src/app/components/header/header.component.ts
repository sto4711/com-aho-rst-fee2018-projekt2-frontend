import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {WindowSizeService} from '../../services/window-size/window-size.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None


})

 export class HeaderComponent implements OnInit {

  public currentWindowWidth: number;
  public windowTopPosition: any;


  constructor(
    private windowSizeService: WindowSizeService
  ) { }

  public ngOnInit(): void {
    this.currentWindowWidth = this.windowSizeService.initWindowWidth();
    this.windowSizeService.onResize$().subscribe( result => {
       this.currentWindowWidth = result.innerWidth;
     });

    this.windowSizeService.onScroll$().subscribe( result => {
       this.windowTopPosition = result;
    });

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
