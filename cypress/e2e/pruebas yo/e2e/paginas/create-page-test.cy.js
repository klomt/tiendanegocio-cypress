const url = "http://192.168.0.61:3002/api/v1";
const credentials = {};

describe("Create new page", () => {
  before(() => {
    cy.registerUser().then((newAdmin) => {
      credentials.email = newAdmin.email;
      credentials.password = newAdmin.password;
    });
  });

  beforeEach(() => {
    cy.login(credentials);
  });

  /* it("Test visit pages site", () =>{
        cy.visit('/paginas');
    })

    it("Test 'add page' site", () => {
        cy.visit('/paginas');

        let buttonInput = cy.get('[data-cy="button-create"]');
        buttonInput.click();

        cy.url().should('include', '/agregar');
    })

    it("Test 'add page' with empty inputs", () => {

        visitAddPage();

        let buttonInput = cy.get('button[type="submit"]');

        buttonInput.should('be.disabled');

    })
 */
  it("Test create page", () => {
    visitAddPage();

    cy.get('[data-cy="title"]').type("asaasdasdsadsaadasdasdasd");
    cy.get('[data-cy="button-submit"]').click();

    borrarPage();
  });

  it("Test if 'create page' cancel button is working", () => {
    visitAddPage();

    cy.get('[data-cy="button-cancel"]').click();

    cy.url().should("include", "/paginas");
  });
  it("Test save changes button", () => {
    visitAddPage();

    cy.get('[data-cy="title"]').type("asaasdasdsadsaadasdasdasd");
    cy.get('[data-cy="button-submit"]').click();

    cy.wait(2000);

    cy.get('[data-cy="button-edit"]').first().click();
    cy.get('[data-cy="title"]').type("2123312313");
    cy.get('[data-cy="button-submit"]').click();

    cy.url().should("include", "/paginas");

    borrarPage();
  });
  it("Test if the new page exists in menu", () => {
    visitAddPage();

    cy.get('[data-cy="title"]').clear().type("prueba");
    cy.get('[data-cy="button-submit"]').click();

    cy.wait(5000);

    cy.visit("/menu");

    cy.wait(2000);

    cy.get('[data-cy="button-item-title"]').last().contains(" prueba ").should("exist");

    borrarPage();
  });

  it("Test if the new (draft) page does NOT exist in menu ", () => {
    visitAddPage();

    cy.get('[data-cy="title"]').type("prueba2");
    cy.get('[data-cy="type-page-status-id"]').click();
    cy.get('[data-cy="type-page-status-2"]').click();
    cy.get('[data-cy="button-submit"]').click();

    cy.wait(5000);

    cy.visit("/menu");
    
    cy.get('.p-panel-content').contains(" prueba2 ").should("not.exist");
  });

  it("Test if the new page has same URL", () => {
    visitAddPage();

    cy.get('[data-cy="title"]').type("prueba");
    cy.get(".p-panel-header-icon").click();
    cy.get('[data-cy="slug"]').type("urlprueba");
    cy.get('[data-cy="button-submit"]').click();

    visitAddPage();

    cy.get('[data-cy="title"]').type("prueba");
    cy.get(".p-panel-header-icon").click();
    cy.get('[data-cy="slug"]').type("urlprueba");
    cy.get('[data-cy="button-submit"]').click();

    cy.url().should("include", "/paginas");
  });

  function visitAddPage() {
    cy.visit("/paginas");
   
    cy.wait(5000);

    cy.get('[data-cy="button-create"]').click();
    cy.get('.drawer-list').first().click()
  }

  function borrarPage() {
    cy.visit("/paginas");
    cy.get('[data-cy="button-delete"]').first().click();
    cy.get('.p-button-danger').last().click()
  }
});
