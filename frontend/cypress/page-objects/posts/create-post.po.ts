import { aliasQuery, hasOperationName } from '../../utils/graphql-test-utils';
import { environment } from '../../../src/environments/environment';
import { PostFormPO, PostFormPageObjectOptions, PostFormFixtureType } from './post-form.po';
import { PostsPO } from './posts.po';

export class CreatePostPO extends PostFormPO {

  static options: PostFormPageObjectOptions = {
    description: 'Create Post Page',
    hydratesFields: false,
    selector: 'app-create-post',
    title: 'Create Post',
    actionButtonLabel: 'Create Post',
    path: '/posts/create',
    pathRegex: /\/posts\/create$/,
  };

  options(): PostFormPageObjectOptions {
    return CreatePostPO.options;
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

  backNavigationTarget(): { shouldBeActive: () => void } {
    return new PostsPO;
  }
}
