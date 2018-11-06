export class BreadcrumbPath  {
  public mainUrl: string;
  public breadcrumb: string;
  public breadcrumbTranslated = 'not translated';

  constructor(mainUrl: string, breadcrumb: string) {
    this.mainUrl = mainUrl;
    this.breadcrumb = breadcrumb;
  }
}
