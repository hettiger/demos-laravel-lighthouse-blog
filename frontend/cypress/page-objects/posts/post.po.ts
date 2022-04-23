export class PostPO {

  get page() {
    return cy.get('app-post');
  }

  get title() {
    return this.page.find('h1').first();
  }

  visit() {
    cy.visit('/post/1');
    this.shouldBeActive();
  }

  shouldBeActive() {
    cy.url().should('match', /\/posts\/1$/);
    this.page.should('be.visible');
  }
}
