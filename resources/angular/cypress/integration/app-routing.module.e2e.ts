import { PostsPO } from '../page-objects/posts/posts.po';
import { NotFoundPO } from '../page-objects/not-found.po';

describe('Home Route', () => {
  it('redirects to the posts page', () => {
    const posts = new PostsPO;
    cy.visit('/');
    posts.shouldBeActive();
  });
});

describe('Catch All Route', () => {
  it('redirects to the not found page', () => {
    const notFound = new NotFoundPO;
    cy.visit('/some/non-existing/route');
    notFound.shouldBeActive();
  });
});
