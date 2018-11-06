export class Address {
  public givenname = '';
  public surname = '';
  public streetHousenumber = '';
  public postCode = '';
  public city = '';

  constructor(givenname: string, surname: string, streetHousenumber: string, postCode: string, city: string) {
    this.givenname = givenname;
    this.surname = surname;
    this.streetHousenumber = streetHousenumber;
    this.postCode = postCode;
    this.city = city;
  }


}
