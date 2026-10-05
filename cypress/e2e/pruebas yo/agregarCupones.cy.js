/// <reference types="cypress"/>
describe('Agregar cupones', () =>{
    Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Script error")) {
    return false;
  }
});
    beforeEach(()=>{
        cy.login('', ''); 
        cy.visit('https://panel.tiendanegocio.com/#/cupones/agregar')

    })
    it('agreagar cupon solo nombre', () =>{
        cy.get('[data-cy="code"]').type('CUPON')
        cy.get('[data-cy="button-create"]').click()
        cy.get('.p-toast-message-content').should('be.visible').contains('El cupon CUPON fue creado...')
    })
    afterEach('eliminar cupon',()=>{
        cy.visit('https://panel.tiendanegocio.com/#/cupones')
        cy.get('[data-cy="button-delete"]').should('be.visible').click()
        cy.get('.p-dialog-mask').should('be.visible').contains('Confirmación de eliminación')
        cy.get('[pc177=""] > .p-ripple').click()
        cy.get('.p-toast-message-content').should('be.visible').contains('Cupon CUPON eliminado...')
    })
})