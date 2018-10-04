import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss']
})
export class LoginInfoComponent  {

  constructor(public userService: UserService
  ,private router: Router) { }


  public onSignout()  {
    this.userService.signout()
      .subscribe(user => {
          this.router.navigate(['']).then();
        },
        error => {
        //
        }
      );
  }


}
