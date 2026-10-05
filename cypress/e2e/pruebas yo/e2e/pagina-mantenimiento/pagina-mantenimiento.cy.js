const url = "http://192.168.0.61:3002/api/v1";

describe("Pagina de mantenimiento", () => {

  before(() => {
    cy.registerUser({
        complete_tutorial: true,
        assign_design: true
    });
  });

  beforeEach(() => {
    cy.login();
  })

  it('visit page', () => {
    cy.visit('configuraciones/mantenimiento');
    cy.url().should('include', 'configuraciones/mantenimiento');
  })

  it('check what happens if message is too long', () => {
    cy.visit('configuraciones/mantenimiento');
    cy.get('[data-cy="input-message-maintenance"]').clear().generateRandomText(1000)
    cy.wait(2000);
    cy.get('[data-cy="button-save-maintenance"]').should('be.disabled');
  })
  it('check that message saves correctly', () => {
    cy.visit('configuraciones/mantenimiento');
    cy.get('[data-cy="input-message-maintenance"]').clear().type('asdasd');
    cy.get('[data-cy="button-save-maintenance"]').click();
    cy.reload();
    cy.get('[data-cy="input-message-maintenance"]').should('have.value', 'asdasd')
  })

  it('check that maintenance page works', () => {
    cy.visit('configuraciones/mantenimiento');
    cy.get('[data-cy="checkbox-active-maintenance"]').click();
    cy.get('[data-cy="button-save-maintenance"]').click();
    cy.reload();
    cy.get('input[type="checkbox"]').should('be.checked');
  })
  
})