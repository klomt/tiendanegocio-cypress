describe("Proceso de compra", () =>{
    before(() => {
        cy.registerUser({
        complete_tutorial: true,
        assign_design: true
        });
    });

    beforeEach(() => {
        cy.login();
    })
    it("click checkouts", ()=>{
        cy.visit('configuraciones/compra')
        cy.get('#checkout_required_id').click()
        cy.get('#checkout_required_phone').click() 
        cy.get('#checkout_required_domicile_payment').click()
        cy.get('#checkout_required_note').click()
        cy.get('[data-cy="button-save"]').click()       
    })
    it("Input min compra too long", ()=>{
        cy.visit('configuraciones/compra')
        cy.get('.p-inputtext').generateRandomText(100)
        cy.get('[data-cy="button-save"]').click().should('be.disabled')                                
    })
    it('Input to short',()=>{
        cy.visit('configuraciones/compra')
        cy.get('.p-inputnumber-input').type('4')
        cy.get('[data-cy="button-save"]').click()
        cy.get('.p-toast-message-content').should('be.visible')
    })
    it('Input to long',()=>{
        cy.visit('configuraciones/compra')
        cy.get('.p-inputnumber-input').generateRandomNumber(100)
        cy.get('[data-cy="button-save"]').click().should('be.disabled')
    })
    it("Input min compra correct", ()=>{
        cy.visit('configuraciones/compra')
        cy.get('.p-inputtext').type("4000") 
        cy.get('[data-cy="button-save"]').click().should('be.enabled')                                
    })
})