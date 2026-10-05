const url = "http://192.168.0.61:3002/api/v1";

describe("Tipo de letra", () => {

  before(() => {
    cy.registerUser({
      assign_design: true
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it("check if first dropdown works", () => {
    cy.visit("configuraciones/diseno/editor");
    cy.wait(3500);
    cy.visit("configuraciones/diseno/editor/fuente");
    cy.get('[data-cy="select-font-primary"]').click();
    cy.wait(1000);
    cy.get(".p-overlay").should("exist");
  });

  it("check if second dropdown works", () => {
    cy.visit("configuraciones/diseno/editor");
    cy.wait(3500);
    cy.visit("configuraciones/diseno/editor/fuente");
    cy.get('[data-cy="select-font-secondary"]').click();
    cy.get(".p-overlay").should("exist");
  });

  it("check if primary font is successfully applied", () => {
    cy.visit("configuraciones/diseno/editor");
    cy.wait(3500);
    cy.visit("configuraciones/diseno/editor/fuente");
    cy.get('[data-cy="select-font-primary"]').click();
    cy.get('[data-cy="font-19"]').click();
    cy.get('[data-cy="button-save"]').first().click();
    cy.reload();
    cy.visit("configuraciones/diseno/editor/fuente");
    cy.get('[data-cy="font-active-19"]').should("exist");
  });

  it("check if secondary font is successfully applied", () => {
    cy.visit("configuraciones/diseno/editor");
    cy.wait(3500);
    cy.visit("configuraciones/diseno/editor/fuente");
    cy.get('[data-cy="select-font-secondary"]').click();
    cy.get('[data-cy="font-20"]').click();
    cy.get('[data-cy="button-save"]').first().click();
    cy.reload();
    cy.visit("configuraciones/diseno/editor/fuente");
    cy.get('[data-cy="font-active-20"]').should("exist");
  });


});
