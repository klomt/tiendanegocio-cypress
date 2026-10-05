const url = "http://192.168.0.61:3002/api/v1";

describe("Orden de compra", () => {

  before(() => {
    cy.registerUser({
        complete_tutorial: true,
        assign_design: true
    });
  });

  beforeEach(() => {
    cy.login();
  })

  it("add 2 products", () => {
    addProduct('Prod 1', '2000', 'yuumi.jpg');
    addProduct('Prod 2', '4000', 'image.jpg');
  })

  it('Enter correct data', () => {
    cy.visit('ordenes');
    cy.url().should('include', 'ordenes');
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="product-item-0"]').click()
    cy.get('.closeButton').click()
    cy.get('[data-cy="name"]').type('Trevol')
    cy.get('[data-cy="lastname"]').type('philips')
    cy.get('[data-cy="email"]').type('trevol@gmail.com')
    cy.get('[data-cy="phone"]').type('1124678743')
    cy.get('[data-cy="dni"]').type('15468413484')
    cy.get('[data-cy="company"]').type('Industrias Philips')
    cy.get('[data-cy="listbox-item-3"]').click()
    cy.get('.p-panel-icons').as('Desplegar')
    cy.get('@Desplegar').first().click()
    cy.get('#isHomeDelivery').click()
    cy.get('[data-cy="street"]').type('Av. Mitre')
    cy.get('[data-cy="street_number"]').type('1')
    cy.get('[data-cy="department"]').type('si')
    cy.get('[data-cy="description"]').type('HOLA')
    cy.get('[data-cy="zip"]').type('1414')
    cy.get('[data-cy="city"]').type('Los santos')
    cy.get('@Desplegar').eq(1).click()
    cy.get('[data-cy="originName"]').type('paloma mensajera')
    cy.get('@Desplegar').eq(2).click()
    cy.get('[data-cy="commentary"]').type('nada')
    cy.get('.p-button-success').click()
  })

  it('Enter data empty', () => {
    cy.visit('ordenes');
    cy.url().should('include', 'ordenes');
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="product-item-0"]').click()
    cy.get('.closeButton').click()
    cy.get('.p-button-success').click()
    cy.get('.p-error').should('be.visible')
  })
   it('Name too long', () => { 
    completedInputs()
    cy.get('[data-cy="name"]').clear().generateRandomText(70)
    cy.get('.p-button-success').click()
    cy.get('.p-error').should('be.visible')
  })
  it('Last name too long', () => {
    completedInputs()
    cy.get('[data-cy="lastname"]').clear().generateRandomText(70)
    cy.get('.p-button-success').click()
    cy.get('.p-error').should('be.visible')
  })

  it('Email too long', () => {
    completedInputs()
    cy.get('[data-cy="email"]').clear().generateRandomText(70,'','@gmail.com')
    cy.get('.p-button-success').click()
    cy.get('.p-error').should('be.visible')
  })
  function addProduct(title,price,image){
    cy.wait(1000);
    cy.visit("productos/agregar");
    cy.get('[data-cy="input-title"]').type(`${title}` );
    cy.wait(4000);
    cy.get('[data-cy="input-price"]').type(`${price}`);
    cy.intercept({
        method: "POST",
        url: `${url}/gift/admin/image`,
      }).as("uploadRequest");
    cy.wait(2000);
    cy.get('[data-cy="input-inner-upload"]').attachFile(`${image}`);
    cy.get('[data-cy="button-save"]').click();
    cy.reload();
    cy.wait(1000);
    cy.visit('/productos/lista');
    cy.url().should('include', '/productos/lista');
  }
})
function completedInputs(){
  cy.visit('ordenes');
  cy.url().should('include', 'ordenes');
  cy.get('[data-cy="button-create"]').click()
  cy.get('[data-cy="button-create"]').click()
  cy.wait(4000)
  cy.get('[data-cy="product-item-0"]').click()
  cy.get('.closeButton').click()
  cy.get('[data-cy="name"]').type('Trevol')
  cy.get('[data-cy="lastname"]').type('philips')
  cy.get('[data-cy="email"]').type('trevol@gmail.com')
}