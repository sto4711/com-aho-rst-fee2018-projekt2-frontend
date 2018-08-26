export class ShoppingBasketItem {
  public shoppingBasketID :string =  '';
  public articleID :string =  '';
  public count : number = 0;

  constructor(shoppingBasketID: string, articleID: string, count : number) {
    this.shoppingBasketID = shoppingBasketID;
    this.articleID = articleID;
    this.count = count;
  }



}
