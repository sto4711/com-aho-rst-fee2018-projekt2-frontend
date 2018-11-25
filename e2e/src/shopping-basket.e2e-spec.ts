import {browser} from 'protractor';
import {ShoppingBasketPo} from './shopping-basket.po';

describe('shopping basket testing', () => {

  beforeEach(async () => {
  });

  it('navigate to article', async () => {
    await ShoppingBasketPo.navigateToArticle();
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4300/article-detail?article=Superbike-E-Bike-Modell-1');

  });
  it('add article', async () => {
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

  it('navigate to login', async () => {
    await ShoppingBasketPo.navigateToLogin();
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4300/my-account');

  });

  it('login user', async () => {
    await ShoppingBasketPo.loginUser(ShoppingBasketPo.loginOk);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4300/checkout');
  });

  it('write customer data', async () => {
    await ShoppingBasketPo.writeCustomerData(ShoppingBasketPo.customerData);
   });

  it('order-detail - order completed', async () => {
    ShoppingBasketPo.orderDetail().then(function (title) {
      expect(title).toEqual('Vielen Dank für Ihre Bestellung!');  });
  });


});
