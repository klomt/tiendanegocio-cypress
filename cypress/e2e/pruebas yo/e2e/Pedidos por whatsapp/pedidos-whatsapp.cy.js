const url = "http://192.168.0.61:3002/api/v1"

describe('codigo externo', () => {

  before(()=>{
    cy.registerUser();
  })

  beforeEach(()=>{
    cy.login();
  })
  it("input empty", () => {
    cy.visit("/configuraciones/whatsapp-venta");
     cy.get('[data-cy="input-whatsapp-number"]').clear()
    cy.get('[data-cy="textarea-message-whatsapp"]').clear()
    cy.get('[data-cy="button-save-changes-whatsapp"]').click({force: true})
    cy.get('.p-toast-message-content').should('be.visible')
  })
  it("input text  whatsapp", () => {
    cy.visit("/configuraciones/whatsapp-venta");
    cy.get('[data-cy="input-whatsapp-number"]').clear().type('11489623464')
    cy.get('[data-cy="textarea-message-whatsapp"]').clear().type('Merlusa')
    cy.get('[data-cy="button-save-changes-whatsapp"]').click()
  })
  it("input whatsapp large", () => {
    cy.visit("/configuraciones/whatsapp-venta");
    cy.get('[data-cy="input-whatsapp-number"]').clear().generateRandomNumber(1000)
    cy.get('[data-cy="button-save-changes-whatsapp"]').click()
    cy.get('.p-toast-message-content').should('not.exist')
  })
  it("input text large", () => {
    cy.visit("/configuraciones/whatsapp-venta");
    cy.get('[data-cy="textarea-message-whatsapp"]').clear().type('Merlusa').generateRandomText(1000)
    cy.get('[data-cy="button-save-changes-whatsapp"]').should('be.disabled')
  })
  it("input short", () => {
    cy.visit("/configuraciones/whatsapp-venta");
    cy.get('[data-cy="input-whatsapp-number"]').clear().type("1")
    cy.get('[data-cy="textarea-message-whatsapp"]').clear().type("a")
    cy.get('[data-cy="button-save-changes-whatsapp"]').click({force:true})
    cy.get('.p-toast-message-content').should('be.visible')
  })
  
})