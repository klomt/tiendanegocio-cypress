const url = "http://192.168.0.61:3002/api/v1";

describe("Clientes", () => {

  before(()=>{
    cy.registerUser();
  })
  beforeEach(()=>{
    cy.login();
  })

  it("visit page", () => {
    cy.visit("/configuraciones/metodosdepago");
  });
  it("empty payway", () => {
    cy.visit("/configuraciones/metodosdepago");
    cy.get('[data-cy="button-payway"]').click();
    cy.get('[data-cy="input-public_apikey"]').clear();
    cy.get('[data-cy="input-private_apikey"]').clear();
    cy.get('[data-cy="input-id_site"]').clear();
    cy.get('[data-cy="input-id_template"]').clear();
    cy.get('button[type="submit"]').click().should("be.disabled");
  });
  it("payway", () => {
    cy.visit("/configuraciones/metodosdepago");
    cy.get('[data-cy="button-payway"]').click();
    cy.get('[data-cy="input-public_apikey"]').type("11111111111111");
    cy.get('[data-cy="input-private_apikey"]').type("11111111111111");
    cy.get('[data-cy="input-id_site"]').type("11111111111111");
    cy.get('[data-cy="input-id_template"]').type("11111111111111");
    cy.get('[data-cy="button-save"]').click(); 
  });

  it("efectivo", () => {
    cy.visit("/configuraciones/metodosdepago");
    cy.get('[data-cy="method-0"]').click();
    inputs('Efectivo') 
  });
  it("empty efectivo", () => {
    cy.visit("/configuraciones/metodosdepago");
    cy.get('[data-cy="method-0"]').click();
    cy.get('[data-cy="input-title"]').clear();
    cy.get('[data-cy="input-message"]').clear();
    cy.get('[data-cy="input-message_process"]');
    cy.get('[data-cy="input-discount_rate"]') .find("input").clear();
    cy.get('button[type="submit"]').should("be.disabled");
  });
  it("transferencia bancaria", () => {
    cy.visit("/configuraciones/metodosdepago");
    cy.get('[data-cy="method-1"]').click();
    inputs('Transferencia Bancaria')
  });

  it("acordar con el vendedor", () => {
    cy.visit("/configuraciones/metodosdepago");
    cy.get('[data-cy="method-2"]').click();
    inputs('Acuerdo con pepito')
  });

  it("personalizado", () => {
    cy.visit("/configuraciones/metodosdepago");
    cy.get('[data-cy="method-3"]').click();
    inputs('Personalizado')
  });

  it("ingreso duplicado", () => {
    cy.visit("/configuraciones/metodosdepago");
    cy.get('[data-cy="method-0"]').click();
    inputs('Efectivo')
  });

  it("button edit", () => {
    cy.visit("/configuraciones/metodosdepago");
    for(let i=0; i<7;i++){
        edit(); 
    }
    
  }) 

 it("button delete", () => {
    cy.visit("/configuraciones/metodosdepago");
    for(let i=0; i<6;i++){
        delbutton(); 
    }
    
  }); 

  function edit(){
    cy.get('[data-cy="button-edit"]').first().click(); 
    cy.get('[data-cy="button-save"]').click(); 
    cy.wait(2000);

  }
  function delbutton(){
    cy.get('[data-cy="button-delete"]').first().click({force: true}); 
    cy.get('.p-confirmdialog-accept-button').click(); 
    cy.wait(2000);

  }
  function inputs(title){
    cy.get('[data-cy="input-title"]').clear().type(title);
    cy.get('[data-cy="input-message"]').clear().type("si tu me lo pides yo me porto bonitoo");
    cy.get('[data-cy="input-message_process"]').clear().type("yeah yeah yeah");
    cy.get('[data-cy="input-discount_rate"]').find("input").type("50");
    cy.get('[data-cy="button-save"]').click(); 
  }
})
