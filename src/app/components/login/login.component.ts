import {Component, OnInit} from '@angular/core';
import {Login} from 'src/app/services/login/login';
import {Token} from 'src/app/services/login/token';
import {LoginService} from 'src/app/services/login/login.service';
import {InfoService} from 'src/app/services/info/info.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private token: Token = new Token();

  constructor(private loginService: LoginService, private infoService: InfoService) {
  }

  login: Login = {
    user: '',
    pwd: ''
  };

  ngOnInit() {
  }

  onClick_Login() {
    this.loginService.signin(this.login)
      .subscribe(result => {
          this.token = result;
          this.infoService.showInfo("token: " + result.value);
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
    this.loginService.signout(this.token)
      .subscribe(token => {
          this.infoService.showInfo("signout ok");
        },
        error => {
          this.infoService.showError(error.message);
        },
        () => {
          // 'onCompleted' callback route to new page here
        });
  }

}
