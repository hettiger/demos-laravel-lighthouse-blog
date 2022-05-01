import { PostPO } from '../../page-objects/posts/post.po';
import { EditPostPO } from '../../page-objects/posts/edit-post.po';

describe('Post Page', () => {
  let post: PostPO;

  beforeEach(() => {
    post = new PostPO;
  });

  it("displays the post's data", () => {
    post.visit();

    post.title.should('be.visible');
    post.body.should('be.visible');
    post.author.should('be.visible');
    post.date.should('be.visible');
  });

  it('links to the edit post page', () => {
    const editPost = new EditPostPO;
    post.visit();

    post.editPostButton.click();

    editPost.shouldBeActive();
  });
});
