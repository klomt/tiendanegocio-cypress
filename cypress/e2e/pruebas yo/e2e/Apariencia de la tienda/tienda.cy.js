const url = "https://paneltest.tiendanegocio.com/#/"
let img

describe('productos', () => {

  before(()=>{
    cy.registerUser();
  })
  beforeEach(()=>{
    cy.login();
  })
})
it('abrir tienda', () => {

cy.visit("/login")
cy.wait(2000)
cy.get('[data-cy="input-email"]').click().type('brisa@tiendanegocio.com')
cy.get('[data-cy="input-password"]').click().type('123456')
cy.get('[data-cy="button-save"]').click()
cy.wait(5000)
cy.visit("/configuraciones/diseno/editor")

})
it('logo y favicon', () => {

cy.visit("/login")
cy.wait(2000)
cy.get('[data-cy="input-email"]').click().type('brisa@tiendanegocio.com')
cy.get('[data-cy="input-password"]').click().type('123456')
cy.get('[data-cy="button-save"]').click()
cy.wait(5000)   
cy.visit("/configuraciones/diseno/editor")
cy.get('#containerBranding > :nth-child(2) > .nav-button').click()
cy.wait(2000)
    

cy.intercept({
        method: "POST",
        url: `${url}/gift/admin/image`,
      }).as("uploadRequest");
    cy.wait(2000);
    cy.get(':nth-child(2) > .thumbs > .thumb-wrapper > .thumb').attachFile("yuumi.jpg");
})


it('prueba color', () => {

 cy.visit("/login")
cy.wait(2000)
cy.get('[data-cy="input-email"]').click().type('brisa@tiendanegocio.com')
cy.get('[data-cy="input-password"]').click().type('123456')
cy.get('[data-cy="button-save"]').click()
cy.wait(5000)   
cy.visit("/configuraciones/diseno/editor")
cy.get('#containerBranding > :nth-child(3) > .nav-button').click()
cy.get('.presets > :nth-child(6)').click()
cy.get('#containerSave > [data-cy="button-save"]').click()
})

it('tipografia', () => {
cy.visit("/login")
cy.wait(2000)
cy.get('[data-cy="input-email"]').click().type('brisa@tiendanegocio.com')
cy.get('[data-cy="input-password"]').click().type('123456')
cy.get('[data-cy="button-save"]').click()
cy.wait(5000)   
cy.visit("/configuraciones/diseno/editor")
cy.get('#containerBranding > :nth-child(4) > .nav-button').click()
cy.get('[data-cy="select-font-primary"]').click()
cy.get('[data-cy="font-19"]').click();
cy.get('[data-cy="select-font-secondary"]').click()
cy.get('[data-cy="font-20"]').click();
cy.get('#containerSave > [data-cy="button-save"]').click()
})

it('encabezado', () => {
cy.visit("/login")
cy.wait(2000)
cy.get('[data-cy="input-email"]').click().type('brisa@tiendanegocio.com')
cy.get('[data-cy="input-password"]').click().type('123456')
cy.get('[data-cy="button-save"]').click()
cy.wait(5000)   
cy.visit("/configuraciones/diseno/editor")
cy.get('#containerSections > :nth-child(2) > .nav-button').click()
cy.get('[data-cy="select-color-header"]').click()
cy.get('[data-cy="select-color-header"] .p-select-option').eq(3).click()
cy.get('[data-cy="checkbox-is_fixed"]').click()
cy.get('[data-cy="checkbox-above_carrousel"]').click()
cy.get('[data-cy="checkbox-visible_message"]').click()
cy.get('[data-cy="checkbox-second_visible_message"]').click()
cy.get('#containerSave > [data-cy="button-save"]').click()
})

it('pagina de inicio', () => {
cy.visit("/login")
cy.wait(2000)
cy.get('[data-cy="input-email"]').click().type('brisa@tiendanegocio.com')
cy.get('[data-cy="input-password"]').click().type('123456')
cy.get('[data-cy="button-save"]').click()
cy.wait(5000)   
cy.visit("/configuraciones/diseno/editor")
cy.get('#containerSections > :nth-child(3) > .nav-button').click()
cy.get('[data-cy="button-add-section"]').click()
/*informacion de compra*/
cy.get('[data-cy="button-add-section-9"]').click()
cy.get('[data-cy="select-quantity-items"]').click()
cy.get('.p-select-option').eq(1).click()

cy.get('[data-cy="select-icon-1"]').click()
cy.get('.p-select-option').eq(1).click()

cy.get('[data-cy="select-icon-2"]').click()
cy.get('.p-select-option').eq(0).click()

cy.get('#containerSave > [data-cy="button-save"]').click()
})