const url = "https://paneltest.tiendanegocio.com/#/inicio"

describe("Inicio de sesion", () => {
  beforeEach(() => {-
    cy.visit("/login");
  });

  it("visit page", () => {
    cy.visit("/login");
  });
  it("successful login", () => {
    cy.get('[data-cy="input-email"]').type("pruebaslogin@tiendanegocio.com")
    cy.get("#float-input-password").type("neverita")
    cy.get("button[type=submit]").click();
  });
  it("wrong email", () => {
    cy.get('[data-cy="input-email"]').type("pruebaslogin@tiendanegocio.com.ar")
    cy.get("#float-input-password").type("neverita")
    cy.get("button[type=submit]").click();
   alert()
  });
  it("incorrect password", () => {
    cy.get('[data-cy="input-email"]').type("pruebaslogin@tiendanegocio.com")
    cy.get("#float-input-password").type("queseyo")
    cy.get("button[type=submit]").click();
   alert()
  });
  it("whitespace", () => {
    cy.get('[data-cy="input-email"]').type("pruebas login @tiendanegocio .com")
    cy.get("#float-input-password").type("neve rita")
    cy.get("button[type=submit]").click();
  });
  it("forgot your password button", () => {
    cy.get('[data-cy="input-email"]').type("pruebaslogin@tiendanegocio.com")
    cy.get("#float-input-password").type("neve rita")
    cy.get('[data-cy="button-forget-password"]').click()
    cy.get('#email').type("pruebaslogin@tiendanegocio.com")
    cy.get("button[type=submit]").click();
    cy.get("p-toastitem").as("alertOk");
    cy.get("@alertOk")
  })
  it("password visibility button", () => {
    cy.get('[data-cy="input-email"]').type("pruebaslogin@tiendanegocio.com")
    cy.get("#float-input-password").type("neverita")
    cy.get('.password-icon').click()
  })
}) 

function alert(){
    cy.get("p-toastitem").as("alertError");
    cy.get("@alertError")
}
