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
  })
});
