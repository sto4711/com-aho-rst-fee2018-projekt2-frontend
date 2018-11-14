import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    AppPage.navigateTo();
    expect(AppPage.getParagraphText()).toEqual('DE DE Blockquote. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Blockquote. Lorem ipsum dolor sit amet,consectetur adipiscing elit. DE DE');
  });
});
