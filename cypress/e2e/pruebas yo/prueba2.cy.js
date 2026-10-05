/// <reference types="cypress"/>
let startTime;
describe('pagina web vacia con un h1 y formulario de log in', () =>{
    beforeEach(()=>{
        cy.visit('cypress/e2e/pruebas yo/pepito.html')

    })
    it('encontrar los inputs y apretar el boton', () =>{
        cy.get('[data-cy="inputemail"]').type("hola")
        cy.get('[data-cy="input-contraseña"]').type(11)
        cy.get('[data-cy="button-login"]').click()
        cy.get('[data-cy="input-contraseña"]').should('have.value', 11)
    })
})