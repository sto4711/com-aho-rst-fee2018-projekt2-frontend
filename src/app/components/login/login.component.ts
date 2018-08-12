import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/services/login/login';
import { LoginService } from 'src/app/services/login/login.service';
import { InfoService } from 'src/app/services/info/info.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private infoService : InfoService) { }

  login: Login = {
    user: '',
    pwd: ''
  };

  ngOnInit() {
  }

  onClick_Login() {
    this.loginService.signin(this.login);
    this.infoService.showInfo('onClick_Login');
  }

  onClick_Logout() {
    this.loginService.signout();
    this.infoService.showInfo('onClick_Logout');
  }

}
