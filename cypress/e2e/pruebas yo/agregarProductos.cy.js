/// <reference types="cypress"/>
describe('Seccion Agregar Producto', () =>{
    Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Script error")) {
    return false;
  }
});
    beforeEach(()=>{
    cy.login('', ''); 
    cy.visit('https://panel.tiendanegocio.com/#/productos/lista')

    })
    it('agregar producto solo nombre', () =>{
        const nombreProducto = 'nuevoProducto'
        cy.get('.header-buttons > .p-button-success').click()
        cy.get('#title').type(nombreProducto)
        cy.get('.ml-3 > div > .p-button-success').click()
        cy.get('.p-toast-message-text').should('have.text', ` El producto ${nombreProducto} fue modificada `)
        cy.get('[data-cy="row-0"] > .first-column > .column-product > .column-product-info > .column-product-info-title > span').should('have.text',nombreProducto)     
    })
    afterEach(()=>{
      cy.get('.buttons > [data-cy="button-extra"]').click()
      cy.get('#pn_id_100_5 > .p-menu-item-content > .p-ripple').should('be.visible').click()
      cy.get('[pc873=""] > .p-ripple').click()
    })
    /*/cy.get('[data-cy="type_product_id_1"] > .p-radiobutton > [name="type_product_id"]').scrollIntoView().click()
        cy.get('[data-cy="type_product_id_2"] > .p-radiobutton > [name="type_product_id"]').scrollIntoView().click()
        cy.get('[data-cy="type_product_id_3"] > .p-radiobutton > [name="type_product_id"]').scrollIntoView().click()
        cy.get('[data-cy="type_product_id_4"] > .p-radiobutton > [name="type_product_id"]').scrollIntoView().click()
        cy.get('[data-cy="button-1"]').scrollIntoView().click()
        cy.get('[data-cy="button-0"]').scrollIntoView().click()
        cy.get('[data-cy="input-price"] > .p-inputtext').type("100")
        cy.get('[data-cy="input-promo"] > .p-inputtext').type("50")
        cy.get('[data-cy="input-stock"] > .p-inputtext').type('3')
        cy.get('[data-cy="input-sku"]').type('67')
        cy.get('[data-cy="input-message_after_buy"]').type('se envia un 67 bien grande')
        cy.get('[data-cy="button-add-variant"]')
        cy.get('[data-cy="input-video-product"]').type('https://youtu.be/dQw4w9WgXcQ?si=AFKc6BNRI2w38iec')
        cy.get('[data-cy="button-add-variant"]').click()
        cy.get('[data-cy="button-add-variant-property"] > .p-ripple').click()
        cy.get('[data-cy="select-properties"] > .p-select-label').click()
        cy.get('#pn_id_80_0').click()
        cy.get('[data-cy="name-property"]').type('disponibles')
        cy.get(':nth-child(3) > .event').click()
        cy.get(':nth-child(5) > .event').click()
        cy.get('[data-cy="button-save-changes"] > .p-ripple').click()
        cy.get('[data-cy="button-add-variant-property"] > .p-ripple').click()
        cy.get('[data-cy="select-properties"] > .p-select-label').click()
        cy.get('#pn_id_80_1').click()
        cy.get(':nth-child(3) > .color').click()
        cy.get(':nth-child(5) > .color').click()
        cy.get('[data-cy="button-save-changes"] > .p-ripple').click()
        cy.get('[data-cy="button-add-variant-property"] > .p-ripple').click()/*/
})