import {Login} from '../../src/app/services/user/login';

export class  TestData {
  public static loginNok: Login = new Login('wrong@email.com', '1234223322233test');
  public static loginOk: Login = new Login('alain@aholzhauser.ch', 'aho');
  public static users: { name: string; firstname: string }[] = [
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
  public static customerData:  { street: string; plz: string; city: string; phone: string }[] = [
    {street: 'Wiesenstrasse 2', plz: '8020', city: 'Zürich', phone: '+41 78 546 52 32' },
  ];
}
