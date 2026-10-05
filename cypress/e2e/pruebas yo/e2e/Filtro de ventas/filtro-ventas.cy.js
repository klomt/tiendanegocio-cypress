
const url = "http://192.168.0.61:3002/api/v1";

describe("Filtro de ventas", () => {

  before(() => {
    cy.registerUser({
        complete_tutorial: true,
        assign_design: true
    });
  });

  beforeEach(() => {
    cy.login();
  })

  it("add product", () => {
    addProduct('Prod 1', 'Desc 1', '2000', 'yuumi.jpg');
  })

  it('Create order of buys ', () => {
    cy.wait(2000)
    addCompra('Steve', 'Minecraft', 'steve@gmail.com')
    cy.wait(2000)
    addCompra('Michael', 'De santa', 'michael@gmail.com', )
    cy.wait(2000)
    addCompra('Ezio', 'Auditore', 'ezio@gmail.com')
    cy.wait(2000)
    addCompra('Aiden', 'Pearce', 'aiden@gmail.com')
    cy.wait(2000)
    addCompra('Ryley', 'Robison', 'ryley@gmail.com')
    cy.wait(2000)

    cy.get('[data-cy="button-extra"]').eq(0).click()
    cy.get('#change-status-shipment-2').click()
    cy.wait(2000)
    cy.get('[data-cy="button-extra"]').eq(2).click({force:true})
    cy.get('#show-notify-shipment').click()
    cy.get('[label="Notificar envío"]').click()
    cy.wait(2000)
    cy.get('[data-cy="button-extra"]').eq(4).click({force:true})
    cy.get('#change-status-shipment-4').click()
    cy.wait(2000)
    cy.get('[data-cy="button-extra"]').eq(6).click({force:true})
    cy.get('#view-details').click()
    cy.get('[data-cy="button-add"]').click()
    cy.get('.p-menu-item-content').first().as("cancelar")
    cy.get("@cancelar").click ({force:true})
    cy.get('[iconpos="right"]').click()
  })
  it('Filter pby canceled',()=>{
    cy.visit('transacciones')
    cy.get('[data-cy="button-add"]').eq(1).click({force:true})
    cy.get('[data-cy="select-order-by"]').eq(0).click()
    cy.get('[data-cy="order-canceled"]').click()
    cy.get('[label="Filtrar productos"]').click()
    cy.get('[data-cy="row-0"]').should('contain.text', '#2')
  })
  it('Filter by packaging',()=>{
    cy.visit('transacciones')
    cy.get('[data-cy="button-add"]').eq(1).click({force:true})
    cy.get('[data-cy="select-order-by"]').eq(1).click()
    cy.get('[data-cy="order-1"]').click()       
    cy.get('[label="Filtrar productos"]').click()  
    cy.get('[data-cy="row-0"]').should('contain.text', '#1')
  })
  it('Filter by send',()=>{
    cy.visit('transacciones')
    cy.get('[data-cy="button-add"]').eq(1).click({force:true})
    cy.get('[data-cy="select-order-by"]').eq(1).click()
    cy.get('[data-cy="order-2"]').click()     
    cy.get('[label="Filtrar productos"]').click()  
    cy.get('[data-cy="row-0"]').should('contain.text', '#5')
  })
  it('Filer by sent',()=>{
    cy.visit('transacciones')
    cy.get('[data-cy="button-add"]').eq(1).click({force:true})
    cy.get('[data-cy="select-order-by"]').eq(1).click()
    cy.get('[data-cy="order-3"]').click()     
    cy.get('[label="Filtrar productos"]').click()  
    cy.get('[data-cy="row-0"]').should('contain.text', '#4')
  })
  it('Filter by delivered',()=>{
    cy.visit('transacciones')
    cy.get('[data-cy="button-add"]').eq(1).click({force:true})
    cy.get('[data-cy="select-order-by"]').eq(1).click()
    cy.get('[data-cy="order-4"]').click()    
    cy.get('[label="Filtrar productos"]').click()  
    cy.get('[data-cy="row-0"]').should('contain.text', '#3')
  })
  it('Filter by pending payment',()=>{
    cy.visit('transacciones')
    cy.get('[data-cy="button-add"]').eq(1).click({force:true})
    cy.get('[data-cy="select-order-by"]').eq(2).click()
    cy.get('[data-cy="order-2"]').click()    
    cy.get('[label="Filtrar productos"]').click()  
    cy.get('[data-cy="row-0"]').should('contain.text', '#5')
    cy.get('[data-cy="row-1"]').should('contain.text', '#4')
    cy.get('[data-cy="row-2"]').should('contain.text', '#1')
  })
  it('Filtrar by confirmed payment',()=>{
    cy.visit('transacciones')
    cy.get('[data-cy="button-add"]').eq(1).click({force:true})
    cy.get('[data-cy="select-order-by"]').eq(2).click()
    cy.get('[data-cy="order-3"]').click()    
    cy.get('[label="Filtrar productos"]').click()  
    cy.get('[data-cy="row-0"]').should('contain.text', '#3')
  })
 
 
  function addProduct(title,desc,price,image){
    cy.wait(1000);
    cy.visit("productos/agregar");
    cy.get('[data-cy="input-title"]').type(`${title}`);
    //cy.wait(5000);
    //cy.get('[data-cy="description-product"]').type(`${desc}`);
    cy.wait(2000);
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
  function addCompra(name,lastname,email){
    cy.visit('ordenes');
    cy.url().should('include', 'ordenes');
    cy.get('[data-cy="button-create"]').click({force:true})
    cy.get('[data-cy="button-create"]').click({force:true})
    cy.get('.product').first().click()
    cy.get('.closeButton').click()
    cy.get('[data-cy="name"]').type(name)
    cy.get('[data-cy="lastname"]').type(lastname)
    cy.get('[data-cy="email"]').type(email)
    cy.get('[data-cy="listbox-item-2"]').click()
    if(name == "Ezio"){
        cy.get('[data-cy="listbox-item-3"]').click()
    }
    cy.get('.p-button-success').click()
  }
})