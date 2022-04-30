import { EditPostPO } from '../../page-objects/posts/edit-post.po';
import { PostPO } from '../../page-objects/posts/post.po';

describe('Edit Post Page', () => {
  let editPost: EditPostPO;
  let post: PostPO;

  beforeEach(() => {
    editPost = new EditPostPO;
    post = new PostPO;
  });

  it('displays a title', () => {
    editPost.visit();

    editPost.title.should('be.visible');
  });

  it('displays server errors', () => {
    editPost.interceptUpdatePostRequest('update-post-error');
    editPost.visit();
    editPost.inputFormValues();

    editPost.actionButton.click();

    editPost.titleErrorMessage.should('be.visible');
    editPost.bodyErrorMessage.should('be.visible');
  });

  it('is hydrated with the existing post data', () => {
    editPost.visit();

    editPost.titleInputField.should('have.value', 'Fake Post Title');
    editPost.bodyInputField.should('have.value', 'Fake Post Body');
  });

  it('navigates back on success', () => {
    editPost.interceptUpdatePostRequest();
    editPost.visit();
    editPost.inputFormValues();

    editPost.actionButton.click();

    post.shouldBeActive();
  });

  describe('Update Post Button', () => {
    it('is disabled when form is invalid', () => {
      editPost.visit();

      editPost.inputFormValues({
        title: '',
        body: ''
      });

      editPost.actionButton.should('be.disabled');
    });

    it('displays a loading spinner when loading', () => {
      editPost.interceptUpdatePostRequest('update-post', 1_000);
      editPost.visit();
      editPost.inputFormValues();

      editPost.actionButton.click();

      editPost.actions.find('mat-progress-spinner').should('be.visible');
    });
  });

  describe('Back Button', () => {
    it('links back to the previous route', () => {
      post.visit();
      post.editPostButton.click();

      editPost.cancelButton.click();

      post.shouldBeActive();
    });

    it('falls back to the post page', () => {
      editPost.visit();

      editPost.cancelButton.click();

      post.shouldBeActive();
    });
  });
});
