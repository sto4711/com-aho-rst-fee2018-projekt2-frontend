import {Injectable} from '@angular/core';
import {NavigationCancel, Router} from '@angular/router';
import {Logger} from '../logger/logger';

@Injectable({
  providedIn: 'root'
})
export class NavigationCancelService {
  private canceledRoute: string;

  constructor(private router: Router) {
  }

  public init()  {
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationCancel) {
          this.canceledRoute = event.url;
          Logger.consoleLog(this.constructor.name, 'constructor', 'NavigationCancel event; route stored ' + this.canceledRoute);
        }
      });
  }

  public getCanceledRoute() {
    if (!this.canceledRoute)  {
      Logger.consoleLog(this.constructor.name, 'getCanceledRoute', 'canceledRoute not defined; set to /home');
      return '/home';
    }
    return this.canceledRoute;
  }


}
