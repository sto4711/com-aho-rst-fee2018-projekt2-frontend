import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/services/login/login';
import { Token } from 'src/app/services/login/token';
import { LoginService } from 'src/app/services/login/login.service';
import { InfoService } from 'src/app/services/info/info.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private token: Token = new Token();

  constructor(private loginService: LoginService, private infoService : InfoService) { }

  login: Login = {
    user: '',
    pwd: ''
  };

  ngOnInit() {
  }

  onClick_Login() {
    this.loginService.signin(this.login)
      .subscribe(token => {
        this.token = token;
        this.infoService.showInfo("token: " + token.value);
      });
  }

  onClick_Logout() {
    this.loginService.signout(this.token)
      .subscribe(token => {
        this.infoService.showInfo("signout ok");
      });
  }

}
