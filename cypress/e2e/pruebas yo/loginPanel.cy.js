/// <reference types="cypress"/>
describe('Login panel tienda negocio', () =>{
    Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Script error")) {
    return false;
  }
});
    beforeEach(()=>{
        cy.visit('https://panel.tiendanegocio.com/#/login')

    })
    it('Login exitoso', () =>{
        cy.get('[data-cy="input-email"]').type("tomasrivero@tiendanegocio.com")
        cy.get('[data-cy="input-password"]').type("papoisclave")
        cy.get('[data-cy="button-save"]').click()
        cy.url('eq', 'https://panel.tiendanegocio.com/#/dashboard')
    })
    it('Login fallido', () =>{
        cy.get('[data-cy="input-email"]').type("tomasrivero@tiendanegocio.com")
        cy.get('[data-cy="input-password"]').type("papoisnotclave")
        cy.get('[data-cy="button-save"]').click()
        cy.get('.p-toast-message-content').should('be.visible').contains('El email o la contraseña es incorrecta')
    })    
})