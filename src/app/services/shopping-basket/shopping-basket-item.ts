export class ShoppingBasketItem {
  public shoppingBasketID = '';
  public articleID = '';
  public articleName =  '';
  public articlePrice: number =  null;
  public articlePriceSum: number =  null;
  public articleAvailability: boolean =  null;
  public articleAmount: number =  null;
  public itemNumber: string =  null;
  public articleQueryParameter =  '';

  constructor(shoppingBasketID: string, articleID: string, articleAmount: number) {
    this.shoppingBasketID = shoppingBasketID;
    this.articleID = articleID;
    this.articleAmount = articleAmount;
  }



}
