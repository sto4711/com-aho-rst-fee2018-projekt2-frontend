import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {SnackBarService} from '../commons/snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService  implements CanActivate {
  private static CODE_TRANSLATION_NO_TOKEN: string = 'SIGN-IN-FIRST-PLEASE';
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
      this.router.navigate(['my-account']).then();
    }
  }

  }

