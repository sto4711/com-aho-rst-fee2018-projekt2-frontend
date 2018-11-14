import { MyAccount } from './login.po';
import { AppPage } from './app.po';
import {browser, element, by} from 'protractor';

describe('myAccount login', () => {
  let page: MyAccount;
  let publicPage: AppPage;
  let currentURL: string;

  const wrongLoginData = {
    username: 'wrong@email.com',
    password: '1234223322233test'
  };

  beforeEach(() => {
    page = new MyAccount();
    publicPage = new AppPage();

  });

  it('when login is fails - stay on page', () => {
    page.navigateTo();
     page.wrongLogin(wrongLoginData);

     let url = browser.getCurrentUrl();

      expect(url).toEqual('http://localhost:4200/my-account');
    });



  it('when login is successful — redicret to home page', () => {
    page.navigateTo();
     page.login();
    let url = browser.getCurrentUrl();

    expect(url).toEqual('http://localhost:4200/home');  });

});
