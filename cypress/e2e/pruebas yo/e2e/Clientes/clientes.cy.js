const url = "https://paneltest.tiendanegocio.com/#/clientes"

const credentials = {};

describe("Clientes", () => {
  before(() => {
    cy.registerUser().then((newAdmin) => {
      credentials.email = newAdmin.email;
      credentials.password = newAdmin.password;
    });
  });
  beforeEach(() => {
    cy.login(credentials);
  });

  it("visit page", () => {
    cy.visit("/clientes");
  });
  it("add client", () => {
    cy.visit("/clientes").wait(4000);
    cy.get('[data-cy="button-create"]').filter(':visible').click();
    cy.get('[data-cy="input-email"]').type(generateRandomHash() + "@tiendanegocio.com");
    cy.get("#float-input-password").as("passInput");
    cy.get("@passInput").type("123456");
    cy.get('[data-cy="input-name"]').type("francisco");
    cy.get('[data-cy="input-lastname"]').type("rarug");
    cy.get('[data-cy="input-phone"]').type("11234567");
    cy.get('[data-cy="input-dni"]').type("456");
   cy.get('button[type="submit"]').click();
  });


 it("buscador correcto", () =>{
    cy.visit("/clientes");
    cy.get('.searchbar > .p-inputtext').click();
    cy.get('.searchbar > .p-inputtext').clear().type("francisco rarug");
  });


  
  it("buscador erroneo",() =>{

 cy.visit("/clientes");
  cy.get('[data-cy="button-create"]').filter(':visible').click();
    cy.get('[data-cy="input-email"]').type(generateRandomHash() + "@tiendanegocio.com");
    cy.get("#float-input-password").as("passInput");
    cy.get("@passInput").type("123456");
    cy.get('[data-cy="input-name"]').type("Lucia");
    cy.get('[data-cy="input-lastname"]').type("souto");
    cy.get('[data-cy="input-phone"]').type("11234567");
    cy.get('[data-cy="input-dni"]').type("456");
     cy.get('button[type="submit"]').should("not.be.disabled");


    cy.visit("/clientes");
    cy.get('.searchbar > .p-inputtext').click();
    cy.get('.searchbar > .p-inputtext').clear().type("Suto").wait(3000);
  });


  it("dni short", () => {
    incomeOfInputs()
    cy.get('[data-cy="input-dni"]').clear().type("456");
    cy.get('[data-cy="button-save"]').click();
    
  });
  it("dni large", () => {
    incomeOfInputs()
    cy.get('[data-cy="input-dni"]').clear().generateRandomNumber(100)
    cy.get('button[type="submit"]').should("be.disabled");
  });


  it("dni negative", () => {
    incomeOfInputs()
    cy.get('[data-cy="input-dni"]').clear().type('-4566115')
    cy.get('button[type="submit"]').should("be.disabled");
    
  });
  it("phone large", () => {
    incomeOfInputs()
    cy.get('[data-cy="input-phone"]').clear().generateRandomNumber(100)
    cy.get('button[type="submit"]').should("be.disabled");
    
  });
  it("phone negative", () => {
    incomeOfInputs()
    cy.get('[data-cy="input-phone"]').clear().type("-112345447");
    cy.get('button[type="submit"]').should("be.disabled");
    
  });
  it("password short", () => {

    cy.visit("/clientes");
  cy.get('[data-cy="button-create"]').filter(':visible').click();
    cy.get('[data-cy="input-email"]').type(generateRandomHash() + "@tiendanegocio.com");
    cy.get("#float-input-password").as("passInput");
    cy.get("@passInput").type("1");
    cy.get('[data-cy="input-name"]').type("francisco");
    cy.get('[data-cy="input-lastname"]').type("rarug");
    cy.get('[data-cy="input-phone"]').type("112345447");
    cy.get('[data-cy="input-dni"]').type("45655555");
   cy.get('button[type="submit"]').should("not.be.disabled");
  });
  it("password large", () => {
    cy.visit("/clientes");
  cy.get('[data-cy="button-create"]').filter(':visible').click();
    cy.get('[data-cy="input-email"]').type(generateRandomHash() + "@tiendanegocio.com");
    cy.get("#float-input-password").as("passInput");
    cy.get("@passInput").type("1dfggfgggffgfgffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd455444444444444444444444444444444444444444444ddddddddddddddddddddddddddddddddd");
    cy.get('[data-cy="input-name"]').type("francisco");
    cy.get('[data-cy="input-lastname"]').type("rarug");
    cy.get('[data-cy="input-phone"]').type("112345447");
    cy.get('[data-cy="input-dni"]').type("45655555");
    cy.get('button[type="submit"]').should("not.be.disabled");
    
  });
  it("simbol strange", () => {
    cy.visit("/clientes");
     cy.get('[data-cy="button-create"]').filter(':visible').click();
    cy.get('[data-cy="input-email"]').type(generateRandomHash() + "@tiendanegocio.com");
    cy.get("#float-input-password").as("passInput");
    cy.get("@passInput").type("⇢ ๑ ◞♡ ⸙͎ ˀˀ ♡");
    cy.get('[data-cy="input-name"]').type("francisco");
    cy.get('[data-cy="input-lastname"]').type("rarug");
    cy.get('[data-cy="input-phone"]').type("112345447");
    cy.get('[data-cy="input-dni"]').type("45655555");
     cy.get('button[type="submit"]').should("not.be.disabled");
    incomeOfInputs()
    cy.get('[data-cy="input-password"]').as("passInput");
    cy.get("@passInput").clear().type("1");
    cy.get('[data-cy="button-save"]').click();
  });
  it("password large", () => {
    incomeOfInputs()
    cy.get('[data-cy="input-password"]').as("passInput");
    cy.get("@passInput").clear().generateRandomText(100)
    cy.get('[data-cy="button-save"]').click();
    
  });
  it("simbol strange", () => {
    incomeOfInputs()
    cy.get('[data-cy="input-password"]').as("passInput");
    cy.get("@passInput").clear().type("⇢ ๑ ◞♡ ⸙͎ ˀˀ ♡");
    cy.get('[data-cy="button-save"]').click();

  });
  

  it("mail invalid", () => {
    incomeOfInputs()
    cy.get('[data-cy="input-email"]').clear().type(generateRandomHash() + "@.com");
    cy.get('button[type="submit"]').should("be.disabled");
  });
  it("empty required input email", () => {

    cy.visit("/clientes");
    cy.get('[data-cy="button-create"]').filter(':visible').click();
    incomeOfInputs()
    cy.get('[data-cy="input-email"]').clear();
    cy.get('button[type="submit"]').should("be.disabled");
    
  });
  it("empty required input name", () => {
    incomeOfInputs()

    cy.get('[data-cy="input-name"]').clear();
    cy.get('button[type="submit"]').should("be.disabled");
    
  });
  it("empty required inputs", () => {

    cy.visit("/clientes");
    cy.get('[data-cy="button-create"]').filter(':visible').click();
    incomeOfInputs()
    cy.get('[data-cy="input-email"]').clear();
    cy.get('[data-cy="input-name"]').clear();
    cy.get('button[type="submit"]').should("be.disabled");
    
  });

})
function generateRandomHash() {
    return (+new Date()).toString(36);
}

function incomeOfInputs(){
  cy.visit("/clientes");
  cy.get('[data-cy="button-create"]').first().click();
  cy.get('[data-cy="input-email"]').type(generateRandomHash() + "@tiendanegocio.com");
  cy.get('[data-cy="input-password"]').as("passInput");
  cy.get("@passInput").type("123456");
  cy.get('[data-cy="input-name"]').type("francisco");
  cy.get('[data-cy="input-lastname"]').type("rarug");
  cy.get('[data-cy="input-phone"]').type("11234567");
  cy.get('[data-cy="input-dni"]').type("456456133");
}