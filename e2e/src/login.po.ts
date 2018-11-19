import { browser, by, element } from 'protractor';
import {Login} from '../../src/app/services/user/login';
import {User} from '../../src/app/services/user/user';

export class  MyAccount {

  public static navigateTo() {
    return browser.get('/my-account');
  }

  public static login(login: Login) {
    element(by.css('[name="loginEmail"]')).sendKeys(login.email);
    element(by.css('[name="loginPassword"]')).sendKeys(login.pwd);
    element(by.css('[aria-label="anmelden"]')).click();
  }

  public static createUser(user: User) {
    element(by.css('[name="accountNewName"]')).sendKeys(user.name);
    element(by.css('[name="accountNewFirstname"]')).sendKeys(user.firstname);
    element(by.css('[name="accountNewEmail"]')).sendKeys(user.email);
    element(by.css('[name="accountNewPassword"]')).sendKeys(user.pwd);
    element(by.css('[aria-label="Konto erstellen"]')).click();
  }

}
