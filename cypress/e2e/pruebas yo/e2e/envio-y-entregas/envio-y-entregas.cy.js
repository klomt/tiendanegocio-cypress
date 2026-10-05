const url = "http://192.168.0.61:3002/api/v1";

describe("Envio y entregas", () => {

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
    cy.visit('configuraciones/envios');
    cy.url().should('include', 'configuraciones/envios');
  })

  // Entrega personalizada:

  it('ENTREGA PERSONALIZADA - check if all inputs are working', () => {
    cy.visit('configuraciones/envios/agregar');
    cy.get('[data-cy="input-title"]').type('aaaaaaaaaaaaaa');
    cy.get('[data-cy="input-description"]').type('Probando descripcion');
    cy.get('[data-cy="input-free"]').click();
    cy.get('[data-cy="checkbox-limit_weight"]').click();
    cy.get('[data-cy="input-weight_min"]').clear().type('2')
    cy.get('[data-cy="input-weight_max"]').clear().type('500');
    cy.get('[data-cy="checkbox-limit_cart"]').click();
    cy.get('[data-cy="input-cart_min"]').clear().type('2000');
    cy.get('[data-cy="input-cart_max"]').clear().type('15000');
    cy.get('[data-cy="radio-time-options-2"]').click();
    cy.get('[data-cy="input-delay_min"]').type('1');
    cy.get('[data-cy="input-delay_max"]').type('7');

    cy.get('[data-cy="button-save"]').click();
    cy.url().should('include', 'configuraciones/envios'); 
    })
  
  it('ENTREGA PERSONALIZADA - check if inputs are too long', () => {
    cy.visit('configuraciones/envios/agregar');
    cy.get('[data-cy="input-title"]').generateRandomText(100)
    cy.get('[data-cy="input-description"]').generateRandomText(1000)
    cy.get('[data-cy="input-free"]').click();
    cy.get('[data-cy="checkbox-limit_weight"]').click();
    cy.get('[data-cy="input-weight_min"]').clear().generateRandomNumber(50)
    cy.get('[data-cy="input-weight_max"]').clear().generateRandomNumber(50)
    cy.get('[data-cy="checkbox-limit_cart"]').click();
    cy.get('[data-cy="input-cart_min"]').clear().generateRandomNumber(50)
    cy.get('[data-cy="input-cart_max"]').clear().generateRandomNumber(50)
    cy.get('[data-cy="radio-time-options-2"]').click();
    cy.get('[data-cy="input-delay_min"]').generateRandomNumber(50)
    cy.get('[data-cy="input-delay_max"]').generateRandomNumber(50)

    cy.get('[data-cy="button-save"]').should('be.disabled');
  });

  /* it('ENTREGA PERSONALIZADA - what if minimum weight is higher than maximum weight', () => {
    cy.visit('configuraciones/envios/agregar');
    cy.get('[data-cy="input-title"]').type('aaaaaaaaaaaaaa');
    cy.get('[data-cy="input-description"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce magna felis, sollicitudin eget blandit vitae, imperdiet eget urna.');
    cy.get('[data-cy="input-free"]').click();
    cy.get('[data-cy="checkbox-limit_weight"]').click();
    cy.get('[data-cy="input-weight_min"]').clear().type('500')
    cy.get('[data-cy="input-weight_max"]').clear().type('2');
    cy.get('[data-cy="checkbox-limit_cart"]').click();
    cy.get('[data-cy="input-cart_min"]').clear().type('2000');
    cy.get('[data-cy="input-cart_max"]').clear().type('15000');
    cy.get('[data-cy="radio-time-options-2"]').click();
    cy.get('[data-cy="input-delay_min"]').type('1');
    cy.get('[data-cy="input-delay_max"]').type('7');

    cy.get('[data-cy="button-save"]').should('be.disabled')
    cy.url().should('include', 'configuraciones/envios'); 
    }) */
    
  /* it.only('ENTREGA PERSONALIZADA - what if minimum price is higher than maximum price', () => {
    cy.visit('configuraciones/envios/agregar');
    cy.get('[data-cy="input-title"]').type('aaaaaaaaaaaaaa');
    cy.get('[data-cy="input-description"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce magna felis, sollicitudin eget blandit vitae, imperdiet eget urna.');
    cy.get('[data-cy="input-free"]').click();
    cy.get('[data-cy="checkbox-limit_weight"]').click();
    cy.get('[data-cy="input-weight_min"]').clear().type('2')
    cy.get('[data-cy="input-weight_max"]').clear().type('500');
    cy.get('[data-cy="checkbox-limit_cart"]').click();
    cy.get('[data-cy="input-cart_min"]').clear().type('15000');
    cy.get('[data-cy="input-cart_max"]').clear().type('2000');
    cy.get('[data-cy="radio-time-options-2"]').click();
    cy.get('[data-cy="input-delay_min"]').type('1');
    cy.get('[data-cy="input-delay_max"]').type('7');
    
    cy.get('[data-cy="button-save"]').should('be.disabled')
    cy.url().should('include', 'configuraciones/envios'); 
    }) */

    it('check if edit button is working', () => {
        cy.visit('configuraciones/envios/agregar');
        cy.get('[data-cy="input-title"]').type('aaaaaaaaaaaaaa');
        cy.get('[data-cy="input-description"]').type('Silksong 4 de septiembre');
        cy.get('[data-cy="input-free"]').click();
        cy.get('[data-cy="checkbox-limit_weight"]').click();
        cy.get('[data-cy="input-weight_min"]').clear().type('2')
        cy.get('[data-cy="input-weight_max"]').clear().type('500');
        cy.get('[data-cy="checkbox-limit_cart"]').click();
        cy.get('[data-cy="input-cart_min"]').clear().type('2000');
        cy.get('[data-cy="input-cart_max"]').clear().type('15000');
        cy.get('[data-cy="radio-time-options-2"]').click();
        cy.get('[data-cy="input-delay_min"]').type('1');
        cy.get('[data-cy="input-delay_max"]').type('7');

        cy.get('[data-cy="button-save"]').click();
        
        cy.get('[data-cy="button-edit"]').first().click()
        cy.url().should('include', '/editar')
    })

    it('ENTREGA PERSONALIZADA - check if delete button is working', () => {
        cy.visit('configuraciones/envios/agregar');
        cy.get('[data-cy="input-title"]').type('aaaaaaaaaaaaaa');
        cy.get('[data-cy="input-description"]').type('Hola como estas')
        cy.get('[data-cy="input-free"]').click();
        cy.get('[data-cy="checkbox-limit_weight"]').click();
        cy.get('[data-cy="input-weight_min"]').clear().type('2')
        cy.get('[data-cy="input-weight_max"]').clear().type('500');
        cy.get('[data-cy="checkbox-limit_cart"]').click();
        cy.get('[data-cy="input-cart_min"]').clear().type('2000');
        cy.get('[data-cy="input-cart_max"]').clear().type('15000');
        cy.get('[data-cy="radio-time-options-2"]').click();
        cy.get('[data-cy="input-delay_min"]').type('1');
        cy.get('[data-cy="input-delay_max"]').type('7');

        cy.get('[data-cy="button-save"]').click();
        
        cy.get('[data-cy="button-delete"]').first().click()
        cy.get('.p-button-danger').last().click();
        cy.get('.p-button-danger').should('have.length', 2)
    })

    // Entrega en sucursal:

    it('ENTREGA EN SUCURSAL - inputs validos' , () => {
        cy.visit('configuraciones/envios/sucursal/agregar');
        cy.get('[data-cy="input-title"]').type('aaaaaaaaaaaaaaaaa');
        cy.get('[data-cy="input-description"]').generateRandomText(100)
        cy.get('.p-button-success').click();
        cy.url().should('include', 'configuraciones/envios')
    })

    
    it('ENTREGA EN SUCURSAL - delete button', () => {
      cy.visit('configuraciones/envios/');
      cy.get('[data-cy="button-delete"]').last().click();
      cy.get('.p-button-danger').last().click();
      cy.get('.p-button-danger').should('have.length', 2);
    })

    it('ENTREGA EN SUCURSAL - inputs muy largos' , () => {
        cy.visit('configuraciones/envios/sucursal/agregar');
        cy.get('[data-cy="input-title"]').generateRandomText(300)
        cy.get('[data-cy="input-description"]').generateRandomText(300)
        cy.get('.p-button-success').should('be.disabled')
    })

    // Correo Argentino:

  it('CORREO ARGENTINO - inputs validos', () => {
    cy.visit('configuraciones/envios/correo-argentino');
    cy.get('[data-cy="input-customer-id"]').type('111111111')
    cy.get('[data-cy="input-zip"]').type('1870');
    cy.get('[data-cy="input-percentage"]').clear().type('5');
    cy.get('[data-cy="input-price"]').clear().type('2000');
    cy.get('.p-button-success').first().click()
        

  })

  // No es posible borrar por falta de credenciales
  it('CORREO ARGENTINO - delete button', () => {
    cy.visit('configuraciones/envios/');
    cy.get('[data-cy="button-delete"]').last().click();
    cy.get('.p-button-danger').last().click();
    cy.get('.p-button-danger').should('have.length', 2);
  })  

  it('CORREO ARGENTINO - inputs muy largos', () => {
    cy.visit('configuraciones/envios/correo-argentino');
    cy.get('[data-cy="input-customer-id"]').generateRandomNumber(100)
    cy.get('[data-cy="input-zip"]').type('187023147123');
    cy.get('[data-cy="input-percentage"]').clear().generateRandomNumber(100)
    cy.get('[data-cy="input-price"]').clear().generateRandomNumber(100)
    cy.get('.p-button-success').should('be.disabled');
    /* cy.get('[data-cy="button-confirm"]').click(); */
  })

  it('ZIPPIN - inputs validos', () => {
    cy.visit('configuraciones/envios/zipnova');
    cy.get('[data-cy="input-account_id"]').type('19461823')
    cy.get('[data-cy="input-secret"]').type('fK192l28Am45gbA3sa4');
    cy.get('[data-cy="input-key"]').type('2ak1Fd72kyUis923msd');
    cy.get('[data-cy="input-origin_id"]').type('12234')
    cy.get('[data-cy="button-save"]').click();
    cy.url().should('include', 'configuraciones/envios');

  })

  // No es posible borrar por falta de credenciales
  /*
  it('ZIPPIN - delete button', () => {
    cy.visit('configuraciones/envios/');
    cy.get('[data-cy="button-delete"]').last().click();
    cy.get('[icon="pi pi-check"]').click();
    cy.get('.p-button-danger').should('have.length', 2);
  })
  */  

  it('Notas sobre el envio', () => {
    cy.visit('configuraciones/envios/');
    cy.get('#shipment_alert_text').generateRandomText(20)
    cy.get('.p-checkbox-input').click();
    cy.get('[data-cy="button-shipment-save"]').click();
    cy.get('.p-toast-message-content').should('exist');
  })
  


})