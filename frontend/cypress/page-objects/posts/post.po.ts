import { aliasQuery, hasOperationName } from '../../utils/graphql-test-utils';
import { environment } from '../../../src/environments/environment';

export class PostPO {

  get page() {
    return cy.get('app-post');
  }

  get title() {
    return this.page.contains('Fake Post Title');
  }

  get body() {
    return this.page.contains('Fake Post Body');
  }

  get author() {
    return this.page.contains('Fake User Name');
  }

  get date() {
    return this.page.contains('Jan 1, 1970');
  }

  get actions() {
    return this.page.find('app-actions').first();
  }

  get editPostButton() {
    return this.actions.contains('Edit Post');
  }

  constructor(interceptRequests = true) {
    if (interceptRequests) {
      this.interceptRequests();
    }
  }

  interceptRequests() {
    cy.intercept('POST', environment.backendURL, req => {
      if (hasOperationName(req, 'Post')) {
        aliasQuery(req, 'Post');
        req.reply({ fixture: 'post.json' });
      }
    }).as('GraphQL');
  }

  visit() {
    cy.visit('/posts/1');
    this.shouldBeActive();
  }

  shouldBeActive() {
    cy.url().should('match', /\/posts\/1$/);
    this.page.should('be.visible');
  }
}
