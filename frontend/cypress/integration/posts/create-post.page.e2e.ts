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
    createPost.inputFormValues({
      title: 'Some invalid title',
      body: 'Some invalid body'
    });

    createPost.createButton.click();

    createPost.titleErrorMessage.should('be.visible');
    createPost.bodyErrorMessage.should('be.visible');
  });

  it('navigates to the posts page on success', () => {
    createPost.interceptCreatePostRequest();
    createPost.visit();
    createPost.inputFormValues({
      title: 'Some valid title',
      body: 'Some valid body'
    });

    createPost.createButton.click();

    posts.shouldBeActive();
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
