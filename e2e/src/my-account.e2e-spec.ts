import {browser} from 'protractor';
import {User} from '../../src/app/services/user/user';
import {MyAccount} from './my-account';

describe('myAccount login / create user', () => {

  beforeEach(async () => {
    await MyAccount.navigateTo();
  });

  it('when login is fails - stay on page', async () => {
    await MyAccount.login(MyAccount.loginNok);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/my-account');
  });

  it('when login is successful -  redicret to home page', async () => {
    await MyAccount.login(MyAccount.loginOk);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/home');
  });

  function createAndLogin(userToCreate: { name: string; firstname: string }) {
    it('when user "' + userToCreate.name + ' ' +  userToCreate.firstname
      + '" is created (ignore, if already exists)  & login is successful -  redicret to home page', async () => {
      const user: User = MyAccount.createUserObj(userToCreate);
      await MyAccount.createUser(user);
      await MyAccount.navigateTo();
      await MyAccount.login(user);
      await expect(await browser.getCurrentUrl()).toEqual('http://localhost:4200/home');
    });
  }

  MyAccount.usersToCreate.forEach(async userToCreate => {
    createAndLogin(userToCreate);
  });


});
