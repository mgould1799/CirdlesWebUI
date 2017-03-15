import { CirdlesWebPage } from './app.po';

describe('cirdles-web App', () => {
  let page: CirdlesWebPage;

  beforeEach(() => {
    page = new CirdlesWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
