import {HostListener, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {EventManager} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  private doc: HTMLElement  = document.documentElement;
  private resizeSubject: Subject<Window>;


  constructor(private eventManager: EventManager) {
    this.resizeSubject = new Subject();
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
  }

  public windowTop (): number {
    return (window.pageYOffset || this.doc.scrollTop)  - ( this.doc.clientTop || 0);
  }

  public onResize$(): Observable<Window> {
    return this.resizeSubject.asObservable();
  }

  public onResize(event: UIEvent): void {
    this.resizeSubject.next(<Window>event.target);
  }
}
