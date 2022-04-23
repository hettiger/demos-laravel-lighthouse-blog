import { PostPO } from '../../page-objects/posts/post.po';

describe('Post Page', () => {
  let post: PostPO;

  beforeEach(() => {
    post = new PostPO;
    post.interceptRequests();
  });

  it("displays the post's data", () => {
    post.visit();
    post.title.should('be.visible');
    post.body.should('be.visible');
    post.author.should('be.visible');
    post.date.should('be.visible');
  });
});
