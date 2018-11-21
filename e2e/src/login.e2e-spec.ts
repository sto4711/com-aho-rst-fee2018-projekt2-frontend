import {MyAccount} from './login.po';
import {browser} from 'protractor';
import {Login} from '../../src/app/services/user/login';
import {User} from '../../src/app/services/user/user';

describe('myAccount login / create user', () => {
  const loginNok: Login = new Login('wrong@email.com', '1234223322233test');
  const loginOk: Login = new Login('alain@aholzhauser.ch', 'aho');
  const usersToCreate: { name: string; firstname: string }[] = [
    {name: 'Darth', firstname: 'Vader', },
    {name: 'Han', firstname: 'Solo', },
    {name: 'Luke', firstname: 'Skywalker', },
    {name: 'Leia', firstname: 'Organa', },
    {name: 'Indiana', firstname: 'Jones', },
    {name: 'Pink', firstname: 'Panther', },
  ];

  beforeEach(async () => {
    await MyAccount.navigateTo();
  });

  it('when login is fails - stay on page', async () => {
    await MyAccount.login(loginNok);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/my-account');
  });

  it('when login is successful -  redicret to home page', async () => {
    await MyAccount.login(loginOk);
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/home');
  });

  function createAndLogin(userToCreate: { name: string; firstname: string }) {
    it('when user "' + userToCreate.name + ' ' +  userToCreate.firstname
      + '" created (ignore, if already exists)  & login is successful -  redicret to home page', async () => {
      const email = (userToCreate.name + '.' + userToCreate.firstname + '@starwars.com').toLowerCase().replace(' ', '');
      const pwd = userToCreate.name.substr(0, 1) + userToCreate.firstname.substr(0, 2);
      const user: User = new User(null, userToCreate.firstname, userToCreate.name, email, pwd, null);
      await MyAccount.createUser(user);
      await MyAccount.navigateTo();
      await MyAccount.login(user);
      await expect(await browser.getCurrentUrl()).toEqual('http://localhost:4200/home');
    });
  }

  usersToCreate.forEach(async userToCreate => {
    createAndLogin(userToCreate);
  });


});
