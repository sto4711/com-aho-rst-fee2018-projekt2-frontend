import { browser, by, element } from 'protractor';
import {Login} from '../../src/app/services/user/login';
import {User} from '../../src/app/services/user/user';

export class  MyAccountPo {

  public static loginNok: Login = new Login('wrong@email.com', '1234223322233test');
  public static loginOk: Login = new Login('alain@aholzhauser.ch', 'aho');
  public static usersToCreate: { name: string; firstname: string }[] = [
    {name: 'Darth', firstname: 'Vader', },
    {name: 'Han', firstname: 'Solo', },
    {name: 'Luke', firstname: 'Skywalker', },
    {name: 'Leia', firstname: 'Organa', },
    {name: 'Indiana', firstname: 'Jones', },
    {name: 'Pink', firstname: 'Panther', },
    {name: 'Iron', firstname: 'Man', },
    {name: 'James', firstname: 'Bond', },
    {name: 'Hans', firstname: 'Muster', },
    {name: 'Helene', firstname: 'Fischer', },
    {name: 'Stefan', firstname: 'Raab', },
    {name: 'Elvis', firstname: 'Presley', },
    {name: 'Barack', firstname: 'Obama', },
    {name: 'Bill', firstname: 'Clinton', },
    {name: 'Bud', firstname: 'Spencer', },
    {name: 'Terence', firstname: 'Hill', },
    {name: 'Old', firstname: 'Shatterhand', },
    {name: 'Alfred', firstname: 'Hitchcock', },
    {name: 'Michael', firstname: 'Ende', },
    {name: 'Alain', firstname: 'Berset', },
  ];

  public static async navigateToMyAccount() {
    return await browser.get('/my-account');
  }

  public static async navigateToHome() {
    return await browser.get('/home');
  }

  public static async login(login: Login) {
    element(by.css('[name="loginEmail"]')).sendKeys(login.email);
    element(by.css('[name="loginPassword"]')).sendKeys(login.pwd);
    element(by.css('[aria-label="Anmelden"]')).click();
    await browser.waitForAngular();
  }

  public static async logOut() {
    element(by.css('[name="logOut"]')).click();
    await browser.waitForAngular();
  }

  public static async createUser(user: User)  {
    element(by.css('[name="accountNewName"]')).clear();
    element(by.css('[name="accountNewName"]')).sendKeys(user.name);
    element(by.css('[name="accountNewFirstname"]')).clear();
    element(by.css('[name="accountNewFirstname"]')).sendKeys(user.firstname);
    element(by.css('[name="accountNewEmail"]')).clear();
    element(by.css('[name="accountNewEmail"]')).sendKeys(user.email);
    element(by.css('[name="accountNewPassword"]')).clear();
    element(by.css('[name="accountNewPassword"]')).sendKeys(user.pwd);
    element(by.css('[aria-label="Konto erstellen"]')).click();
    await browser.waitForAngular();
  }


  public static createUserObj(userToCreate: { name: string; firstname: string }): User {
    const email = (userToCreate.name + '.' + userToCreate.firstname + '@earth.com').toLowerCase().replace(' ', '');
    const pwd = userToCreate.name.substr(0, 1) + userToCreate.firstname.substr(0, 2);
    return new User(null, userToCreate.firstname, userToCreate.name, email, pwd, null);
  }
}
