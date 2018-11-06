import { Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent  {
  constructor() { }

  public hamburger() {
    if (window.innerWidth <= 562 ) {
    document.getElementsByClassName('bg-main-nav')[0].classList.toggle('expand');
    document.getElementsByClassName('main-nav')[0].classList.toggle('xs-nav');
    document.getElementsByClassName('hamburger')[0].classList.toggle('change');
      }

    }

}
