const url = "http://192.168.0.61:3002/api/v1"

describe('Prueba de andreani', () => {

  before(()=>{
    cy.registerUser();
  })
  beforeEach(()=>{
    cy.login();
  })
  it("Inputs empty", () =>{
    cy.visit("/configuraciones/envios");
    cy.get('[data-cy="method-andreani"]').click()
    cy.get('[label="Ya tengo una cuenta"]').click() 
    cy.get('.p-button-success').first().click()
    cy.get('.p-button-success').first().click()
    cy.get('.p-toast-message-content').should('be.visible')
  })

  it("correct data", () => {
    cy.visit("/configuraciones/envios");
    cy.get('[data-cy="method-andreani"]').click()
    cy.get('[label="Ya tengo una cuenta"]').click()
    cy.get('[data-cy="username-andreani"]').type('Pepe123')
    cy.get('[data-cy="passwword-andreani"]').type('12345678')
    cy.get('[data-cy="account_nro-andreani"]').type('123456')
    cy.get('[data-cy="contract_sp-andreani"]').type('654321')
    cy.get('[data-cy="contract_ss-andreani"]').type('987654')
    cy.get('[data-cy="pickup-options"]').click() 
    cy.get('[data-cy="pickup-10071"]').click()
    cy.get('.p-button-success').first().click()
    cy.wait(2000)
    cy.get('.p-dialog-close-button').click()
    cy.wait(2000)
   
  })

  it("incorrect data", () => {
    cy.visit("/configuraciones/envios");
    cy.get('.p-dialog-close-button').click()
    cy.get('[data-cy="button-delete"]').click()
    cy.get('.p-button-danger').last().click()
    cy.get('[data-cy="method-andreani"]').click()
    cy.get('[label="Ya tengo una cuenta"]').click()
    cy.get('[data-cy="username-andreani"]').clear().type('@@@@@@@@@!#@!#!@')
    cy.get('[data-cy="passwword-andreani"]').clear().type('#@!#!!@#!')
    cy.get('[data-cy="account_nro-andreani"]').clear().type('#@!#!@!#')
    cy.get('[data-cy="contract_sp-andreani"]').clear().type('#!@#!@')
    cy.get('[data-cy="contract_ss-andreani"]').clear().type('#!@#!@#')
    cy.get('.p-button-success').first().click()
    cy.get('.p-toast-message-content').should('be.visible')
    //cy.get('.p-button-success').first().should('be.disabled) deberia estar deshabilitado el boton
    
  })
  
  it("Password too long", () =>{
    cy.visit("/configuraciones/envios");
    cy.get('.p-dialog-close-button').click()
    cy.get('[data-cy="button-edit"]').click()
    cy.get('[data-cy="passwword-andreani"]').clear().generateRandomNumber(100)
    cy.get('.p-button-success').first().click()
    cy.get('.p-toast-message-content').should('be.visible')
  })

  it("Username too long", () =>{
    cy.visit("/configuraciones/envios");
    cy.get('.p-dialog-close-button').click()
    cy.get('[data-cy="button-edit"]').click()
    cy.get('[data-cy="username-andreani"]').clear().generateRandomText(100)
    cy.get('.p-button-success').first().click()
    cy.get('.p-toast-message-content').should('be.visible')
  })

  it("number client too long", () =>{
    cy.visit("/configuraciones/envios");
    cy.get('.p-dialog-close-button').click()
    cy.get('[data-cy="button-edit"]').click()
    cy.get('[data-cy="account_nro-andreani"]').clear().generateRandomNumber(100)
    cy.get('.p-button-success').first().click()
    cy.get('.p-toast-message-content').should('be.visible')
  })

  it("numero de contrato sucursal a domicilio too long", () =>{
    cy.visit("/configuraciones/envios");
    cy.get('.p-dialog-close-button').click()
    cy.get('[data-cy="button-edit"]').click()
    cy.get('[data-cy="contract_sp-andreani"]').clear().generateRandomNumber(100)
    cy.get('.p-button-success').first().click()
    cy.get('.p-toast-message-content').should('be.visible')
  })

  it("numero de contrato sucursal a sucursal too long", () =>{
    cy.visit("/configuraciones/envios");
    cy.get('[data-cy="button-edit"]').click()
    cy.get('[data-cy="contract_ss-andreani"]').generateRandomNumber(100)
    cy.get('.p-button-success').first().click()
    cy.get('.p-toast-message-content').should('be.visible')
  })
  
  it("Costos correct data", () =>{
    cy.visit("/configuraciones/envios");
    cy.get('.p-dialog-close-button').click()
    cy.get('[data-cy="button-edit"]').click()
    cy.get('[data-cy="checkbox-is-free"]').click()
    cy.get('[data-cy="input-minPriceFree"]').clear().type('10000')
    cy.get('[data-cy="input-price"]').clear().type('1000')
    cy.get('[data-cy="input-percentage"]').clear().type('10')
    cy.get('.p-button-success').first().click()
     cy.get('.p-toast-message-content').should('be.visible')
  })  
  it("Costos long data", () =>{
    cy.visit("/configuraciones/envios");
    cy.get('.p-dialog-close-button').click()
    cy.get('[data-cy="button-edit"]').click()
    cy.get('[data-cy="input-minPriceFree"] > .p-inputtext').clear().generateRandomNumber(100)
    cy.get('[data-cy="input-price"]').clear().generateRandomNumber(100)
    cy.get('[data-cy="input-percentage"]').clear().generateRandomNumber(100)
    cy.get('.p-button-success').first().click() 
    cy.get('.p-toast-message-content').should('be.visible')
  }) 
  
 
})


 