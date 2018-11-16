import {ShoppingBasket} from './shopping-basket.po';
import {AppPage} from './app.po';
import {browser, element, by} from 'protractor';

describe('shopping basket testing', () => {
  let page: ShoppingBasket;
  let publicPage: AppPage;

  beforeEach(() => {
    page = new ShoppingBasket();
    publicPage = new AppPage();

  });

  // it('when login is fails - stay on page', () => {
  //   page.navigateTo();
  //   page.wrongLogin(wrongLoginData);
  //   const url = browser.getCurrentUrl();
  //   expect(url).toEqual('http://localhost:4200/my-account');
  // });
  //
  //
  // it('when login is successful — redicret to home page', () => {
  //   page.navigateTo();
  //   page.login();
  //   const url = browser.getCurrentUrl();
  //   expect(url).toEqual('http://localhost:4200/home');
  // });
});
