import { PostPO } from '../../page-objects/posts/post.po';

describe('Post Page', () => {
  let post: PostPO;

  beforeEach(() => {
    post = new PostPO;
  });

  it('displays the title', () => {
    post.title.should('be.visible');
  });
});
