import { browser, by, element } from 'protractor';
import {Login} from '../../src/app/services/user/login';
import {User} from '../../src/app/services/user/user';

export class  MyAccount {

  public static async navigateTo() {
    return await browser.get('/my-account');
  }

  public static async login(login: Login) {
    element(by.css('[name="loginEmail"]')).sendKeys(login.email);
    element(by.css('[name="loginPassword"]')).sendKeys(login.pwd);
    element(by.css('[aria-label="anmelden"]')).click();
    await browser.waitForAngular();
  }

  public static async createUser(user: User)  {
    element(by.css('[name="accountNewName"]')).clear();
    element(by.css('[name="accountNewName"]')).sendKeys(user.name);
    element(by.css('[name="accountNewFirstname"]')).clear();
    element(by.css('[name="accountNewFirstname"]')).sendKeys(user.firstname);
    element(by.css('[name="accountNewEmail"]')).clear();
    element(by.css('[name="accountNewEmail"]')).sendKeys(user.email);
    element(by.css('[name="accountNewPassword"]')).clear();
    element(by.css('[name="accountNewPassword"]')).sendKeys(user.pwd);
    element(by.css('[aria-label="Konto erstellen"]')).click();
    await browser.waitForAngular();
  }

}
