import { CreatePostPO } from '../../page-objects/posts/create-post.po';
import { PostsPO } from '../../page-objects/posts/posts.po';

describe('Create Post Page', () => {
  let createPost: CreatePostPO;
  let posts: PostsPO;

  beforeEach(() => {
    createPost = new CreatePostPO;
    posts = new PostsPO;
  });

  it('displays a title', () => {
    createPost.visit();

    createPost.title.should('be.visible');
  });

  it('displays server errors', () => {
    createPost.interceptCreatePostRequest('create-post-error');
    createPost.visit();
    createPost.inputFormValues();

    createPost.createButton.click();

    createPost.titleErrorMessage.should('be.visible');
    createPost.bodyErrorMessage.should('be.visible');
  });

  it('navigates to the posts page on success', () => {
    createPost.interceptCreatePostRequest();
    createPost.visit();
    createPost.inputFormValues();

    createPost.createButton.click();

    posts.shouldBeActive();
  });

  describe('Create Post Button', () => {
    it('is disabled when form is invalid', () => {
      createPost.visit();

      createPost.createButton.should('be.disabled');
    });

    it('displays a loading spinner when loading', () => {
      createPost.interceptCreatePostRequest('create-post', 1_000);
      createPost.visit();
      createPost.inputFormValues();

      createPost.createButton.click();

      createPost.actions.find('mat-progress-spinner').should('be.visible');
    });
  });

  describe('Back Button', () => {
    it('links back to the previous route', () => {
      posts.visit();
      posts.createPostButton.click();

      createPost.cancelButton.click();

      posts.shouldBeActive();
    });

    it('falls back to the posts page', () => {
      createPost.visit();

      createPost.cancelButton.click();

      posts.shouldBeActive();
    });
  });
});
