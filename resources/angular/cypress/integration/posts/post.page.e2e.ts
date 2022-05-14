import { PostPO } from '../../page-objects/posts/post.po';
import { EditPostPO } from '../../page-objects/posts/edit-post.po';
import { PostsPO } from '../../page-objects/posts/posts.po';

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

  describe('Delete Button', () => {
    it('navigates back on success', () => {
      const posts = new PostsPO;
      post.interceptDeleteRequest();
      post.visit();

      post.deletePostButton.click();

      posts.shouldBeActive();
    });

    it('navigates back on missing post', () => {
      const posts = new PostsPO;
      post.interceptDeleteRequest('missing');
      post.visit();

      post.deletePostButton.click();

      posts.shouldBeActive();
    });

    it('displays a loading spinner when loading', () => {
      post.interceptDeleteRequest('success', 1_000);
      post.visit();

      post.deletePostButton.click();

      post.deletePostButton.should('be.disabled');
      post.actions.find('mat-progress-spinner').should('be.visible');
    });
  });

  describe('Edit Button', () => {
    it('navigates to the edit post page', () => {
      const editPost = new EditPostPO;
      post.visit();

      post.editPostButton.click();

      editPost.shouldBeActive();
    });
  });
});
