// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('https://panel.tiendanegocio.com/#/login');
        cy.get('[data-cy="input-email"]').type("tomasrivero@tiendanegocio.com")
        cy.get('[data-cy="input-password"]').type("papoisclave")
        cy.get('[data-cy="button-save"]').click()
    cy.url().should('contain', '/dashboard');
  }, {
    cacheAcrossSpecs: true 
  });
});
