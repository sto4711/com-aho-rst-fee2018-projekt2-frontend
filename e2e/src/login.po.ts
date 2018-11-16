import { browser, by, element } from 'protractor';
import {SnackBarService} from '../../src/app/services/commons/snack-bar/snack-bar.service';

export class  MyAccount {

  public loginData = {
    username: 'alain@aholzhauser.ch',
    password: 'aho'
  };

  navigateTo() {
    return browser.get('/my-account');
  }

  wrongLogin(loginData: any) {
    element(by.css('[name="loginEmail"]')).sendKeys(loginData.username);
    element(by.css('[name="loginPassword"]')).sendKeys(loginData.password);
    element(by.css('[aria-label="anmelden"]')).click();
  }

  login() {
    element(by.css('[name="loginEmail"]')).sendKeys(this.loginData.username);
    element(by.css('[name="loginPassword"]')).sendKeys(this.loginData.password);
    element(by.css('[aria-label="anmelden"]')).click();
  }

}
