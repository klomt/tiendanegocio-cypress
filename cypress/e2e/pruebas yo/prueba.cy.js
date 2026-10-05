/// <reference types="cypress" />

describe('buscar un h1 en pepito', () => {
    beforeEach(() => {
        cy.visit('cypress/e2e/pruebas yo/pepito.html')
    })
    it('muestra una pagina vacia con un h1', () => {        
        cy.get('h1').should('contain.text', '2') 
    })
})
