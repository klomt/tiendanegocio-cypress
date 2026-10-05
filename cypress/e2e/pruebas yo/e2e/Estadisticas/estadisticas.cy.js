describe("Prueba estadisticas", () =>{
    before(() => {
        cy.registerUser({
        complete_tutorial: true,
        assign_design: true
        });
    });
    beforeEach(() => {
        cy.login();
    })
    it("add product", ()=>{
        cy.visit('productos/agregar')
        cy.get('[data-cy="input-title"]').type('Atomo')
        cy.get('[data-cy="input-price"]').type('10000')
        cy.get('[data-cy="button-save"]').click()
    })
    it("Add sale", ()=>{
        cy.visit('ordenes')
        cy.get('[data-cy="button-create"]').click()
        cy.get('[data-cy="name"]').type('Fernan')
        cy.get('[data-cy="lastname"]').type('floo')
        cy.get('[data-cy="email"]').type('floo@fernan.com')
        cy.get('[data-cy="button-create"]').click()
        cy.get('[data-cy="product-item-0"]').click()
        cy.get('.closeButton').click()
        cy.get('[data-cy="inputnumber-quantity-product-order"] > .p-inputtext').clear().type('3')
        cy.get('[data-cy="listbox-item-3"]').click()
        cy.get('.p-button-success').click()
    })
    it("Verify statistics", ()=>{
        cy.visit('estadisticas')
        cy.get('[data-cy="stat-value"]').first().should('contain','1')
        cy.get('[data-cy="stat-value"]').eq(1).should('contain','$30.000')
        cy.get('[data-cy="stat-value"]').eq(2).should('contain','$30.000')
        cy.get('[data-cy="stat-value"]').last().should('contain','0')
    }) 
})