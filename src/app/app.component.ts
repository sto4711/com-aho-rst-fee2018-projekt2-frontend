import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Webshop';

    hamburger($event) {
      document.getElementsByClassName('bg-main-nav')[0].classList.toggle('expand');
      document.getElementsByClassName('main-nav')[0].classList.toggle('xs-nav');

    }
  }

