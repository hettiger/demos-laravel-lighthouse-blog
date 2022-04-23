import { PostsPO } from '../../page-objects/posts/posts.po';
import { PostPO } from '../../page-objects/posts/post.po';
import { CreatePostPO } from '../../page-objects/posts/create-post.po';

describe('Posts Page', () => {
  let posts: PostsPO;
  let post: PostPO;
  let createPost: CreatePostPO;

  beforeEach(() => {
    posts = new PostsPO;
    post = new PostPO;
    createPost = new CreatePostPO;
  });

  it('displays a title', () => {
    posts.visit();
    posts.title.should('be.visible');
  });

  it('links to individual posts', () => {
    posts.visit();
    posts.postLink.click();
    post.shouldBeActive();
  });

  it('links to the create post page', () => {
    posts.visit();
    posts.createPostButton.click();
    createPost.shouldBeActive();
  })
});
