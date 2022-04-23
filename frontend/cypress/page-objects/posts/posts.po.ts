import { aliasQuery, hasOperationName } from '../../utils/graphql-test-utils';

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

  constructor(interceptRequests = true) {
    if (interceptRequests) {
      this.interceptRequests();
    }
  }

  interceptRequests() {
    cy.intercept('POST', 'http://laravel-lighthouse-blog-backend.test/graphql', req => {
      if (hasOperationName(req, 'Posts')) {
        aliasQuery(req, 'Posts');
        req.reply({ fixture: 'posts.json' });
      }
    }).as('GraphQL');
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
