import { aliasQuery, hasOperationName } from '../../utils/graphql-test-utils';
import { environment } from '../../../src/environments/environment';

export class PostsPO {

  get page() {
    return cy.get('app-posts');
  }

  get title() {
    return cy.contains('The Posts');
  }

  get postLink() {
    return this.page.contains('Fake Post Title (Fake User Name, Jan 1, 1970)');
  }

  get createPostButton() {
    return this.page.contains('Create Post');
  }

  constructor(interceptRequests = true) {
    if (interceptRequests) {
      this.interceptRequests();
    }
  }

  interceptRequests() {
    const fixture = 'posts.json';
    cy.intercept('POST', environment.backendURL, req => {
      if (hasOperationName(req, 'Posts')) {
        aliasQuery(req, 'Posts');
        req.reply({ fixture });
      }
    }).as(fixture);
  }

  visit() {
    cy.visit('/posts');
    this.shouldBeActive();
  }

  shouldBeActive() {
    cy.url().should('match', /\/posts$/);
    this.page.should('be.visible');
  }
}
