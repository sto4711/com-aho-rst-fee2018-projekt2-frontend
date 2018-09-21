import {Router} from '@angular/router';

import {Component, OnInit} from '@angular/core';
import {LoginService} from 'src/app/services/login/login.service';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {Login} from "../../services/login/login";
import {DialogService} from "../../services/commons/dialog/dialog.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  invalidLogin: boolean;
  login: Login = new Login();
  loginCreate: Login = new Login();

  constructor(
    private loginService: LoginService
    , private clientContextService: ClientContextService
    , private router: Router
    , private dialogService: DialogService
    , private snackBar: MatSnackBar
  ) {
  }

  onLogin() {
    this.loginService.signin(this.login)
      .subscribe(token => {
          this.clientContextService.setToken(token);
        },
        error => {
          this.invalidLogin = true;
          this.dialogService.confirm('Fehler onLogin', 'Es ist ein Fehler aufgetreten ' + error);
        },
        () => {
          this.login = new Login();
          this.snackBar.open('login ok', null, {duration: 1500, panelClass: 'snackbar'});
          this.router.navigate(['checkout']).then();
          //this.location.back();
        }
      );
  }

  onLogout() {
    this.loginService.signout(this.clientContextService.getToken())
      .subscribe(token => {
          //
        },
        error => {
          this.dialogService.confirm('Fehler onLogout', 'Es ist ein Fehler aufgetreten ' + error);
        });
  }

  onCreate() {
    this.loginService.create(this.loginCreate)
      .subscribe(token => {
          //
        },
        error => {
          this.dialogService.confirm('Fehler logout', 'Es ist ein Fehler aufgetreten ' + error);
        },
        () => {
          this.loginCreate = new Login();
          this.snackBar.open('user created ok', null, {duration: 1500, panelClass: 'snackbar'});
        });
  }


}
