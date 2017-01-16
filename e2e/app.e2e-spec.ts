import { ParentChildAppPage } from './app.po';

describe('parent-child-app App', function() {
  let page: ParentChildAppPage;

  beforeEach(() => {
    page = new ParentChildAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
