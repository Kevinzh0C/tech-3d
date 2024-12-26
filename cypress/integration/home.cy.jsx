describe('Home Page', () => {
  it('loads and displays the header', () => {
    cy.visit('/');
    cy.contains('技术栈3D展示').should('be.visible');
  });
});
