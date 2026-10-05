const url = "https://paneltest.tiendanegocio.com/#/general/colores"

const credentials = {};

describe("Colors de la tienda", () => {
  before(() => {
    cy.registerUser().then((newAdmin) => {
      credentials.email = newAdmin.email;
      credentials.password = newAdmin.password;
    });
  });

  beforeEach(() => {
    cy.login(credentials);

    cy.visit("/configuraciones/diseno/editor");

    cy.visit("/configuraciones/diseno/editor");
    cy.wait(3000);
    cy.visit("/configuraciones/diseno/editor/color");
  });
  
  it("Diseño listo", () => {
    cy.get('[data-cy="button-ok"]').click();
  });


  it("add color", () => {
    cy.get('[data-cy="button-show"]').click();
    cy.get(".preset").first().click().wait(2000);
    cy.get(".preset").last().click().wait(2000);
    
  });

  it("Color Primary", () => {
    let colores = ["#f30d0d","#a10df3","#f30d91","#0df327","#143516","#f7e32d","#fc713c","#3ce3fc"]
      let rand = Math.floor(Math.random()*colores.length);
      let rValue = colores[rand];
    cy.get('[data-cy="color_primary"]').click();
    cy.get(".picker_editor").find("input").clear().invoke("val", rValue).trigger('input');
    Okcolor();
    cy.get('[data-cy="button-save"]').first().click();
    visit()
    cy.get('[data-cy="color_primary"]').wait(3000).click();
    cy.get(".picker_editor").find("input").should('have.value', rValue);
  
  });


  it("Contrast primary", () => {
    let colores = ["#f30d0d","#a10df3","#f30d91","#0df327","#143516","#f7e32d","#fc713c","#3ce3fc"]
      let rand = Math.floor(Math.random()*colores.length);
      let rValue = colores[rand];
    cy.get('[data-cy="color_contrast_primary"]').click();
    cy.get(".picker_editor").find("input").clear().invoke("val", rValue).trigger('input');
    Okcolor();
    cy.get('[data-cy="button-save"]').first().click();
    visit()
    cy.get('[data-cy="color_contrast_primary"]').wait(3000).click();
    cy.get(".picker_editor").find("input").should('have.value', rValue);
    
  }); 
 
  it("Color secondary", () => {
    let colores = ["#f30d0d","#a10df3","#f30d91","#0df327","#143516","#f7e32d","#fc713c","#3ce3fc"]
      let rand = Math.floor(Math.random()*colores.length);
      let rValue = colores[rand];
    cy.get('[data-cy="color_secondary"]').click();
    cy.get(".picker_editor").find("input").clear().invoke("val", rValue).trigger('input');
    Okcolor();
    cy.get('[data-cy="button-save"]').first().click();
    visit()
    cy.get('[data-cy="color_secondary"]').wait(3000).click();
    cy.get(".picker_editor").find("input").should('have.value', rValue);
    
  });

  it("Contrast secondary", () => {
    let colores = ["#f30d0d","#a10df3","#f30d91","#0df327","#143516","#f7e32d","#fc713c","#3ce3fc"]
      let rand = Math.floor(Math.random()*colores.length);
      let rValue = colores[rand];
    cy.get('[data-cy="color_contrast_secondary"]').click();
    cy.get(".picker_editor").find("input").clear().invoke("val", rValue).trigger('input');
    Okcolor();
    cy.get('[data-cy="button-save"]').first().click();
    visit()
    cy.get('[data-cy="color_contrast_secondary"]').wait(3000).click();
    cy.get(".picker_editor").find("input").should('have.value', rValue);
    
  });

  it("Text primary", () => {
    let colores = ["#f30d0d","#a10df3","#f30d91","#0df327","#143516","#f7e32d","#fc713c","#3ce3fc"]
      let rand = Math.floor(Math.random()*colores.length);
      let rValue = colores[rand];
    cy.get('[data-cy="color_text_primary"]').click();
    cy.get(".picker_editor").find("input").clear().invoke("val", rValue).trigger('input');
    Okcolor();
    cy.get('[data-cy="button-save"]').first().click();
    visit()
    cy.get('[data-cy="color_text_primary"]').wait(3000).click();
    cy.get(".picker_editor").find("input").should('have.value', rValue);
    
  });

  //No hay un color secundario para el texto
  /*
  it("Text secondary", () => {
      let colores = ["#f30d0d","#a10df3","#f30d91","#0df327","#143516","#f7e32d","#fc713c","#3ce3fc"]
      let rand = Math.floor(Math.random()*colores.length);
      let rValue = colores[rand];
    cy.get('[data-cy="color_text_secondary"]').click();
    cy.get(".picker_editor").find("input").clear().invoke("val", rValue).trigger('input');
    Okcolor();
    cy.get('[data-cy="button-save"]').first().click();
    visit()
    cy.get('[data-cy="color_text_secondary"]').wait(3000).click();
    cy.get(".picker_editor").find("input").should('have.value', rValue);
    
  });
  */
  //funciones

  function Okcolor() {
    cy.get(".picker_done").find("button").click().wait(1000);
  }

function visit(params) {
  cy.wait(3000)
  cy.visit("/configuraciones/diseno/editor/color");
}

 
});
