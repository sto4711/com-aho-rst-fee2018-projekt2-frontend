import {Router} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {Component, Inject, OnInit} from '@angular/core';

import {Login} from 'src/app/services/login/login';
import {LoginService} from 'src/app/services/login/login.service';
import {InfoService} from 'src/app/services/info/info.service';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  login: Login = {
    email: '',
    pwd: ''
  };

  constructor(
    @Inject(DOCUMENT) document
    ,private infoService: InfoService
    , private loginService: LoginService
    , private clientContextService: ClientContextService
    , private router: Router
  ) {
  }


  ngOnInit() {
  }

  signin() {
    this.loginService.signin(this.login)
      .subscribe(token => {
          this.clientContextService.setToken(token);
          this.infoService.showInfo('login ok');
        },
        error => {
          this.infoService.showError(error.message);
        },
        () => {
          this.router.navigate(['admin/product']).then();
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
