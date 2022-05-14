import { NotFoundPO } from '../page-objects/not-found.po';

describe('Not Found Page', () => {
  let notFound: NotFoundPO;

  beforeEach(() => {
    notFound = new NotFoundPO;
  });

  it('displays a title', () => {
    notFound.visit();
    notFound.title.should('be.visible');
  });
});
