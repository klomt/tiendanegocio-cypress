const url = "https://paneltest.tiendanegocio.com/#/dashboard"
const credentials = {};

describe("Tutorial paso por paso", () => {
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
    cy.visit("/dashboard");
  });

  it("page choose your design", () => {
    cy.visit("/lista-de-disenos");

    cy.get('[data-cy="item-3"]').as("buttonInput");
    cy.get("@buttonInput")
      .realHover("mouse")
      .wait(4000)
      .find('[data-cy="button-create"]')
      .click();

    cy.get('[data-cy="dialog-congratulation"]').as("alertError");
  });

  it("page categories", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="button-create"]').click();
    cy.get('[data-cy="input-category"]')
    .as("categoryInput");
    cy.get("@categoryInput").type("fffffffff");
    cy.get('[data-cy="button-save"]').click();

    cy.get('[data-cy="dialog-congratulation"]').as("alertError");
  });

  it("page add products", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').as("nombreInput");
    cy.get("@nombreInput").type("remeras");

    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-congratulation"]').as("alertError");
  });

  it("page shipping methods", () => {
    cy.visit("/configuraciones/envios");
    cy.get('[data-cy="method-custom"]').click();

    cy.get('[data-cy="input-title"]').as("nombreInput");
    cy.get("@nombreInput").type("avellaneda");

    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-congratulation"]').as("alertError");
  });

  it("page payment methods", () => {
    cy.visit("/configuraciones/metodosdepago");
    cy.get('[data-cy="method-0"]').click();
    cy.get('[data-cy="button-save"]').click();

    cy.get('[data-cy="dialog-congratulation"]').as("alertError");
  });
});
