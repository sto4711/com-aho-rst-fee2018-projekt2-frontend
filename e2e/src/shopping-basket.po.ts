import { browser, by, element } from 'protractor';
import {ShoppingBasketService} from '../../src/app/services/shopping-basket/shopping-basket.service';
import {Login} from '../../src/app/services/user/login';


export class  ShoppingBasketPo {
  public static shoppingBasketService: ShoppingBasketService;
  public static loginOk: Login = new Login('alain@aholzhauser.ch', 'aho');
  public static customerData:  { street: string; plz: string; city: string; phone: string }[] = [
    {street: 'Wiesenstrasse 2', plz: '8020', city: 'Zürich', phone: '+41 78 546 52 32' },
  ];


  public static async navigateToArticle() {
    return await browser.get('/article-detail?article=Superbike-E-Bike-Modell-1');
  }

  public static async navigateToShoppingBasket() {
    element.all(by.className('fa-shopping-cart')).get(0).click();
    await browser.waitForAngular();

  }

  public static async navigateToLogin() {
    element(by.css('[aria-label="checkout"]')).click();
    await browser.waitForAngular();

  }

  public static async addArticle() {
    element(by.css('[aria-label="In den Warenkorb"]')).click();
  }

  public static async getShoppingBasketLength() {
    return element(by.id('mat-badge-content-0')).getText();
  }

  public static async loginUser(login: Login) {
    element(by.css('[name="loginEmail"]')).sendKeys(login.email);
    element(by.css('[name="loginPassword"]')).sendKeys(login.pwd);
    element(by.css('[aria-label="anmelden"]')).click();
    await browser.waitForAngular();
  }
  public static async writeCustomerData(customerData: object) {
    element(by.css('[aria-label="street"]')).clear();
    element(by.css('[aria-label="street"]')).sendKeys(customerData[0].street);

    element(by.css('[aria-label="post code"]')).clear();
    element(by.css('[aria-label="post code"]')).sendKeys(customerData[0].plz);

    element(by.css('[aria-label="city"]')).clear();
    element(by.css('[aria-label="city"]')).sendKeys(customerData[0].city);

    element.all(by.className('matStepperNext')).get(0).click();
    browser.sleep(1000);

    element(by.css('[aria-label="phone"]')).clear();
    element(by.css('[aria-label="phone"]')).sendKeys(customerData[0].phone);
    element.all(by.className('matStepperNext')).get(1).click();
    browser.sleep(1000);

    element(by.css('[aria-label="PostPac Priority"]')).click();
    element.all(by.className('matStepperNext')).get(2).click();
    browser.sleep(1000);

    element(by.css('[aria-label="Paypal"]')).click();
    element.all(by.className('matStepperNext')).get(3).click();
    browser.sleep(1000);

    element(by.css('[aria-label="Jetzt bestellen"]')).click();
    await browser.waitForAngular();
  }
  public static async orderDetail() {
    return element(by.css('[aria-label="confirm title"]')).getText();
  }
}
