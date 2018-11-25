import {browser, by, element} from 'protractor';
import {ShoppingBasketPo} from './shopping-basket.po';

describe('shopping basket testing', () => {

  beforeEach(async () => {
    await ShoppingBasketPo.navigateToArticle();
  });

  it('navigate to article', async () => {
     await expect(browser.getCurrentUrl()).toEqual('http://localhost:4300/article-detail?article=Superbike-E-Bike-Modell-1');
     await ShoppingBasketPo.addArticle();

  });

  it('check if article is in shopping basket', async () => {
    ShoppingBasketPo.getShoppingBasketLength().then(function (amount) {
      expect(amount).toBeGreaterThan(0);    });
   });

  it('navigate to shopping basket', async () => {
    await ShoppingBasketPo.navigateToShoppingBasket();
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4300/shopping-basket');

  });

});
