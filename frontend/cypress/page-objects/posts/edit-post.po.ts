import { aliasQuery, hasOperationName } from '../../utils/graphql-test-utils';
import { environment } from '../../../src/environments/environment';
import { PostFormPO, PostFormPageObjectOptions, PostFormFixtureType } from './post-form.po';
import { PostPO } from './post.po';

export class EditPostPO extends PostFormPO {

  static options: PostFormPageObjectOptions = {
    description: 'Edit Post Page',
    hydratesFields: true,
    selector: 'app-edit-post',
    title: 'Edit Post',
    actionButtonLabel: 'Update Post',
    path: '/posts/1/edit',
    pathRegex: /\/posts\/1\/edit$/,
  }

  options(): PostFormPageObjectOptions {
    return EditPostPO.options;
  }

  constructor(interceptRequests = true) {
    super();

    if (interceptRequests) {
      this.interceptRequests();
    }
  }

  interceptRequests() {
    const fixture = 'post.json';
    cy.intercept('POST', environment.backendURL, req => {
      if (hasOperationName(req, 'Post')) {
        aliasQuery(req, 'Post');
        req.reply({ fixture });
      }
    }).as(fixture);
  }

  interceptActionRequest(fixtureType: PostFormFixtureType = 'success', delay = 0) {
    const fixture = {
      success: 'update-post.json',
      error: 'update-post-error.json',
    }[fixtureType];

    cy.intercept('POST', environment.backendURL, req => {
      if (hasOperationName(req, 'UpdatePost')) {
        aliasQuery(req, 'UpdatePost');
        req.reply({ fixture, delay });
      }
    }).as(fixture);
  }

  backNavigationTarget(): { shouldBeActive: () => void } {
    return new PostPO;
  }
}
