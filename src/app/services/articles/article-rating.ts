export class ArticleRating {
  public articleID = '';
  public rateUp: boolean;

  constructor(articleID: string, rateUp: boolean) {
    this.articleID = articleID;
    this.rateUp = rateUp;
  }
}
