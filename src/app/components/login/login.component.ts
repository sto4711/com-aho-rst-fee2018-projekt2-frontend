import {Component, OnInit} from '@angular/core';
import {Login} from 'src/app/services/login/login';
import {Token} from 'src/app/services/login/token';
import {LoginService} from 'src/app/services/login/login.service';
import {InfoService} from 'src/app/services/info/info.service';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private infoService: InfoService
    , private loginService: LoginService
    , private clientContextService: ClientContextService) {
  }

  login: Login = {
    user: '',
    pwd: ''
  };

  ngOnInit() {
  }

  onClick_Login() {
    this.loginService.signin(this.login)
      .subscribe(token => {
          this.clientContextService.setToken(token);
          this.infoService.showInfo("login ok");
        },
        error => {
          this.infoService.showError(error.message);
        },
        () => {
          // 'onCompleted' callback route to new page here
        }
      );
  }

  onClick_Logout() {
    this.loginService.signout(this.clientContextService.getToken())
      .subscribe(token => {
          this.infoService.showInfo("logout ok");
        },
        error => {
          this.infoService.showError(error.message);
        },
        () => {
          // 'onCompleted' callback route to new page here
        });
  }

}
