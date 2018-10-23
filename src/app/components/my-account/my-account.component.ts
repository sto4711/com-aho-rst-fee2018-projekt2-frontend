import {Router} from '@angular/router';
import {map} from "rxjs/operators";
import {Component} from '@angular/core';
import {SnackBarService} from "../../services/commons/snack-bar/snack-bar.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {ConfirmYesNoService} from "../../services/commons/dialog/confirm-yes-no.service";
import {UserService} from "../../services/user/user.service";
import {CanComponentDeactivate} from "../../services/commons/can-component-deactivate-guard/can-component-deactivate";
import {CanComponentDeactivateGuard} from "../../services/commons/can-component-deactivate-guard/can-component-deactivate-guard";
import {OrderService} from "../../services/order/order.service";
import {NavigationCancelService} from "../../services/navigation-cancel/navigation-cancel.service";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements CanComponentDeactivate {
  public account: FormGroup;
  public accountNew: FormGroup;
  private static CODE_TRANSLATION_LOGIN_SUCCESSFUL = 'LOGIN-SUCCESSFUL';
  private static CODE_TRANSLATION_LOGIN_SUCCESSFUL_USER_HAS_CHANGED: string = 'LOGIN-SUCCESSFUL-USER-HAS-CHANGED';
  private static CODE_TRANSLATION_WRONG_EMAIL_OR_PASSWORD = 'WRONG-EMAIL-OR-PASSWORD';
  private static CODE_TRANSLATION_ACCOUNT_CREATED = 'ACCOUNT-CREATED';
  private static CODE_TRANSLATION_EMAIL_ALREADY_TAKEN = 'EMAIL-ALREADY-TAKEN';

  constructor(
    private _formBuilder: FormBuilder
    , private userService: UserService
    , private orderService: OrderService
    , private router: Router
    , private snackBarService: SnackBarService
    , private confirmYesNoService: ConfirmYesNoService
    , private navigationCancelService: NavigationCancelService

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
    const accountNok: boolean = (this.account.touched && this.account.dirty ? true: false);
    const accountNewNok: boolean = (this.accountNew.touched && this.accountNew.dirty ? true: false);

    if (accountNok || accountNewNok) {
      return this.confirmYesNoService.confirm(CanComponentDeactivateGuard.CODE_TRANSLATION_DISCARD_CHANGES)
        .pipe(
          map((value) => (value === 'yes' ? true : false))
        );
    } else {
      return of(true);
    }
  }

  public async onLogin() {
    if (this.account.valid) {
      try {
        this.account.markAsPristine();
        await this.userService.signIn(this.account.getRawValue()).toPromise();
        if (this.userService.differentUserHasLoggedIn) {
          await this.orderService.resetOrder();
          this.snackBarService.showInfo(MyAccountComponent.CODE_TRANSLATION_LOGIN_SUCCESSFUL_USER_HAS_CHANGED);
          this.router.navigate(['home']).then();
        } else {
          this.snackBarService.showInfo(MyAccountComponent.CODE_TRANSLATION_LOGIN_SUCCESSFUL);
          this.router.navigate([this.navigationCancelService.getCanceledRoute()]).then();
        }
      }catch (error) {
        if (error.status === 404) {
          this.snackBarService.showError(MyAccountComponent.CODE_TRANSLATION_WRONG_EMAIL_OR_PASSWORD);
        }
      }
    }
  }

  public async onCreate() {
    if (this.accountNew.valid) {
      try {
        this.accountNew.markAsPristine();
        await this.userService.create(this.accountNew.getRawValue()).toPromise();
        this.orderService.clear();
        this.snackBarService.showInfo(MyAccountComponent.CODE_TRANSLATION_ACCOUNT_CREATED);
        this.router.navigate(['home']).then();
      }catch (error) {
        if (error.status === 400) {
          this.snackBarService.showError(MyAccountComponent.CODE_TRANSLATION_EMAIL_ALREADY_TAKEN);
        }
      }
    }
  }


}
