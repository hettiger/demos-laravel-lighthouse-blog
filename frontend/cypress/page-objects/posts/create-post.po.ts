import { aliasQuery, hasOperationName } from '../../utils/graphql-test-utils';
import { environment } from '../../../src/environments/environment';

export class CreatePostPO {

  get page() {
    return cy.get('app-create-post');
  }

  get title() {
    return this.page.contains('Create Post');
  }

  get actions() {
    return this.page.find('app-actions');
  }

  get cancelButton() {
    return this.actions.contains('Cancel');
  };

  get createButton() {
    return this.actions.contains('Create Post');
  }

  get titleErrorMessage() {
    return this.page.contains('Fake Title Error Message');
  }

  get bodyErrorMessage() {
    return this.page.contains('Fake Body Error Message');
  }

  interceptCreatePostRequest(fixture: 'create-post' | 'create-post-error' = 'create-post', delay = 0) {
    cy.intercept('POST', environment.backendURL, req => {
      if (hasOperationName(req, 'CreatePost')) {
        aliasQuery(req, 'CreatePost');
        req.reply({ fixture: `${fixture}.json`, delay: delay });
      }
    }).as('GraphQL');
  }

  visit() {
    cy.visit('/posts/create');
    this.shouldBeActive();
  }

  shouldBeActive() {
    cy.url().should('match', /\/posts\/create$/);
    this.page.should('be.visible');
  }

  inputFormValues(values: { title?: string; body?: string } = { title: 'Some title', body: 'Some body' }) {
    if (values.title) {
      this.page.find('[name=title]').first().type(values.title);
    }

    if (values.body) {
      this.page.find('[name=body]').first().type(values.body);
    }
  }
}
