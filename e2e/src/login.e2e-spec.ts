import {MyAccount} from './login.po';
import {browser} from 'protractor';
import {Login} from '../../src/app/services/user/login';

describe('myAccount login / create user', () => {
  const loginDataNok: Login = new Login('wrong@email.com', '1234223322233test');
  const loginDataOk: Login = new Login('alain@aholzhauser.ch', 'aho');
  const names = ['Darth', 'Han', 'Luke', 'Leia'];
  const firstnames = ['Vader', 'Solo', 'Organa'];

  beforeEach(async () => {
    await MyAccount.navigateTo();
  });

  it('when login is fails - stay on page', async () => {
    MyAccount.login(loginDataNok);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/my-account');
  });


  it('when login is successful -  redicret to home page', async() => {
    MyAccount.login(loginDataOk);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/home');
  });

});
