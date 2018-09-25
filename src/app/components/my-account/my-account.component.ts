import {Router} from '@angular/router';
import {map} from "rxjs/operators";
import {Component} from '@angular/core';
import {LoginService} from 'src/app/services/login/login.service';
import {ClientContextService} from 'src/app/services/client-context/client-context.service';
import {SnackBarService} from "../../services/commons/snack-bar/snack-bar.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {ConfirmYesNoService} from "../../services/commons/dialog/confirm-yes-no.service";
import {UserService} from "../../services/admin/user/user.service";
import {CanComponentDeactivate} from "../../services/commons/can-component-deactivate-guard/can-component-deactivate";
import {CanComponentDeactivateGuard} from "../../services/commons/can-component-deactivate-guard/can-component-deactivate-guard";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements CanComponentDeactivate {
  public account: FormGroup;
  public accountNew: FormGroup;
  private static CODE_TRANSLATION_LOGIN_SUCCESSFUL = 'LOGIN-SUCCESSFUL';
  private static CODE_TRANSLATION_WRONG_EMAIL_OR_PASSWORD = 'WRONG-EMAIL-OR-PASSWORD';
  private static CODE_TRANSLATION_ACCOUNT_CREATED = 'ACCOUNT-CREATED';
  private static CODE_TRANSLATION_EMAIL_ALREADY_TAKEN = 'EMAIL-ALREADY-TAKEN';
  private static CODE_TRANSLATION_AN_ERROR_HAS_OCCURRED = 'AN-ERROR-HAS-OCCURRED';

  constructor(
    private _formBuilder: FormBuilder
    , private loginService: LoginService
    , private userService: UserService
    , private clientContextService: ClientContextService
    , private router: Router
    , private snackBarService: SnackBarService
    , private confirmYesNoService: ConfirmYesNoService
  ) {
    this.initValidation();
  }

  private initValidation() {
    this.account = this._formBuilder.group({
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        Validators.maxLength(60),
        Validators.minLength(5)]
      ],
      pwd: ['', Validators.minLength(3)],
    });
    this.accountNew = this._formBuilder.group({
      name: ['', Validators.minLength(3)],
      firstname: ['', Validators.minLength(3)],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        Validators.maxLength(60),
        Validators.minLength(5)]
      ],
      pwd: ['', Validators.minLength(3)], //
    });
  }

  public canDeactivate(): Observable<boolean> {
    if ((!this.account.valid && this.account.dirty) || (!this.accountNew.valid && this.accountNew.dirty)) {
      return this.confirmYesNoService.confirm(CanComponentDeactivateGuard.CODE_TRANSLATION_DISCARD_CHANGES)
        .pipe(
          map((value) => (value === 'yes' ? true : false))
        );
    }
    else {
      return of(true);
    }
  }

  public onLogin() {
    if (this.account.valid) {
      this.loginService.signin(this.account.getRawValue())
        .subscribe(token => {
            this.clientContextService.setToken(token);
            this.snackBarService.showInfo(MyAccountComponent.CODE_TRANSLATION_LOGIN_SUCCESSFUL);
            this.router.navigate(['checkout']).then();
          },
          error => {
            if (error.status === 401) {
              this.snackBarService.showError(MyAccountComponent.CODE_TRANSLATION_WRONG_EMAIL_OR_PASSWORD);
            }
          }
        );
    }
  }

  public onCreate() {
    if (this.accountNew.valid) {
      this.userService.create(this.accountNew.getRawValue())
        .subscribe(token => {
            this.snackBarService.showInfo(MyAccountComponent.CODE_TRANSLATION_ACCOUNT_CREATED);
            this.router.navigate(['checkout']).then();
          },
          error => {
            this.snackBarService.showError((error.status === 401 ? MyAccountComponent.CODE_TRANSLATION_EMAIL_ALREADY_TAKEN : MyAccountComponent.CODE_TRANSLATION_AN_ERROR_HAS_OCCURRED));
          });
    }
  }

  public onLogout() {
    this.loginService.signout(this.clientContextService.getToken())
      .subscribe(token => {
          //
        },
      );
  }


}
