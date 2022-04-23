export class NotFoundPO {

  get page() {
    return cy.get('app-not-found');
  }

  get title() {
    return cy.contains('Not Found!');
  }

  visit() {
    cy.visit('/not-found');
    this.shouldBeActive();
  }

  shouldBeActive() {
    cy.url().should('match', /\/not-found$/);
    this.page.should('be.visible');
  }
}
