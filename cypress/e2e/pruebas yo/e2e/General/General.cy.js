const url = "https://paneltest.tiendanegocio.com/#/general"
const credentials = {};

describe("General", () => {
  before(() => {
    cy.registerUser().then((newAdmin) => {
      credentials.email = newAdmin.email;
      credentials.password = newAdmin.password;
    });
  });

  beforeEach(() => {
    cy.login(credentials);
  });

  it("Visit page", () => {
    cy.visit("/configuraciones/general");
  });

  it("Que pasa si no le ingreso nombre a la tienda", () => {
    completeInputs()
    cy.get("#title").clear();
    cy.get('button[type="submit"]').should("be.disabled");
  });
  /*
  it("Que pasa si ingreso un email repetido", () => {
    completeInputs()
    cy.get("@inputE").clear().type("francho@gmail.com");
    cy.get("@buttonInput").click();
    cy.get("p-toastitem").as("alertError");
    cy.get("@alertError").contains("Se guardaron los cambios exitosamente");
  });
  */
  it("Que pasa si ingreso una direccion muy larga", () => {
    completeInputs()
    cy.get("#direction").as("directionInput")
    cy.get("@directionInput").generateRandomText(100)
    cy.get('button[type="submit"]').should("be.disabled");
  });
  it("Que pasa si ingreso una direccion muy corta", () => {
    completeInputs()
    cy.get("#direction").as("directionInput");
    cy.get("@directionInput").clear().type("f");
    cy.get('button[type="submit"]').click();
    cy.get("p-toastitem").as("alertError");
    cy.get("@alertError").contains("Se guardaron los cambios exitosamente");
  });
  it("Que pasa si el telefono es muy largo", () => {
    completeInputs()
    cy.get("#phone").as("telefonoInput");
    cy.get("@telefonoInput").generateRandomNumber(50)
    cy.get('button[type="submit"]').should("be.disabled");
  });
  it("Que pasa si ingreso un telefono muy corto", () => {
    completeInputs()
    cy.get("#phone").as("telefonoInput");
    cy.get("@telefonoInput").clear().type("12");
    cy.get('button[type="submit"]').click();
    cy.get("p-toastitem").as("alertError");
    cy.get("@alertError").contains("Se guardaron los cambios exitosamente");
  });
  it("Que pasa si dejo todos los inputs vacios", () => {
    cy.visit("/configuraciones/general");
    cy.get("#title").as("tiendaInput");
    cy.get("#email").as("emailInput");
    cy.get("#direction").as("directionInput");
    cy.get("#phone").as("telefonoInput");
    cy.get("@tiendaInput").clear();
    cy.get("@emailInput").clear();
    cy.get("@directionInput").clear();
    cy.get("@telefonoInput").clear();
    cy.get('button[type="submit"]').should("be.disabled");
  });
});

function generateRandomHash() {
  return (+new Date()).toString(36);
}
function completeInputs(){
  cy.visit("/configuraciones/general");
  cy.get("#title").as("tiendaInput");
  cy.get("#email").as("emailInput");
  cy.get("#direction").as("directionInput");
  cy.get("#phone").as("telefonoInput")
  cy.get("@tiendaInput").type((+new Date()).toString(36));
  cy.get("@directionInput").type('ffffffff')
  cy.get("@telefonoInput").type('125654')                    
  cy.get("@emailInput").type(generateRandomHash());
}
