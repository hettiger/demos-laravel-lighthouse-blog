import { CreatePostPO } from '../../page-objects/posts/create-post.po';

describe('Create Post Page', () => {
  let createPost: CreatePostPO;

  beforeEach(() => {
    createPost = new CreatePostPO;
  });

  it('displays a title', () => {
    createPost.visit();
    createPost.title.should('be.visible');
  });
});
