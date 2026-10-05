const url = "http://192.168.0.61:3002/api/v1";

describe("Edicion avanzada CSS", () => {

  before(() => {
    cy.registerUser({
      assign_design: true
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it('visit page', () => {
    cy.visit('/configuraciones/diseno/editor/edicion_avanzada_de_css');
    cy.wait(2000);
    cy.get('[data-cy="button-edition-css"]').click()
    cy.url().should('include', '/configuraciones/diseno/editor/edicion_avanzada_de_css');
  })

  it('check that changes are made inside iframe', () => {
    cy.visit('/configuraciones/diseno/editor/edicion_avanzada_de_css');
    cy.wait(2000);
    let attrLogo = '.logo div {max-width:200px}'
    cy.get('[data-cy="button-edition-css"]').click();
    cy.get('app-editor-code .editor .ace_text-input').type(attrLogo, { force: true, parseSpecialCharSequences: false });
    cy.visit('/configuraciones/diseno/editor');
    cy.wait(2000);
    cy.get('[data-cy="button-edition-css"]').click();
    cy.get('[data-cy="button-save"]').first().click();
    cy.wait(1000);

  })

}) 