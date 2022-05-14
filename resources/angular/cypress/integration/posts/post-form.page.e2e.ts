import { PostFormPO } from '../../page-objects/posts/post-form.po';
import { CreatePostPO } from '../../page-objects/posts/create-post.po';
import { EditPostPO } from '../../page-objects/posts/edit-post.po';

describe('Post Form Page', () => {
  [CreatePostPO, EditPostPO].forEach((_postForm) => {
    describe(_postForm.options.description, () => {
      let postForm: PostFormPO;

      beforeEach(() => {
        postForm = new _postForm;
      });

      it('displays a title', () => {
        postForm.visit();

        postForm.title.should('be.visible');
      });

      it('displays server errors', () => {
        postForm.interceptActionRequest('error');
        postForm.visit();
        postForm.inputFormValues();

        postForm.actionButton.click();

        postForm.titleErrorMessage.should('be.visible');
        postForm.bodyErrorMessage.should('be.visible');
      });

      if (_postForm.options.hydratesFields) {
        it('is hydrated with the existing post data', () => {
          postForm.visit();

          postForm.titleInputField.should('have.value', 'Fake Post Title');
          postForm.bodyInputField.should('have.value', 'Fake Post Body');
        });
      }

      it('navigates back on success', () => {
        const backNavigationTarget = postForm.backNavigationTarget();
        postForm.interceptActionRequest();
        postForm.visit();
        postForm.inputFormValues();

        postForm.actionButton.click();

        backNavigationTarget.shouldBeActive();
      });

      describe('Action Button', () => {
        it('is disabled when form is invalid', () => {
          postForm.visit();

          postForm.inputFormValues({
            title: '',
            body: ''
          });

          postForm.actionButton.should('be.disabled');
        });

        it('displays a loading spinner when loading', () => {
          postForm.interceptActionRequest('success', 1_000);
          postForm.visit();
          postForm.inputFormValues();

          postForm.actionButton.click();

          postForm.actionButton.should('be.disabled');
          postForm.actions.find('mat-progress-spinner').should('be.visible');
        });
      });

      describe('Back Button', () => {
        it('navigates back', () => {
          const backNavigationTarget = postForm.backNavigationTarget();
          postForm.visit();
          postForm.cancelButton.click();

          backNavigationTarget.shouldBeActive();
        });
      });
    });
  });
});
