import { browser, by, element } from 'protractor';
import {SnackBarService} from '../../src/app/services/commons/snack-bar/snack-bar.service';

export class  ShoppingBasket {

  navigateTo() {
    return browser.get('/shopping-basket');
  }


}
