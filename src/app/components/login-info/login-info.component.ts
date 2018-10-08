import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {SnackBarService} from "../../services/commons/snack-bar/snack-bar.service";

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss']
})
export class LoginInfoComponent  {
  private static CODE_TRANSLATION_LOGOUT_SUCCESSFUL: string = 'LOGOUT-SUCCESSFUL';

  constructor(
    public userService: UserService
    ,private snackBarService: SnackBarService
  ,private router: Router
  ) { }

  public async onLogout() {
    await this.userService.signOut().toPromise();
    this.snackBarService.showInfo(LoginInfoComponent.CODE_TRANSLATION_LOGOUT_SUCCESSFUL);
  }

}
