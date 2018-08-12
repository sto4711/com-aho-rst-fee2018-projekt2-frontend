import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/services/login/login';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  login: Login = {
    user: '',
    pwd: ''
  };



  ngOnInit() {
  }

  onClick() {
    this.loginService.signin(this.login);
  }

}
