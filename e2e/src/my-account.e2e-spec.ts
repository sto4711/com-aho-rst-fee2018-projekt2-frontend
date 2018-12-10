import {browser} from 'protractor';
import {User} from '../../src/app/services/user/user';
import {MyAccountPo} from './my-account.po';

describe('myAccount login / create user', () => {

  beforeEach(async () => {
    await MyAccountPo.navigateToMyAccount();
  });

  it('when login is fails - stay on page', async () => {
    await MyAccountPo.login(MyAccountPo.loginNok);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/my-account');
  });

  it('when login is successful -  redicret to home page', async () => {
    await MyAccountPo.login(MyAccountPo.loginOk);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/home');
  });

  function createUserLogInLogOut(userToCreate: { name: string; firstname: string }) {
    it('when user "' + userToCreate.name + ' ' +  userToCreate.firstname
      + '" is created (ignore, if already exists)  & login is successful -  redicret to my account page', async () => {
      const user: User = MyAccountPo.createUserObj(userToCreate);
      await MyAccountPo.createUser(user);
      await MyAccountPo.navigateToMyAccount();
      await MyAccountPo.login(user);
      await expect(await browser.getCurrentUrl()).toEqual('http://localhost:4200/my-account');
      await MyAccountPo.navigateToHome();
      await MyAccountPo.logOut();
    });
  }

  MyAccountPo.usersToCreate.forEach(async userToCreate => {
    createUserLogInLogOut(userToCreate);
  });


});
