const url = "https://paneltest.tiendanegocio.com/#/clientes"

describe("Editar clientes", () =>{
    before(() => {
        cy.registerUser({
        complete_tutorial: true,
        assign_design: true
        });
    });

    beforeEach(() => {
        cy.login();
    })
    it("add client", ()=>{
        cy.visit('clientes/agregar')
        cy.get('[data-cy="input-email"].p-inputtext').type('prueba@gmail.com')
        cy.get('[data-cy="input-password"].p-inputtext').type('contrasena')
        cy.get('[data-cy="input-name"].p-inputtext').type('Mario')
        cy.get('[data-cy="input-lastname"].p-inputtext').type('bros')
        cy.get('[data-cy="input-phone"].p-inputtext').type('1111111111')
        cy.get('[data-cy="input-dni"].p-inputtext').type('465463')
        cy.get('[data-cy="button-save"]').click()
    })
    it("Edit client", ()=>{
        cy.visit('clientes')
        cy.get('[data-cy="button-more-options-clients"]').click()
        cy.get('.p-menu-item-label').first().click()
        cy.get('[data-cy="input-email"]').clear().type('prueba2@gmail.com.ar')
        cy.get('[data-cy="input-password"]').clear().type('contrasena2')
        cy.get('[data-cy="input-name"]').clear().type('Mr')
        cy.get('[data-cy="input-lastname"]').clear().type('Beast')
        cy.get('[data-cy="input-phone"]').clear().type('2222222222')
        cy.get('[data-cy="input-dni"]').clear().type('454331')
        cy.get('[data-cy="button-save"]').click()  
    })
    it("Add note in client", ()=>{
        cy.visit('clientes')
        cy.get('.link-table-dark').click()
        cy.get('.p-button-success').last().click()
        cy.get('#trackingcode').type('albion online es un mmorpg...')
        cy.get('.p-button-success').last().click()
    })
    it("Delete client", () =>{
         cy.visit('clientes')
        cy.get('.link-table-dark').click()
        cy.get('[data-cy="button-delete-client"]').click()
        cy.get('.p-button-danger').last().click()
        cy.get('.p-toast-detail').should('be.visible')
    })
})