export class BreadcrumbPath  {
  public mainUrl: string;
  public breadcrumb: string;

  constructor(mainUrl: string, breadcrumb: string) {
    this.mainUrl = mainUrl;
    this.breadcrumb = breadcrumb;
  }
}
