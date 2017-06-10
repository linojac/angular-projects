import { WeddingPlanPage } from './app.po';

describe('wedding-plan App', () => {
  let page: WeddingPlanPage;

  beforeEach(() => {
    page = new WeddingPlanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
