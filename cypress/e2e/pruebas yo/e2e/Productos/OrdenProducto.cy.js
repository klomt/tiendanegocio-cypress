const url = "https://paneltest.tiendanegocio.com/#/productos/agregar"


//it("inicio de sesion", () => {

 //cy.visit("/productos/agregar");
//cy.get('[data-cy="input-email"]').type("test123@tiendanegocio.com")
//cy.get('[data-cy="input-password"]').type("test123")
//cy.get('[data-cy="button-save"]').click

//})
describe('Orden de producto', () => {

  before(()=>{
    cy.registerUser();
  })

  beforeEach(()=>{
    cy.login();
  })
  it("visit page", () => {
    cy.visit("/productos/agregar");
  })


  it("agregar producto", () => {
  cy.visit("/productos/agregar");
cy.get('[data-cy="input-title"]').type("producto1")
cy.get('[data-cy="input-price"] .p-inputnumber-input').type("200")
cy.get('[data-cy="button-save"]').click()
cy.wait(2000)
cy.get('[data-cy="button-ok"]').click()
cy.get('.header-buttons > .p-button-info').click()
cy.get('[data-cy="input-title"]').type("producto2")
cy.get('[data-cy="input-price"] .p-inputnumber-input').type("400")
cy.get('[data-cy="button-save"]').click()
  })

  it("agregar categoria", () => {
  cy.visit("/categorias");
  cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="input-category"]').type("f")
    cy.get('[data-cy="button-save"]').click()
    cy.get("p-toastitem").as("alertok");
    cy.get("@alertok");
    cy.wait(2000)
    
  })
  
  it('mas viejo a mas nuevo', () => {
    cy.visit("/productos/orden");
    cy.get('.ng-untouched.ng-star-inserted > .p-field > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').click()
    cy.get('[data-cy="type-2"]').click()
    cy.get('[data-cy="button-export"]').click()
    cy.get('.page-header > .p-button-primary').click()
  })

  it('mayor a menor ', () => {
    //mayor a menor
    cy.visit("/productos/orden");
    cy.get('.ng-valid.ng-star-inserted > .p-field > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').click()
    cy.get('[data-cy="type-3"]').click();
    cy.get('[data-cy="button-export"]').click()
    cy.get('.page-header > .p-button-primary').click()
  })

it('menor a mayor', () => {
//menor a mayor
   cy.visit("/productos/orden");
   cy.get('.ng-valid.ng-star-inserted > .p-field > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').click()

   cy.get('[data-cy="type-4"]').should('be.visible').click()
   cy.wait(2000)
   cy.get('[data-cy="button-export"]').click()
   cy.wait(4000)
   cy.get('.page-header > .p-button-primary').click()
   cy.wait(2000)
})

it('A-Z', () => {
 cy.visit("/productos/orden");
 cy.get('.ng-pristine.ng-star-inserted > .p-field > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').click()
 cy.get('.p-dropdown-items-wrapper') .scrollTo('bottom')

cy.get('[data-cy="type-5"]').should('be.visible').click()

  cy.get('[data-cy="button-export"]').click()
  cy.wait(4000)
  cy.get('.page-header > .p-button-primary').click()
  cy.wait(2000)

})

it('Z-A', () => {
   cy.visit("/productos/orden");
cy.get('.ng-pristine.ng-star-inserted > .p-field > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').click()
 cy.get('.p-dropdown-items-wrapper') .scrollTo('bottom')
cy.get('[data-cy="type-6"]').should('be.visible').click()
  cy.wait(2000)
  cy.get('[data-cy="button-export"]').click()
  cy.wait(4000)
  cy.get('.page-header > .p-button-primary').click()
  cy.wait(2000)
})

it('Ordenado manualmente', () => {

 cy.visit("/productos/orden");
cy.get('.ng-pristine.ng-star-inserted > .p-field > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').click()
 cy.get('.p-dropdown-items-wrapper') .scrollTo('bottom').click()

cy.get('[data-cy="type-7"]').should('be.visible').click()
  cy.wait(2000)
  cy.get('[data-cy="button-export"]').click()
  cy.wait(4000)
  cy.get('.page-header > .p-button-primary').click()
  cy.wait(2000)



})
it('mas nuevo a mas viejo', () => {
//mas nuevo al mas viejo
  cy.visit("/productos/orden");
  cy.get('.ng-valid.ng-star-inserted > .p-field > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').click()
  cy.get('[data-cy="type-1"]').should('be.visible').click()
  cy.wait(2000)
  cy.get('[data-cy="button-export"]').click()
  cy.wait(4000)
  cy.get('.page-header > .p-button-primary').click()
  cy.wait(2000)
})




it('categoria ordenar', () => {  
    cy.visit("/productos/orden");
    cy.wait(4000)

cy.get(':nth-child(5) > .ng-untouched > .p-dropdown > .p-dropdown-trigger').click()
cy.wait(6000)
cy.get(':nth-child(2) > .p-dropdown-item').click()
cy.wait(6000)
cy.get(':nth-child(5) > .ng-untouched > .p-dropdown > .p-dropdown-trigger').click()
cy.wait(6000)
cy.get(':nth-child(1) > .p-dropdown-item').click()
cy.wait(6000)
})

it('prodcutos sin stock', () => {
   cy.visit("/productos/orden");
cy.get(':nth-child(2) > .ng-valid > .p-radiobutton > .p-radiobutton-box').click()
cy.wait(2000)
cy.get(':nth-child(1) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click()

  cy.get('[data-cy="button-export"]').click()
  cy.wait(4000)

cy.get('.page-header > .p-button-primary').click()
cy.wait(2000)
})

})
