import {Router} from '@angular/router';

import {Component, OnInit} from '@angular/core';
import {LoginService} from 'src/app/services/login/login.service';
import {InfoService} from 'src/app/services/info/info.service';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {Login} from "../../services/login/login";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  invalidLogin: boolean;
  login: Login = new Login();

  constructor(
    private infoService: InfoService
    , private loginService: LoginService
    , private clientContextService: ClientContextService
    , private router: Router
  ) {
  }

  ngOnInit() {}

  onClick_Login() {
    this.loginService.signin(this.login)
      .subscribe(token => {
          this.clientContextService.setToken(token);
          this.infoService.showInfo('login ok');
        },
        error => {
          this.invalidLogin = true;
          this.infoService.showError(error.message);
        },
        () => {
          this.login = new Login();
          this.router.navigate(['home']).then();
        }
      );
  }

  onClick_Logout() {
    this.loginService.signout(this.clientContextService.getToken())
      .subscribe(token => {
          this.infoService.showInfo('logout token ' + token.valueOf() + ' ok');
        },
        error => {
          this.infoService.showError(error.message);
        },
        () => {
          // 'onCompleted'
        });
  }

}
