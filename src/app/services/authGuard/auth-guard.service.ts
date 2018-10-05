import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../user/user.service';
import {SnackBarService} from '../commons/snack-bar/snack-bar.service';
import {OrderService} from "../order/order.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService  implements CanActivate {

   constructor(
    private userService: UserService
    , private snackBarService: SnackBarService
    , private router: Router
  ) { }



  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    const isAdmin = this.userService.getUser();
    if (isAdmin != null ) {
      if(isAdmin.type === 'admin') {
        return true;
      }
    }  else {
      this.snackBarService.showInfo(OrderService.CODE_TRANSLATION_SIGN_IN_FIRST);
      this.router.navigate(['my-account']).then();
    }
  }

  }

