export class CreatePostPO {

  get page() {
    return cy.get('app-create-post');
  }

  get title() {
    return cy.contains('Create Post');
  }

  visit() {
    cy.visit('/posts/create');
    this.shouldBeActive();
  }

  shouldBeActive() {
    cy.url().should('match', /\/posts\/create$/);
    this.page.should('be.visible');
  }
}
