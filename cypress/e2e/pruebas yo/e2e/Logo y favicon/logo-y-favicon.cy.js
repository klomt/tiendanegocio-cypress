const url = "http://192.168.0.61:3002/api/v1";

describe("Logo y favicon", () => {
  before(() => {
    cy.registerUser();
  });

  beforeEach(() => {
    cy.login();
  });

  it("Que pasa si no agrego nada", () => {
    seleccionarDiseño("button-create");
    cy.visit("configuraciones/diseno/editor/logo");
    cy.get('[data-cy="button-ok"]').click();
    cy.get('[data-cy="button-save"').first().click();
    cy.get(".p-toast.p-component.p-toast-top-center").should("exist");
  });

  it("Que pasa si no agrego un logo", () => {
    seleccionarDiseño("button-edit");
    cy.visit("configuraciones/diseno/editor/logo");
    cy.get('[data-cy="input-inner-upload"]').last().attachFile("yuumi.jpg");
    cy.wait(5000);
    cy.get('.p-button-success').first().click();
    cy.get('[data-cy="button-save"').first().click();
    cy.get(".thumbs").last().should("have.css", "background-image");
  });
  it("Que pasa si no agrego un favicon", () => {
    seleccionarDiseño("button-edit");
    cy.visit("configuraciones/diseno/editor/logo");
    cy.get('[data-cy="input-inner-upload"]').first().attachFile("yuumi.jpg");
    cy.wait(5000);
    cy.get('.p-button-success').first().click();

    cy.get('[data-cy="button-save"').first().click();
    cy.intercept({
      method: "PUT",
      url: `${url}/api/v1/dynamic/config/general`,
    }).as("uploadRequest").then (() => {
        cy.iframeDesign().find(".logo_image").should("exist")  
      }
    )
    
  });

  it("Comprobar que el tamaño del logo cambie el la pagina", () => {
    seleccionarDiseño("button-edit");
    cy.visit("configuraciones/diseno/editor/logo");
    cy.visit("configuraciones/diseno/editor/logo");
    cy.get('[data-cy="input-inner-upload"]').first().attachFile("yuumi.jpg");
    cy.get('.p-button-success').first().click();
    for (let i = 0; i < 4; i++) {
      cy.get(".p-slider-handle.ng-star-inserted").click().type("{leftArrow}");
    }
    cy.iframeDesign()
      .find(".logo_image")
      .should("have.css", "max-width", "100px");
  });

  /* it("Que pasa si alguno de los archivos es muy grande", () => {
        seleccionarDiseño('button-edit');
        cy.visit('configuraciones/diseno/editor/logo');
        cy.get('[data-cy="input-inner-upload"]').last()
        .attachFile('pesada.jpg'); 
        cy.get('.p-toast.p-component.p-toast-top-center').should('exist');

      }) */

  function seleccionarDiseño(datacy) {
    cy.visit("/lista-de-disenos");
    cy.get('[data-cy="item-3"]').as("buttonInput");
    cy.get("@buttonInput")
      .realHover("mouse")
      .find(`[data-cy="${datacy}"]`)
      .click({force: true});
  }
});
