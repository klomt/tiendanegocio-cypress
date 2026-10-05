const url = "http://192.168.0.61:3002/api/v1";
const credentials = {};

describe('Logo y favicon', () => {
    before(()=>{
        cy.registerUser().then((newAdmin)=>{
          credentials.email = newAdmin.email;
          credentials.password = newAdmin.password;
          cy.login(credentials);  
        });
      })
    
      beforeEach(()=>{
        cy.login(credentials);       
      })

      it('visit page', () => {
        changePlan();
        cy.wait(2000);
        cy.visit('/configuraciones/moneda');
        cy.url().should('include', '/configuraciones/moneda');
      })

      it('check first dropdown', () => {
        cy.wait(2000);
        cy.visit('/configuraciones/moneda');
        cy.get('[data-cy="input-currency_sell_id"]').click();
        cy.get('#currency-sell_list').should('be.visible');
      })
      
      it('check second dropdown', () => {
        cy.wait(2000);
        cy.visit('/configuraciones/moneda');
        cy.get('[data-cy="input-currency_id"]').click();
        cy.get('#currency-platform_list').should('be.visible');
      })
      it('change sell currency', () => {
        cy.wait(2000);
        cy.visit('/configuraciones/moneda');
        cy.get('[data-cy="input-currency_sell_id"]').click();
        cy.get('[data-cy="item6"]').click();
        cy.get('[data-cy="button-save"]').click();
        cy.get('.p-toast-message-text').should('be.visible');
      })
      it('change main currency', () => {
        cy.wait(2000);
        cy.visit('/configuraciones/moneda');
        cy.get('[data-cy="input-currency_id"]').click();
        cy.get('[data-cy="item5"]').click();
        cy.get('[data-cy="button-save"]').click();
        cy.get('.p-toast-message-text').should('be.visible');
      })
      it('check if exchange rate can be a negative number', () => {
        cy.wait(2000);
        cy.visit('/configuraciones/moneda');
        cy.get('[data-cy="input-currency_id"]').click();
        cy.get('[data-cy="item5"]').click();
        cy.get('.p-inputtext').clear().type('-10');
        cy.get('[data-cy="button-save"]').should('be.disabled');
      })
      it('check if exchange rate can be a very high number', () => {
        cy.wait(2000);
        cy.visit('/configuraciones/moneda');
        cy.get('[data-cy="input-currency_id"]').click();
        cy.get('[data-cy="item5"]').click();
        cy.get('.p-inputtext').clear().generateRandomNumber(100)
        cy.get('[data-cy="button-save"]').click();
        cy.get('.p-toast-message-text').should('be.visible');
      })

    function changePlan(){
        cy.visit('planes/seleccion');
        cy.get('[data-cy="button-pay3"]').last().click();

    }
}
)