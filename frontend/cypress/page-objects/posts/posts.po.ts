export class PostsPO {

  get page() {
    return cy.get('app-posts');
  }

  get title() {
    return cy.contains('The Posts');
  }

  get postsList() {
    return this.page.find('ul').first();
  }

  get postLink() {
    return this.postsList.find('a').first();
  }

  visit() {
    cy.visit('/posts');
    this.shouldBeActive();
  }

  shouldBeActive() {
    cy.url().should('match', /\/posts$/);
    this.page.should('be.visible');
  }
}
