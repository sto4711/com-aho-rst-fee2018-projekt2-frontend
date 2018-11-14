import { browser, by, element } from 'protractor';

export class AppPage {
  public static navigateTo() {
    return browser.get('/');
  }

  public static getParagraphText() {
    return element(by.css('app-home h2')).getText();
  }
}
