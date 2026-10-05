const url = "http://192.168.0.61:3002/api/v1"

describe('codigo externo', () => {

  before(()=>{
    cy.registerUser();
  })

  beforeEach(()=>{
    cy.login();
  })
  it("input empty", () => {
    cy.visit("/configuraciones/codigo-externo");
    cy.get("app-editor-code .editor .ace_text-input").first().as("scripthead");
    cy.get("@scripthead").type('sss{selectall}{backspace}', { force: true });
    cy.get('[data-cy="button-save"]').click();
    cy.get('.p-toast-message-content').should("exist");
  })
  it("code html", () => {
    cy.visit("/configuraciones/codigo-externo");
    cy.get("app-editor-code .editor .ace_text-input").first().as("scripthead");
    cy.get("@scripthead").type(" <title>Nombre de la pagina</title>", { force: true });
    cy.get('[data-cy="button-save"]').click();
    cy.get('.p-toast-message-content').should("exist");
  })
  it("input large", () => {
    cy.visit("/configuraciones/codigo-externo");
    cy.get("app-editor-code .editor .ace_text-input").first().as("scripthead");
    cy.get("@scripthead").type("{selectall}{backspace}ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", { force: true });
    cy.get('[data-cy="button-save"]').click();
    cy.get('.p-toast-message-content').should("exist");
  })
  it("input short", () => {
    cy.visit("/configuraciones/codigo-externo");
    cy.get("app-editor-code .editor .ace_text-input").first().as("scripthead");
    cy.get("@scripthead").type("{selectall}{backspace}s", { force: true });
    cy.get('[data-cy="button-save"]').click();
    cy.get('.p-toast-message-content').should("exist");
  })
  it("link in a input", () => {
    cy.visit("/configuraciones/codigo-externo");
    cy.get("app-editor-code .editor .ace_text-input").first().as("scripthead");
    cy.get("@scripthead").type("{selectall}{backspace}https://www.youtube.com/watch?v=flpSr1TYp5o&list=RDflpSr1TYp5o&start_radio=1", { force: true });
    cy.get('[data-cy="button-save"]').click();
    cy.get('.p-toast-message-content').should("exist");
  })
})