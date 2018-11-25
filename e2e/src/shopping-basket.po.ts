import { browser, by, element } from 'protractor';
import {ShoppingBasketService} from '../../src/app/services/shopping-basket/shopping-basket.service';


export class  ShoppingBasketPo {
  public static shoppingBasketService: ShoppingBasketService;

  public static async navigateToArticle() {
    return await browser.get('/article-detail?article=Superbike-E-Bike-Modell-1');
  }

  public static async navigateToShoppingBasket() {
    element.all(by.className('fa-shopping-cart')).get(0).click();
    await browser.waitForAngular();

  }

  public static async addArticle() {
    element(by.css('[aria-label="In den Warenkorb"]')).click();
  }

  public static async getShoppingBasketLength() {
    const amount = element(by.id('mat-badge-content-0')).getText();
    return amount;
  }
}
