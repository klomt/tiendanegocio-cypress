
const url = "http://192.168.0.61:3002/api/v1";

describe("Prueba de dominio", () => {

  before(() => {
    cy.registerUser({
        complete_tutorial: true,
        assign_design: true
    });
  });

  beforeEach(() => {
    cy.login();
  })

  it('Input too long',()=>{
    cy.visit('dominios')
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="input-url"]').generateRandomText(80)
    cy.get('[data-cy="button-create-domain"]').click()
  })

  it('Input correct',()=>{
    cy.visit('dominios')
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="input-url"]').generateRandomText(7,'www.','.com')
    cy.get('[data-cy="button-create-domain"]').click()
    cy.get('[data-cy="button-dialog-cancel"]').click()
    cy.get('[data-cy="button-delete"]').eq(0).click()
    cy.get('.p-confirmdialog-accept-button').click()

  })
 
  
  
})