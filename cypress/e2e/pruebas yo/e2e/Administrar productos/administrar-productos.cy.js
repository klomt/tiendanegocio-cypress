const url = "http://192.168.0.61:3002/api/v1";

describe("Tipo de letra", () => {

  before(() => {
    cy.registerUser({
      assign_design: true
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it("add 2 products", () => {
    addProduct('Prod 1', 'Desc 1', '2000', 'yuumi.jpg');
    addProduct('Prod 2', 'Desc 2', '4000', 'image.jpg');
  })

  it("test search bar", () => {
    cy.visit('productos/lista');
    cy.get('[data-cy="search-bar-products"]').clear().type('Prod 2'); 
    cy.get('[data-cy="row-0"]').contains('Prod 2').should('contain', 'Prod 2')
  })

  it("test order button" , () => {
    cy.visit('productos/lista');
    cy.clearLocalStorage();
    cy.get('[data-cy="search-bar-products"]').clear();
    cy.get('[data-cy="button-add"]').eq(0).click();
    cy.get('.order-products').click()
  })
  it("order by new to old", () =>{
    orderButton()
    cy.get('[data-cy="type-1"]').click();
    cy.get('[data-cy="sorteable-order-products"]').eq(0).contains('Prod 2').should('contain', 'Prod 2')
  })
  it("oder by old to new", ()=>{
    orderButton()
    cy.get('[data-cy="type-2"]').click()
    cy.get('[data-cy="sorteable-order-products"]').eq(0).contains('Prod 1').should('contain', 'Prod 1')
  })

  it("order by price (largest to smallest)", ()=>{
    orderButton()
    cy.get('[data-cy="type-3"]').click()
    cy.get('[data-cy="sorteable-order-products"]').eq(0).contains('Prod 2').should('contain', 'Prod 2')
  })
  it ("order by price (smallest to largest", ()=>{
    orderButton()
    cy.get('[data-cy="type-4"]').click()
    cy.get('[data-cy="sorteable-order-products"]').eq(0).contains('Prod 1').should('contain', 'Prod 1')
  }) 
  it("test price", () => {
    cy.visit('productos/lista');
    cy.clearLocalStorage();
    cy.get('.p-filled').last()
    .invoke('val')
    .then((valor) => {
      cy.log(valor); 
      expect(valor).to.equal('$ 2000,00');
    });
  })
 

  it("test delete button", () => {
    cy.visit('/productos/lista');
    cy.get('[data-cy="button-extra"]').first().click();
    cy.get('.p-menu-item-link').eq(1).click()
    cy.get('.p-confirmdialog-accept-button').click();
    cy.get('[data-cy="row-1"]').should('not.exist');
  })
   

  function addProduct(title,desc,price,image){
    cy.wait(1000);
    cy.visit("productos/agregar");
    cy.get('[data-cy="input-title"]').type(`${title}`);
    cy.wait(2000);
    cy.get('.tox-edit-area__iframe').type(`${desc}`);
    cy.wait(2000);
    cy.get('[data-cy="input-price"]').type(`${price}`);
    cy.intercept({
        method: "POST",
        url: `${url}/gift/admin/image`,
      }).as("uploadRequest");
    cy.wait(2000);
    cy.get('[data-cy="input-inner-upload"]').attachFile(`${image}`)
    cy.get('[data-cy="button-save"]').click();
    cy.reload();
    cy.wait(1000);
    cy.visit('/productos/lista');
    cy.url().should('include', '/productos/lista');
  }
  function orderButton(){
    cy.visit('productos/lista');
    cy.clearLocalStorage();
    cy.get('[data-cy="search-bar-products"]').clear();
    cy.get('[data-cy="button-add"]').eq(0).click();
    cy.get('.order-products').click()
    cy.get('[data-cy="select-order-products"]').click()
  }
}
)
