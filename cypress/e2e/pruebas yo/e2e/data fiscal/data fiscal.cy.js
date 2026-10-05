const url = "http://192.168.0.61:3002/api/v1"

describe(' data fiscal', () => {

  before(()=>{
    cy.registerUser();
  })

  beforeEach(()=>{
    cy.login();
  })
  it("input empty", () => {
    cy.visit("/configuraciones/data-fiscal");
    cy.get("#datafiscal").as("dataf");
    cy.get("@dataf").type("sss").clear();
    cy.get('[data-cy="button-save"]').click();
    cy.get("p-toastitem").should("exist");
  })
  it("input large", () => {
    cy.visit("/configuraciones/data-fiscal");
    cy.get("#datafiscal").as("dataf");
    cy.get("@dataf").generateRandomText(1000)
    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="button-save"]').should("be.disabled")
  })
  it("input short", () => {
    cy.visit("/configuraciones/data-fiscal");  
    cy.get("#datafiscal").as("dataf");
    cy.get("@dataf").clear().type("s");
    cy.get('[data-cy="button-save"]').click();
    cy.get("p-toastitem").should("exist");
  })
  it("link in a input", () => {
    cy.visit("/configuraciones/data-fiscal");
    cy.get("#datafiscal").as("dataf");
    cy.get("@dataf").clear().type("https://www.youtube.com/watch?v=flpSr1TYp5o&list=RDflpSr1TYp5o&start_radio=1");
    cy.get('[data-cy="button-save"]').click();
    cy.get("p-toastitem").should("exist");
  })

})