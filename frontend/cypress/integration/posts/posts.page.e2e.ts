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
  });

  describe('pagination', () => {
    it('redirects to posts without query params on invalid pagination params', () => {
      posts.visit('?page=-1');
      posts.shouldBeActive();

      posts.visit('?perPage=0');
      posts.shouldBeActive();
    });

    it('visits the page on valid pagination params', () => {
      posts.visit('?page=2&perPage=2');
      posts.shouldBeActive('?page=2&perPage=2');
    });

    it('displays the correct paginator info', () => {
      posts.visit();

      posts.page.contains('133').should('be.visible');
      posts.page.contains('799 – 931 of 1337').should('be.visible');
    });
  });
});
