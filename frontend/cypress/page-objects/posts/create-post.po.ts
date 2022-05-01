import { aliasQuery, hasOperationName } from '../../utils/graphql-test-utils';
import { environment } from '../../../src/environments/environment';
import { PostFormPO, PostFormPageObjectOptions, PostFormFixtureType } from './post-form.po';

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

  interceptActionRequest(fixtureType: PostFormFixtureType = 'success', delay = 0) {
    let fixture: string;
    switch (fixtureType) {
      case 'success': fixture = 'create-post.json'; break;
      case 'error': fixture = 'create-post-error.json'; break;
      default: throw new Error('Unexpected fixtureType');
    }

    cy.intercept('POST', environment.backendURL, req => {
      if (hasOperationName(req, 'CreatePost')) {
        aliasQuery(req, 'CreatePost');
        req.reply({ fixture, delay });
      }
    }).as('GraphQL');
  }
}
