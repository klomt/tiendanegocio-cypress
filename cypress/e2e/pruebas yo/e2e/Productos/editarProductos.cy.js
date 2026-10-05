const url = "https://paneltest.tiendanegocio.com/#/"


describe('productos', () => {

  before(()=>{
    cy.registerUser();
  })
  beforeEach(()=>{
    cy.login();
  })
})
it('agregar producto', () => {

cy.visit("/productos/agregar")
cy.wait(2000)
cy.get('[data-cy="input-email"]').click().type('brisa@tiendanegocio.com')
cy.get('[data-cy="input-password"]').click().type('123456')
cy.get('[data-cy="button-save"]').click()
cy.wait(5000)
cy.visit("/productos/agregar")
cy.get('[data-cy="input-title"]').click().type('Farmaceutico')
cy.get('[data-cy="input-price"] .p-inputnumber-input').click().type('200')
cy.get('[data-cy="button-save"]').click()
})

it('cambiar nombre', () => {
cy.get('[data-cy="row-0"] > .last-column > .desktop > [data-cy="button-update"]').click()
cy.get('[data-cy="input-title"]').click().clear()
cy.get('[data-cy="input-title"]').click().type('Ibai')
cy.get('[data-cy="button-save"]').click()

})

it('nombre muy largo', () => {
cy.get('[data-cy="row-0"] > .last-column > .desktop > [data-cy="button-update"]').click()
cy.get('[data-cy="input-title"]').click().clear()
cy.get('[data-cy="input-title"]').click().type('quebonitosoyjejejujujojosoyespecial hernandez ledesma cabildo juramento antonio')
cy.get('[data-cy="button-save"]').click()
})

it('nombre corto', () => {
cy.get('[data-cy="row-0"]  > .last-column > .desktop > [data-cy="button-update"]').click()
cy.get('[data-cy="input-title"]').click().clear()
cy.get('[data-cy="input-title"]').click().type('R')
cy.get('[data-cy="button-save"]').click()
})

it('cambio de precio', () => {
cy.get('[data-cy="row-0"] > .last-column > .desktop > [data-cy="button-update"]').click()
cy.get('[data-cy="input-price"]').click().clear()
cy.get('[data-cy="input-price"]').click().type(10)
cy.get('[data-cy="button-save"]').click()
})
