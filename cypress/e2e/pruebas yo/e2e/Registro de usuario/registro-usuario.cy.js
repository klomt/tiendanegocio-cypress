const url = "http://192.168.0.61:3002/api/v1";

describe("Registro", () => {
  beforeEach(() => {
    cy.visit("/registro");
  });

  it("visit page", () => {
    cy.visit("/registro");
  });

  it("Que pasa si no tiene nombre?", () => {
    cy.get("#name").as("nombreInput");
    cy.get("#title").as("tiendaInput");
    cy.get("button[type=button]").first().as("buttonInput");

    cy.get("@tiendaInput").type("frannn");

    //verificado de alert de error del nombre del nombre
    cy.get("@buttonInput").click();

    cy.get("p-toastitem").as("alertError");
    cy.get("@alertError").contains("Debes ingresar un nombre...");
  });

  it("Que pasa si no se ingresa el nombre de la tienda?", () => {
    cy.get("#name").as("nombreInput");
    cy.get("#title").as("tiendaInput");
    cy.get("button[type=button]").first().as("buttonInput");

    cy.get("@nombreInput").type((+new Date()).toString(36));
    //tiendaInput.type ("#");

    //verificado de alert de error del nombre de la tienda
    cy.get("@buttonInput").click();
    cy.get("p-toastitem").as("alertError");

    cy.get("@alertError").contains("Debes ingresar un nombre de marca...");
  });
  it("Que pasa si no le ingresas url?", () => {
    cy.get("#name").as("nombreInput");
    cy.get("#title").as("tiendaInput");
    cy.get("#encode_title").as("urlInput");

    cy.get("button[type=button]").first().as("buttonInput");

    cy.get("@nombreInput").type("frannn");
    cy.get("@tiendaInput").type("francho");

    cy.get("#encode_title").clear();

    //verificado de alert de error de la url
    cy.get("@buttonInput").click();
    cy.get("p-toastitem").as("alertError");
    cy.get("@alertError").contains(
      "El nombre de la marca debe tener al menos 3 caracteres.."
    );
  });

  it("simbologia rara registro", () => {
    cy.get("#name").as("nombreInput");
    cy.get("#title").as("tiendaInput");
    cy.get("#encode_title").as("urlInput");

    cy.get("button[type=button]").first().as("buttonInput");

    cy.get("@nombreInput").type("⇢ ๑ ◞♡ ⸙͎ ˀˀ ♡");
    cy.get("@tiendaInput").type("⇢ ๑ ◞♡ ⸙͎ ˀˀ ♡");

    cy.get("#encode_title").clear();
    cy.get("@buttonInput").click();

    cy.get("p-toastitem").as("alertError");
    cy.get("@alertError").contains(
      "El nombre de la marca debe tener al menos 3 caracteres.."
    );
  });
  it("simbologia rara inicio", () => {
    cy.get("#name").as("nombreInput");
    cy.get("#title").as("tiendaInput");
    cy.get("#encode_title").as("urlInput");

    cy.get("button[type=button]").first().as("buttonInput");
    cy.get("@nombreInput").type("fffffff");
    cy.get("@tiendaInput").type(generateRandomHash());
    cy.get("@buttonInput").click();

    //Create account
    cy.get("#email").as("emailInput");
    cy.get("#float-input-password").as("passwordInput");
    cy.get("button[type=submit]").as("createInput");

    cy.get("@emailInput").type(generateRandomHash() + "@tiendanegocio.com");

    cy.get("@passwordInput").type("⇢ ๑ ◞♡ ⸙͎ ˀˀ ♡");
    cy.get("@buttonInput").click();
  });
  it("que pasa si la clave es muy corta", () => {
    cy.get("#name").as("nombreInput");
    cy.get("#title").as("tiendaInput");
    cy.get("#encode_title").as("urlInput");

    cy.get("button[type=button]").first().as("buttonInput");

    cy.get("@nombreInput").type("frann");
    cy.get("@tiendaInput").type(generateRandomHash());

    cy.get("@buttonInput").click();

    //Create account
    cy.get("#email").as("emailInput");
    cy.get("#float-input-password").as("passwordInput");

    cy.get("@emailInput").type(generateRandomHash() + "@tiendanegocio.com");
    cy.get("@passwordInput").type("s");

     cy.get('button[type="submit"]').click()
    cy.get('#password-help').should('exist')
  });
  it("que pasa si la clave es muy larga", () => {
    cy.get("#name").as("nombreInput");
    cy.get("#title").as("tiendaInput");
    cy.get("#encode_title").as("urlInput");

    cy.get("button[type=button]").first().as("buttonInput");

    cy.get("@nombreInput").type("frann");
    cy.get("@tiendaInput").type(generateRandomHash());

    cy.get("@buttonInput").click();

    //Create account
    cy.get("#email").as("emailInput");
    cy.get("#float-input-password").as("passwordInput");

    cy.get("@emailInput").type(generateRandomHash() + "@tiendanegocio.com");
    cy.get("@passwordInput").generateRandomText(100)

    cy.get('button[type="submit"]').click()
    cy.get('#password-help').should('exist')  
  });
  it("que pasa si el nombre es muy corto", () => {
    cy.get("#name").as("nombreInput");
    cy.get("#title").as("tiendaInput");
    cy.get("#encode_title").as("urlInput");

    cy.get("@nombreInput").type("f");
    cy.get("@tiendaInput").type(generateRandomHash());

    cy.get('button[type="button"]').first().should("have.class", "p-button-primary");
  });

  it("create shop", () => {
    cy.get("#name").as("nombreInput");
    cy.get("#title").as("tiendaInput");
    cy.get("#encode_title").as("urlInput");

    cy.get("button[type=button]").first().as("buttonInput");

    cy.get("@nombreInput").type(generateRandomHash());
    cy.get("@tiendaInput").type(generateRandomHash());

    cy.get("@buttonInput").click();

    //Create account
    cy.get("#email").as("emailInput");
    cy.get("#float-input-password").as("passwordInput");

    cy.get("button[type=submit]").as("createInput");

    cy.get("@emailInput").type(generateRandomHash() + "@tiendanegocio.com");

    cy.get("@passwordInput").type("ssssss");

    cy.get("@createInput").click();
  });
});

function generateRandomHash() {
  return (+new Date()).toString(36);
}
