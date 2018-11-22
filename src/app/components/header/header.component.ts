import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],


})

 export class HeaderComponent implements OnInit {

  public currentWindowWidth: number;
  public windowTopPosition: number;
  public doc: HTMLElement  = document.documentElement;

  @HostListener('window:resize') public onResize($event): void {
    this.currentWindowWidth = window.innerWidth;

  }

  @HostListener('window:scroll', ['$event']) public onScrollEvent($event): void{
    this.windowTopPosition = (window.pageYOffset || this.doc.scrollTop)  - ( this.doc.clientTop || 0);
    console.log(this.windowTopPosition);

  }

  constructor() { }

  public ngOnInit(): void {

    this.windowTopPosition = (window.pageYOffset || this.doc.scrollTop)  - ( this.doc.clientTop || 0);
    this.currentWindowWidth = window.innerWidth;
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
