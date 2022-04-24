export class CreatePostPO {

  get page() {
    return cy.get('app-create-post');
  }

  get title() {
    return this.page.contains('Create Post');
  }

  get cancelButton() {
    return this.page.contains('Cancel');
  };

  visit() {
    cy.visit('/posts/create');
    this.shouldBeActive();
  }

  shouldBeActive() {
    cy.url().should('match', /\/posts\/create$/);
    this.page.should('be.visible');
  }
}
