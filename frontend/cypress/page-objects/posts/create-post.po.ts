import { aliasQuery, hasOperationName } from '../../utils/graphql-test-utils';
import { environment } from '../../../src/environments/environment';
import { PostFormPO, PostFormPageObjectOptions } from './post-form.po';

export class CreatePostPO extends PostFormPO {

  get options(): PostFormPageObjectOptions {
    return {
      selector: 'app-create-post',
      title: 'Create Post',
      actionButtonLabel: 'Create Post',
      path: '/posts/create',
      pathRegex: /\/posts\/create$/,
    };
  }

  interceptCreatePostRequest(fixture: 'create-post' | 'create-post-error' = 'create-post', delay = 0) {
    cy.intercept('POST', environment.backendURL, req => {
      if (hasOperationName(req, 'CreatePost')) {
        aliasQuery(req, 'CreatePost');
        req.reply({ fixture: `${fixture}.json`, delay: delay });
      }
    }).as('GraphQL');
  }
}
