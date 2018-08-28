export class ShoppingBasketItem {
  public shoppingBasketID :string =  '';
  public articleID :string =  '';
  public articleName :string =  '';
  public articlePrice :number =  null;
  public articleAvailability :boolean =  null;
  public articleCount :number =  null;

  constructor(shoppingBasketID: string, articleID: string, articleCount : number) {
    this.shoppingBasketID = shoppingBasketID;
    this.articleID = articleID;
    this.articleCount = articleCount;
  }



}
