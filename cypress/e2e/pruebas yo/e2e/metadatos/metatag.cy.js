const url = "http://192.168.0.61:3002/api/v1";
const credentials = {};

describe("Metadatos", () => {
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
    cy.visit("/configuraciones/metatag");
    cy.url().should("include", "/configuraciones/metatag");
  });

  it("submit without filling inputs", () => {
    cy.visit("/configuraciones/metatag");
    cy.get("#seo_title").clear();
    cy.get('[data-cy="button-save"]').click();
    cy.get(".p-toast").should("exist");
  });
  it("check behaviour when title is too long", () => {
    cy.visit("/configuraciones/metatag");
    cy.get("#seo_title").generateRandomText(100)
    cy.get('[data-cy="button-save"]').should("be.disabled");
  });
  it("check behaviour when description is too long", () => {
    cy.visit("/configuraciones/metatag");
    cy.get("#seo_description").generateRandomText(1000)
    cy.get('[data-cy="button-save"]').should("be.disabled");
  });

  it("check behaviour when both inputs are correct", () => {
    cy.visit("/configuraciones/metatag");
    cy.get("#seo_title").type("situmelopiiide");
    cy.get("#seo_description").type("yomepoltobonito");
    cy.get('[data-cy="button-save"]').click();
    cy.get(".p-toast").should("exist");
  });
});
