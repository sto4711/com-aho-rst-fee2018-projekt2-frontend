import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  private doc: HTMLElement  = document.documentElement;


  public windowWidth (): number {
    return window.innerWidth;
  }

  public windowTop (): number {
    return (window.pageYOffset || this.doc.scrollTop)  - ( this.doc.clientTop || 0);
  }

}
