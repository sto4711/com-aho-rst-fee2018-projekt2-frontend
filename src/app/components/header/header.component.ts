import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  hamburger($event) {
    document.getElementsByClassName('bg-main-nav')[0].classList.toggle('expand');
    document.getElementsByClassName('main-nav')[0].classList.toggle('xs-nav');

  }
}
