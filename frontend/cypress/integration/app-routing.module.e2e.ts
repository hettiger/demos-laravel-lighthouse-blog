describe('Home Route', () => {
  it('redirects to the posts page', () => {
    cy.visit('/');
    cy.url().should('contain', '/posts');
  });
});

describe('Catch All Route', () => {
  it('redirects to the not found page', () => {
    cy.visit('/some/non-existing/route');
    cy.url().should('contain', '/not-found');
  });
});
