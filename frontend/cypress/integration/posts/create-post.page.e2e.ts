import { CreatePostPO } from '../../page-objects/posts/create-post.po';
import { NotFoundPO } from '../../page-objects/not-found.po';

describe('Create Post Page', () => {
  let createPost: CreatePostPO;

  beforeEach(() => {
    createPost = new CreatePostPO;
  });

  it('displays a title', () => {
    createPost.visit();
    createPost.title.should('be.visible');
  });

  describe('Back Button', () => {
    it('links back to the previous route', () => {
      const notFound = new NotFoundPO;
      notFound.visit();
      createPost.visit();
      createPost.cancelButton.click();
      notFound.shouldBeActive();
    });
  })
});
