const url = "https://apitest.tiendanegocio.com/api/v1";

describe('Prueba de ejemplo', () => {

  before(()=>{
    cy.registerUser();
  })

  beforeEach(()=>{
    cy.login();
  })

  //Pruebas de ejemplo
  it("Check page", ()=>{
    
    cy.url().should('include', '/dashboard');

    cy.addClient();
    cy.addClientRequest();

    cy.visit('/clientes');

  })

})