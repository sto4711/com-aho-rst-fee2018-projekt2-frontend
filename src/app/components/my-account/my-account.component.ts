import {Router} from '@angular/router';

import {Component, OnInit} from '@angular/core';
import {LoginService} from 'src/app/services/login/login.service';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {Login} from "../../services/login/login";
import {SnackBarService} from "../../services/commons/snack-bar/snack-bar.service";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  public invalidLogin: boolean;
  public login: Login = new Login();
  private loginCreate: Login = new Login();
  private static CODE_TRANSLATION_AN_ERROR_HAS_OCCURRED = 'AN-ERROR-HAS-OCCURRED';
  private static CODE_TRANSLATION_LOGIN_SUCCESSFUL = 'LOGIN-SUCCESSFUL';
  private static CODE_TRANSLATION_ACCOUNT_CREATED = 'ACCOUNT-CREATED';

  constructor(
    private loginService: LoginService
    , private clientContextService: ClientContextService
    , private router: Router
    , private snackBarService: SnackBarService
  ) {
  }

  public onLogin() {
    this.loginService.signin(this.login)
      .subscribe(token => {
          this.clientContextService.setToken(token);
          this.login = new Login();
          this.snackBarService.showInfo(MyAccountComponent.CODE_TRANSLATION_LOGIN_SUCCESSFUL);
          this.router.navigate(['checkout']).then();
        },
        error => {
          this.invalidLogin = true;
        }
      );
  }

  public onLogout() {
    this.loginService.signout(this.clientContextService.getToken())
      .subscribe(token => {
          //
        },
      );
  }

  public onCreate() {
    this.loginService.create(this.loginCreate)
      .subscribe(token => {
          //
        },
        error => {
          this.snackBarService.showError(MyAccountComponent.CODE_TRANSLATION_AN_ERROR_HAS_OCCURRED);
        },
        () => {
          this.loginCreate = new Login();
          this.snackBarService.showInfo(MyAccountComponent.CODE_TRANSLATION_ACCOUNT_CREATED);
        });
  }


}
