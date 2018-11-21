import { browser, by, element } from 'protractor';
import {SnackBarService} from '../../src/app/services/commons/snack-bar/snack-bar.service';

export class  ShoppingBasket {

  public static async navigateTo() {
    return await browser.get('/shopping-basket');
  }


}
