/// <reference types="cypress"/>
describe('Diseno', () =>{
    Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Script error")) {
    return false;
  }
});
    beforeEach(()=>{
        cy.login('', ''); 
        cy.visit('https://panel.tiendanegocio.com/#/configuraciones/diseno/editor/inicio')
        cy.intercept('GET', 'https://api.tiendanegocio.com/api/v1/menu/admin').as('datosCargados');
        cy.wait('@datosCargados');

    })
    it('Logo y Favicon', () =>{
        cy.get('[data-cy="button-logo"] > .nav-button').click()
        cy.get(':nth-child(2) > .thumbs > .thumb-wrapper > .thumb').should('be.visible')
        cy.get(':nth-child(4) > .thumbs > .thumb-wrapper > .thumb').should('be.visible')

    })
    it('Colores tu tienda', () =>{
        cy.get('[data-cy="button-color"] > .nav-button').should('be.visible').click()
        cy.get('[data-cy="button-show"]').should('be.visible').click()
        cy.get('.presets > :nth-child(11)').scrollIntoView().should('be.visible').click()
        cy.get('[data-cy="button-show"]').scrollIntoView().click()
        cy.get('[data-cy="color_primary"] > .picker').scrollIntoView().click()
        cy.get('.picker_sl').should('be.visible')
        cy.get('.picker_done > button').click()
        cy.get('#pn_id_8 > .p-select-label').click()
        cy.get('#pn_id_8_2').should('be.visible').click()
        cy.get('#pn_id_8 > .p-select-label').click()
        cy.get('#pn_id_8_3').should('be.visible').click()
        cy.get('[data-cy="color_header_bg"] > .picker > .picker-text > .picker-text-title').should('be.visible')
        cy.get('#pn_id_10 > .p-select-label').click()
        cy.get('#pn_id_10_2').should('be.visible').click()
        cy.get('#pn_id_10 > .p-select-label').click()
        cy.get('#pn_id_10_3').should('be.visible').click()
        cy.get(':nth-child(5) > [data-cy="color_header_bg"] > .picker > .picker-text > .picker-text-title').should('be.visible')
        cy.get('#pn_id_12 > .p-select-label').click()
        cy.get('#pn_id_12_2').should('be.visible').click()
        cy.get('#pn_id_12 > .p-select-label').click()
        cy.get('#pn_id_12_3').should('be.visible').click()
        cy.get('[data-cy="button-back"]').click()
        
    })
    it('Tipo de letra/iconos', () =>{
        cy.get('[data-cy="button-font"] > .nav-button').click()
        cy.get('.ng-untouched.ng-star-inserted').should('be.visible')
        cy.get('.ng-untouched.ng-star-inserted > :nth-child(2)').click()
        cy.get('.ng-untouched.ng-star-inserted > :nth-child(3)').click()
        cy.get('.ng-untouched.ng-star-inserted > :nth-child(4)').click()
        cy.get('[data-cy="button-show"]').click()
        cy.get('.ng-submitted > :nth-child(7)').scrollIntoView().should('be.visible').click()
    })
    it('Encabezado', () =>{
        cy.get('[data-cy="button-header"] > .nav-button').click()
        cy.get('.ng-untouched.ng-star-inserted').should('be.visible')
        cy.get('.p-select-label').click()
        cy.get('#pn_id_8_1').should('be.visible')
        cy.get('#pn_id_8_2').should('be.visible').click()
        cy.get('.p-select-label').click()
        cy.get('#pn_id_8_3').should('be.visible').click()
        cy.get('[data-cy="color_header_bg"] > .picker').should('be.visible').click()
        cy.get('.picker_done > button').should('be.visible').click()
        cy.get('[data-cy="color_header_text"] > .picker').click()
        cy.get('[data-cy="color_header_text"] > .picker > #picker > .picker_wrapper > .picker_done > button').should('be.visible').click()
        cy.get('[data-cy="checkbox-is_fixed"] > .p-checkbox').scrollIntoView().click()
        cy.get('.ng-valid.ng-star-inserted > :nth-child(5)').click()
        cy.get('.field-checkbox.ng-star-inserted').should('be.visible').click()
        cy.get('.ng-valid.ng-star-inserted > :nth-child(5)').click()
    })/*/
    it('Tarjeta de producto', () =>{

    })
    it('Pie de pagina', () =>{

    })
    it('Cambiar diseno', () =>{

    })
    afterEach('Eliminar seccion agregada',()=>{
        
    })/*/
})