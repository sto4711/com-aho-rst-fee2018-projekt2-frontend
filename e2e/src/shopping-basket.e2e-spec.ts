import {browser} from 'protractor';
import {ShoppingBasketPo} from './shopping-basket.po';
import {Login} from '../../src/app/services/user/login';
import {TestData} from './test-data';
import {User} from '../../src/app/services/user/user';
import {MyAccountPo} from './my-account.po';

describe('shopping basket testing', () => {

  beforeEach(async () => {
  });

  it('navigate to article', async () => {
    await ShoppingBasketPo.navigateToArticle();
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/article-detail?article=Superbike-E-Bike-Modell-1');

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
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/shopping-basket');
  });

  it('navigate to login', async () => {
    await ShoppingBasketPo.navigateToLogin();
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/my-account');

  });

  it('login user', async () => {
    await ShoppingBasketPo.loginUser(TestData.loginOk);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/checkout');
  });

  it('write customer data', async () => {
    await ShoppingBasketPo.writeCustomerData(TestData.customerData);
   });

  it('order-detail - order completed', async () => {
    ShoppingBasketPo.orderDetail().then(function (title) {
      expect(title).toEqual('Vielen Dank für Ihre Bestellung!');  });
  });

  it('logout user', async () => {
    await ShoppingBasketPo.logoutUser();
  });

  function createOrder(userLogins: { email: string; pwd: string }) {
    it('it should login user', async () => {
      const login: Login = ShoppingBasketPo.createShoppingBasket(userLogins);
      await ShoppingBasketPo.navigateToArticle();
      await ShoppingBasketPo.addArticle();
      await ShoppingBasketPo.navigateToShoppingBasket();
      await ShoppingBasketPo.navigateToLogin();
      await ShoppingBasketPo.loginUser(login);
      await ShoppingBasketPo.writeCustomerData(TestData.customerData);
      await ShoppingBasketPo.orderDetail();
      await ShoppingBasketPo.logoutUser();
    });
  }

  TestData.users.forEach(async user => {
    createOrder(MyAccountPo.userToLogin(MyAccountPo.createUserObj(user)));
  });

});
