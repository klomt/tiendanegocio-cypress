const url = "http://192.168.0.61:3002/api/v1";

describe("Orden de compra", () => {

  before(() => {
    cy.registerUser({
        complete_tutorial: true,
        assign_design: true
    });
  });

  beforeEach(() => {
    cy.login();
  })

  it('visit page',()=>{
    cy.visit('promociones')
    cy.url().should('include', 'promociones');
  })
  it('create promocion 2x1',()=>{
    cy.visit('promociones')
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="title"]').type('descuentito')
    cy.get('[data-cy="button-create"]').click()
  })

  it('create promocion discount in cart',()=>{
    titlePromotion()
    cy.get('[data-cy="type-promotion-4"]').click({force: true})
    cy.get('.p-inputnumber-input').eq(0).type('30000')
    cy.get('.p-inputnumber-input').eq(1).type('100')
    cy.get('[data-cy="button-create"]').click()
  })

  it('create promotion discount cant',()=>{
    titlePromotion()
    cy.get('[data-cy="type-promotion-2"]').click({force:true})
    cy.get('[data-cy="button-create"]').click()
  })

  it('create promotion discount progresive cant',()=>{
    titlePromotion()
    cy.get('[data-cy="type-promotion-3"]').click({force:true})
    cy.get('.p-inputnumber-input').eq(0).type('5')
    cy.get('.p-inputnumber-input').eq(1).type('15')
    cy.get('[data-cy="button-create"]').click()
  })
   
  it('Delete promotions', ()=>{
    cy.visit('promociones')
    cy.get('[data-cy="button-delete"]').first().click()
    cy.get('[data-cy="button-delete"]').first().click()
    cy.get('[data-cy="button-delete"]').first().click()
    cy.get('[data-cy="button-delete"]').first().click()
  })

})

function titlePromotion(){
  cy.visit('promociones')
  cy.get('[data-cy="button-create"]').click()
  cy.get('[data-cy="title"]').type('descuentito')
  cy.get('[data-cy="type-promotion"]').click()
}