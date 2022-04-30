import { aliasQuery, hasOperationName } from '../../utils/graphql-test-utils';
import { environment } from '../../../src/environments/environment';
import { PostFormPO, PostFormPageObjectOptions } from './post-form.po';

export class EditPostPO extends PostFormPO {

  get options(): PostFormPageObjectOptions {
    return {
      selector: 'app-edit-post',
      title: 'Edit Post',
      actionButtonLabel: 'Update Post',
      path: '/posts/1/edit',
      pathRegex: /\/posts\/1\/edit$/,
    };
  }

  constructor(interceptRequests = true) {
    super();

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

  interceptUpdatePostRequest(fixture: 'update-post' | 'update-post-error' = 'update-post', delay = 0) {
    cy.intercept('POST', environment.backendURL, req => {
      if (hasOperationName(req, 'UpdatePost')) {
        aliasQuery(req, 'UpdatePost');
        req.reply({ fixture: `${fixture}.json`, delay: delay });
      }
    }).as('GraphQL');
  }
}
