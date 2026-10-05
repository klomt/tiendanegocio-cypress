const url = "http://192.168.0.61:3002/api/v1";

describe("Pagina de inicio", () => {

  before(() => {
    cy.registerUser({
        complete_tutorial: true,
        assign_design: true
    });
  });

  beforeEach(() => {
    cy.login();
  })

  /* it('visit page', () => {
    cy.visit('configuraciones/diseno/editor/');
    cy.wait(1000);
    cy.visit('configuraciones/diseno/editor/inicio');
    cy.url().should('include', 'configuraciones/diseno/editor/inicio');
  }) */

  it('check if add section is working', () => {
    visitPagInicio();
    addSection('seccion 1 aaa');
    cy.get('[data-cy="section-1"] > p-toolbar > .section').should('exist');
  })
  it('check if delete section is working', () => {
    visitPagInicio();
    cy.get('[data-cy="section-1"]').find('[data-cy="button-delete-section"]').click();
    cy.get('.p-confirmdialog-accept-button').click();
    cy.get('[data-cy="section-1"] > p-toolbar > .section').should('not.exist');
  })
  it('check if edit section', () => {
    visitPagInicio();
    addSection('seccion xd aaa');
    cy.get('[data-cy="button-edit-section"]').last().click();
    cy.get('[data-cy="input-title-text-simple"]').clear().type('prueba');
    cy.get('[data-cy="button-save"]').first().click();
    cy.wait(6000);
    cy.visit('configuraciones/diseno/editor/inicio');
    cy.wait(2000);
    cy.get('[data-cy="button-edit-section"]').last().click();
    cy.get('[data-cy="input-title-text-simple"]').should('have.value', 'prueba');
  })
  it('check if multiple sections are added', () => {
    for(let i=0; i<15; i++){
      visitPagInicio();
      addSection(`prueba ${i}`);
      cy.wait(2000);
    }
  })

  function addSection(title){
    cy.get('[data-cy="button-add-section"]').click();
    cy.wait(3000);
    cy.get('[data-cy="button-add-section-8"]').click();
    
    cy.get('#inner-title').type(`${title}`);
    cy.get('[data-cy="button-back"]').click();
    cy.intercept({
        method: "PUT",
        url: `https://apitest/api/v1/dynamic/config/general`,
      }).as("publishRequest");
    cy.wait(2000);
    cy.get('[data-cy="button-save"]').first().click();
    cy.wait(6000);
    cy.visit('configuraciones/diseno/editor/inicio');
    
  }

  function visitPagInicio(){
    cy.visit('configuraciones/diseno/editor/');
    cy.wait(1000);
    cy.visit('configuraciones/diseno/editor/inicio');
  }

})