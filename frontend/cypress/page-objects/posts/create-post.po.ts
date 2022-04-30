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

  interceptCreatePostRequest(fixture: 'post' | 'create-post-error' = 'post' ) {
    cy.intercept('POST', environment.backendURL, req => {
      if (hasOperationName(req, 'CreatePost')) {
        aliasQuery(req, 'CreatePost');
        req.reply({ fixture: `${fixture}.json` });
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

  inputFormValues(values: { title?: string; body?: string }) {
    if (values.title) {
      this.page.find('[name=title]').first().type(values.title);
    }

    if (values.body) {
      this.page.find('[name=body]').first().type(values.body);
    }
  }
}
