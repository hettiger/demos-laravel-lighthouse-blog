import { PostsPO } from '../../page-objects/posts/posts.po';
import { PostPO } from '../../page-objects/posts/post.po';

describe('Posts Page', () => {
  let posts: PostsPO;
  let post: PostPO;

  beforeEach(() => {
    posts = new PostsPO;
    post = new PostPO;
  });

  it('displays a title', () => {
    posts.visit();
    posts.title.should('be.visible');
  });

  it('displays a list of posts', () => {
    posts.visit();
    posts.postsList.should('be.visible');
  });

  it('links to individual posts', () => {
    posts.visit();
    posts.postLink.click();
    post.shouldBeActive();
  });
});
