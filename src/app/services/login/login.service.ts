import { Injectable } from '@angular/core';
import { Login } from 'src/app/services/login/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }


  signin(login: Login) {
    console.log(login.user + " " + login.pwd);
  }

  signout() {
    console.log('logout');
  }


}
