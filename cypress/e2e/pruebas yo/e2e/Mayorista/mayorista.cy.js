const url = "https://paneltest.tiendanegocio.com/#/mayorista"

describe('Venta mayorista', () => {

  before(()=>{
    cy.registerUser({
        complete_tutorial: true, 
        default_plan_id: 3
    });
  })
  beforeEach(()=>{
    cy.login();
  
  })
  //Mayorista

  it("Activate mode button", () => {
    cy.visit("/mayorista");
    cy.wait(3000)
    cy.get('[data-cy="button-create"]').click()
    cy.get(".data-cy-confirm").click()
  })

  it("Wholesale customer confirmation", () => {
    cy.addClientRequest();
    cy.visit("/mayorista");
    cy.get('[data-cy="button-check"]').click()
    cy.get('.data-cy-confirm').click()
  })
  it("Verify wholesale customer confirmation", () => {
    cy.visit("/clientes");
    cy.get('[data-cy="item-0"]').contains('Mayorista').should('exist');
  })

  it("Retail customer rejected", () => {
    cy.addClientRequest();
    cy.visit("/mayorista");
    cy.get('[data-cy="button-cancel"]').click()
    cy.get('.data-cy-cancel').click()
  })
  it("Verify retail customer confirmation", () => {
    cy.visit("/clientes");
    cy.get('[data-cy="item-1"]').contains('Minorista').should('exist');
  })
  //Lista de precios
  it("Price list", () => {
    priceList()
  })
  it("Edit and delete retailer button", () => {
    cy.visit("/mayorista");
    cy.get('[data-cy="row-list-price-0"]').find('[data-cy="button-item-edit-0"]').should("be.disabled");
    cy.get('[data-cy="row-list-price-0"]').find('[data-cy="button-item-delete-0"]').should("be.disabled");
  })
  it("Edit and delete wholesale button", () => {
    cy.visit("/mayorista");
    cy.get('[data-cy="row-list-price-1"]').find('[data-cy="button-item-edit-1"]').should("be.visible");
    cy.wait(2000)
    cy.get('[data-cy="button-item-edit-1"]').click()
    cy.get('[data-cy="input-title"]').clear().type("Tienda negocio")
    cy.get('[data-cy="button-sumbit"]').click()
    cy.get('[data-cy="row-list-price-1"]').find('[data-cy="button-item-delete-1"]').should("be.disabled");
  })
  it("Edit and delete price list button", () => {
    priceList()
    cy.wait(2000)
    cy.get('[data-cy="row-list-price-3"]').find('[data-cy="button-item-edit-3"]').should("be.visible");
    cy.get('[data-cy="row-list-price-3"]').find('[data-cy="button-item-delete-3"]').should("be.visible");
    cy.get('[data-cy="button-item-edit-3"]').click()
    cy.get('[data-cy="input-title"]').clear().type("????")
    cy.get('[data-cy="button-sumbit"]').click()
    cy.wait(2000)
    cy.get('[data-cy="button-item-delete-2"]').click();
    cy.get(".data-cy-confirm").click();
  })
  it("Input large", () => {
    cy.visit("/mayorista");
    cy.wait(2000)
    cy.get('[data-cy="button-item-edit-2"]').click()
    cy.get('[data-cy="input-title"]').clear().generateRandomText(100)
    cy.get('[data-cy="button-sumbit"]').click()
    cy.get('#title-help').as("alert")
    cy.get("@alert").should("exist");
  })
  it("Input short", () => {
    cy.visit("/mayorista");
    cy.wait(2000)
    cy.get('[data-cy="button-item-edit-2"]').click()
    cy.get('[data-cy="input-title"]').clear().type("f")
    cy.get('[data-cy="button-sumbit"]').click()
  })
  it("Verify list price in products", () => {
    cy.visit("/productos/lista");
    addProduct('Titulo1','2000','ibai.jpeg')
    cy.get('[data-cy="dropdown-list-prices"]').should('exist')
    cy.get('[data-cy="dropdown-list-prices"]').click()
    cy.get('[data-cy="dropdown-list-prices"]').contains('Minorista').should('exist');
    cy.get('[data-cy="dropdown-list-prices"]').contains('Tienda negocio').should('exist');
    cy.get('[data-cy="dropdown-list-prices"]').contains('f').should('exist');
  })
  it("Verify list price custom", () => {
    cy.visit("/productos/agregar");
    cy.get("#title").type("remeras");
    cy.get('[data-cy="button-2"]').should('exist')
    cy.get('[data-cy="button-2"]').should('be.visible').click();
    cy.get('body').click()
    cy.get('[data-cy="input-price"] > .p-inputtext').clear().type("500")
    cy.get('[data-cy="input-promo"]').type("300")
    cy.get('[data-cy="button-save"]').click()
    .wait(5000) 
    cy.get('[data-cy="dropdown-list-prices"]').click()

    cy.wait(2000)
    cy.get('.p-select-overlay .p-select-list-container .p-select-list .p-select-option')
    .eq(1)
    .click()

    cy.wait(2000)
    cy.get('[data-cy="input-price-product1"] .p-inputnumber-input').should('have.value', '$ 800,00').should('exist');;
    //cy.get('[data-cy="row-1"] [data-cy="column-price"] [ ').contains(800).should('exist');
    cy.wait(2000)
     cy.get('[data-cy="input-promo-product1"] .p-inputnumber-input').should('have.value', '$ 700,00').should('exist');;
  
    //cy.get('[data-cy="row-1"] [data-cy="column-promo"]').contains('$700,00').should('exist');
})
it("Minimum and maximum amount", () => {
  cy.visit("/mayorista");
  cy.wait(2000)
  cy.get('[data-cy="button-item-edit-2"]').click()
  cy.get('[data-cy="input-price_min_buy"]').click().type("2000")
  cy.get('[data-cy="input-quantity_min_buy"]').click().type("5000")
  cy.get('[data-cy="button-sumbit"]').click()
})
it("Negative minimum and maximum amount", () => {
  cy.visit("/mayorista");
  cy.wait(2000)
  cy.get('[data-cy="button-item-edit-2"]').click()
  cy.get('[data-cy="input-price_min_buy"]').click().clear().type("-2000")
  cy.wait(4000)
  cy.get('[data-cy="input-quantity_min_buy"]').click().clear().type("-5000")
  cy.get('[data-cy="button-sumbit"]').click()
})
it("Letters minimum and maximum amount", () => {
  cy.visit("/mayorista");
  cy.wait(2000)
  cy.get('[data-cy="button-item-edit-2"]').click()
  cy.get('[data-cy="input-price_min_buy"]').click().clear().type("fff")
  cy.get('[data-cy="input-quantity_min_buy"]').click().clear().type("fff")
  cy.get('[data-cy="button-sumbit"]').click()
})
it("Minium amount of purchase", () => {
  cy.visit("/productos/lista");
   cy.get('[data-cy="row-1"] > .last-column > .desktop > [data-cy="button-update"] > .p-button-icon').click()
  cy.get('[data-cy="input-quantity-min-buy"]').should('be.visible')
  cy.get('[data-cy="button-1"]').click()
  cy.get('body').click()
  cy.get('[data-cy="input-quantity-min-buy"]').should('be.visible')
})
it("Volver a estado oficial", () => {
  cy.visit("/mayorista")
  cy.wait(2000)
  cy.get('[data-cy="button-item-delete-2"]').click();
  cy.get(".data-cy-confirm").click();
  cy.wait(2000)
  cy.get('[data-cy="button-item-edit-1"]').click()
  cy.get('[data-cy="input-title"]').clear().type("Mayorista")
  cy.get('[data-cy="button-sumbit"]').click()
  cy.visit("/productos/lista");
  cy.get('[data-cy="row-1"] > .last-column > .desktop > [data-cy="button-extra"]').click();
  
  cy.get('.p-menu-list .p-menu-item').eq(1).click();

  cy.get('.p-confirmdialog-accept-button').click();
  cy.wait(2000)

  cy.get('[data-cy="row-0"] > .last-column > .desktop > [data-cy="button-extra"]').click();
  cy.get('.p-menu-list .p-menu-item').eq(1).click();
  cy.wait(2000)
  cy.get('.p-confirmdialog-accept-button').click();

  })
  
 
  it("Detelete the above", () => {
    cy.visit("/mayorista")
    cy.wait(2000)
    cy.get('[data-cy="button-item-edit-1"]').click()
    cy.get('[data-cy="input-title"]').clear().type("Mayorista")
    cy.get('[data-cy="button-sumbit"]').click()
  })



  //Menu
  it ("Verification menu", () =>{
    cy.visit("/menu");
    cy.get('[data-cy="menu-0"]').contains('Mayorista').should('exist');
  })
  //Productos
  it("Verify add products", () => {
    cy.visit("/productos/lista");
    addProduct('Producto 1', '5000','ibai2.jpeg')
  })
  it ("Verify list product", () =>{
    cy.visit("/productos/lista");
    cy.get('body').click()
    //Minorista
    cy.get('[data-cy="input-price-product0"] .p-inputnumber-input').should('have.value', '$ 1000,00').should('exist');;
    //cy.get('[data-cy="column-price"]').contains('$1.000,00').should('exist');
    cy.get('[data-cy="input-promo-product0"] .p-inputnumber-input').should('have.value', '$ 900,00').should('exist');;
    //cy.get('[data-cy="column-promo"]').contains('$900,00').should('exist');
    cy.get('[data-cy="row-0"] > .first-column > .column-product > .column-product-info > .column-product-info-hidden > .p-tag > span').contains('Visible').should('exist');
   // cy.get('[data-cy="column-status"]').contains('Visible').should('exist');

    cy.get('[data-cy="input-price-product0"] > .p-inputtext').should('have.value','$ 1000,00').should('exist');
    cy.get('[data-cy="dropdown-list-prices"]').click()
    cy.wait(2000)
    cy.get('.p-select-overlay .p-select-list-container .p-select-list .p-select-option')
    .eq(1)
    .click()
    //Mayorista
    cy.wait(2000)

    cy.get('[data-cy="input-price-product0"] .p-inputnumber-input').should('have.value', '$ 800,00').should('exist');;
    //cy.get('[data-cy="column-price"] ').contains('$800,00').should('exist');
    cy.get('[data-cy="input-promo-product0"] .p-inputnumber-input').should('have.value', '$ 700,00').should('exist');;
    //cy.get('[data-cy="column-promo"]').contains('$700,00').should('exist');
    cy.get('[data-cy="row-0"] > .first-column > .column-product > .column-product-info > .column-product-info-hidden > .p-tag > span').contains('Oculto').should('exist');

    cy.wait(2000)
  })
  //CatalogoPdf
  it ("Verify catalog Pdf", () =>{
    cy.visit("/productos/catalogo");
    cy.get('[data-cy="dropdown-list-prices"]').should('exist')
    cy.get('[data-cy="dropdown-list-prices"]').click()
    cy.get('[data-cy="dropdown-list-prices"]').should('contain',  'Minorista')
    cy.get('[data-cy="dropdown-list-prices"]').should('contain',  'Mayorista')
  }) 
  //Exportar e importar
  it("Verify import and export", () =>{
    cy.visit("/productos/masivo");
    //Exportar
    cy.get('[data-cy="dropdown-list-prices-export"]').should('exist')
    cy.get('[data-cy="dropdown-list-prices-export"]').click()
    cy.get('[data-cy="dropdown-list-prices-export"]').contains('Mayorista').should('exist');
    cy.get('[data-cy="dropdown-list-prices-export"]').contains('Minorista').should('exist');
    cy.get('[data-cy="tab-import-products"]').click()
    //Importar
    cy.get('[data-cy="tab-import-products"]').click()
    cy.get('[data-cy="dropdown-list-prices-import"]').should('exist')
    cy.get('[data-cy="dropdown-list-prices-import"]').click()
    cy.get('[data-cy="dropdown-list-prices-import"]').contains('Mayorista').should('exist');
    cy.get('[data-cy="dropdown-list-prices-import"]').contains('Minorista').should('exist');
  }) 
  /*AUmento masivo de precio
  it("Massive price increase", () =>{
    cy.visit("/productos/aumento-masivo");
    cy.get('[data-cy="input-percentage"] > .p-inputtext').clear().type('2');
    cy.get('[data-cy="select-list-prices"]').click()
    cy.get('[data-cy="item-element"]').last().click()
    cy.get('[data-cy="button-save"]').click()
    cy.get('.data-cy-accept').click()
  }) 
  it("Massive price increase on products", () =>{
    cy.visit("/productos/lista");
    cy.get('[data-cy="dropdown-list-prices"]').click()
    cy.get('.p-select-option').last().click()

    cy.wait(2000)
      cy.get('[data-cy="column-price"] > .p-inputwrapper-filled > .p-inputnumber > .p-inputnumber-input').should('have.value', '$ 800,00').should('exist');;
    
      cy.get('[data-cy="column-promo"] > .p-inputwrapper-filled > .p-inputnumber > .p-inputnumber-input').should('have.value', '$ 700,00').should('exist');;
   
     cy.get('[data-cy="row-0"] > .first-column > .column-product > .column-product-info > .column-product-info-hidden > .p-tag > span').contains('Oculto').should('exist');
    cy.wait(2000)

  }) 
  

 
  //Clientes
  it("Verify clients retail", () =>{
    cy.visit("/clientes");
    cy.get('[data-cy="button-create"]').first().click();

    cy.get('[data-cy="input-email"]').type(generateRandomHash() + "@tiendanegocio.com");
    cy.get("#float-input-password").as("passInput");
    cy.get("@passInput").type("123456");
    cy.get('[data-cy="input-name"]').type("francisco");
    cy.get('[data-cy="button-save"]').click(); 
    cy.get('[data-cy="select-list-prices"]').should('exist').click();
    cy.wait(2000)
    cy.get('[data-cy="item-2"]').contains('Minorista').should('exist');
  }) 
  
  it("Verify clients wholesaler", () =>{
    cy.visit("/clientes");
    cy.get('[data-cy="button-create"]').first().click();

    cy.get('[data-cy="input-email"]').type(generateRandomHash() + "@tiendanegocio.com");
    cy.get("#float-input-password").as("passInput");
    cy.get("@passInput").type("123456");
    cy.get('[data-cy="input-name"]').type("francisco");
    cy.get('[data-cy="select-list-prices"]').click()
    cy.get('[data-cy="item-element"]').last().click()
    cy.get('[data-cy="button-save"]').click(); 
    cy.get('[data-cy="select-list-prices"]').should('exist').click();
    cy.wait(2000)
    cy.get('[data-cy="item-3"]').contains('Mayorista').should('exist');
  }) 


  /*it("Customer filters", () =>{

    cy.visit("/clientes");
    cy.get('.header-buttons > :nth-child(2) > .desktop').should('exist');
    cy.get('.header-buttons > :nth-child(2) > .desktop').click()
    cy.get('.p-fluid > :nth-child(1) > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').click()
    cy.get('.p-fluid > :nth-child(1) > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').should('exist');
    cy.get('[data-cy="order-total_count_buy-asc"]').click()
    cy.get('[label="Filtrar clientes"] > .p-button').click()
    cy.wait(2000)
      cy.get('.header-buttons > :nth-child(2) > .desktop').click()
      cy.get('.p-fluid > :nth-child(1) > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').click()
    cy.get('[data-cy="order-name-asc"]').click()
     cy.get('[label="Filtrar clientes"] > .p-button').click()
    cy.wait(2000)
     cy.get('.header-buttons > :nth-child(2) > .desktop').click()
      cy.get('.p-fluid > :nth-child(1) > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').click()
    cy.get('[data-cy="order-name-desc"]').click()
     cy.get('[label="Filtrar clientes"] > .p-button').click()
    cy.wait(3000)
     cy.get('.header-buttons > :nth-child(2) > .desktop').click()
   
    cy.get('[aria-label="Tiene newsletter"]').click()
       cy.get('[label="Filtrar clientes"] > .p-button').click()
    cy.wait(2000)
     cy.get('.header-buttons > :nth-child(2) > .desktop').click()
cy.get('[styleclass="p-button-outlined "] > .p-button-outlined').click()
cy.get('[label="Filtrar clientes"] > .p-button').click()

//
    cy.get('.header-buttons > :nth-child(2) > .desktop').click()
  
    cy.get('[aria-label="No tiene newsletter"]').click()

       cy.get('[label="Filtrar clientes"] > .p-button').click()
    cy.wait(2000)
     cy.get('.header-buttons > :nth-child(2) > .desktop').click()
   
    cy.get(':nth-child(3) > .ng-untouched > .p-selectbutton > .p-highlight').click()
       cy.get('[label="Filtrar clientes"] > .p-button').click()
       cy.wait(3000)
     
    cy.get('.header-buttons > :nth-child(2) > .desktop').click()
    cy.get('[aria-label="Compró"]').click()
       cy.get('[label="Filtrar clientes"] > .p-button').click()
    cy.wait(2000)
     cy.get('.header-buttons > :nth-child(2) > .desktop').click()
    cy.get('[aria-label="No compró"]').click()
       cy.get('[label="Filtrar clientes"] > .p-button').click()
    cy.wait(2000)
    cy.get('.header-buttons > :nth-child(2) > .desktop').click()
    cy.get(':nth-child(4) > .ng-untouched > .p-selectbutton > .p-highlight').click()
       cy.get('[label="Filtrar clientes"] > .p-button').click()
    cy.wait(3000)   
    cy.get('.header-buttons > :nth-child(2) > .desktop').click()
    cy.get('[aria-label="Se contactó"]').click()
       cy.get('[label="Filtrar clientes"] > .p-button').click()
    cy.wait(2000)
      cy.get('.header-buttons > :nth-child(2) > .desktop').click()
    cy.get('[aria-label="No se contactó"]').click()
       cy.get('[label="Filtrar clientes"] > .p-button').click()
    cy.wait(2000)
     cy.get('.header-buttons > :nth-child(2) > .desktop').click()
      cy.get('[label="Filtrar clientes"] > .p-button').click()
       cy.get('.header-buttons > :nth-child(2) > .desktop').click()
cy.get('[styleclass="p-button-outlined "] > .p-button-outlined').click()
 cy.get('[label="Filtrar clientes"] > .p-button').click()
  }) 
  */
  //Desactivar mayorista
  it("Desactive wholesale", () =>{
    cy.visit("/mayorista");
    cy.wait(2000)
    cy.get(".data-cy-button").click()
    cy.get('.data-cy-confirm').click()
  })
  //Todo sin mayorista
  it("no wholesale", () =>{
    //Menu
    cy.visit("/menu");
    cy.get('[data-cy="menu-0"]').contains('Mayorista').should('not.exist');
    //Productos
    cy.visit("/productos/agregar");
    cy.get('[data-cy="button-0"]').should('not.exist')
    cy.get('[data-cy="button-1"]').should('not.exist')
    cy.visit("/productos/lista");
    cy.get('[data-cy="column-list-prices"]').should('not.exist');
    noVerify()
    //CatalogoPdf
    cy.visit("/productos/catalogo");
    noVerify()
    //Productos masivos   
    cy.visit("/productos/masivo");
    cy.get('[data-cy="dropdown-list-prices-export"]').should('not.exist')
    cy.get('[data-cy="dropdown-list-prices-import"]').should('not.exist')
    //Aumento masivo
    cy.visit("/productos/aumento-masivo");
    noVerify()
    //Clientes
    cy.visit("/clientes");
    noVerify()
    cy.get('[data-cy="dropdown-list-prices"]').should('not.exist');
  })
  
  
})
function verify (){
  cy.get('[data-cy="select-list-prices"]').should('exist')
  cy.get('[data-cy="dropdown-list-prices"]').click()
  cy.get('[data-cy="dropdown-list-prices"]').contains('Mayorista').should('exist');
  cy.get('[data-cy="dropdown-list-prices"]').contains('Minorista').should('exist');
}
function noVerify (){
  cy.get('[data-cy="select-list-prices"]').should('not.exist')
}
function priceList(){
  cy.visit("/mayorista");
  cy.get('[data-cy="button-create"]').click()
  cy.get('[data-cy="input-title"]').type("Para los capos")
  cy.get('[data-cy="button-sumbit"]').click()
}

function addProduct(){
  cy.get('[data-cy="button-add"]').eq(1).click()
  cy.get("#title").type("remeras");
  cy.get('[data-cy="button-0"]').should('exist')
  cy.get('body').click()
  cy.get('[data-cy="input-price"] .p-inputnumber-input').clear().type("1000")
  cy.get('[data-cy="input-promo"] .p-inputnumber-input').type("900")
  cy.get('[data-cy="button-1"]').should('exist')
  cy.get('[data-cy="button-1"]').click()
  cy.get('body').click()
  cy.get('[data-cy="input-price"] .p-inputnumber-input').clear().type("800")
  cy.get('[data-cy="input-promo"] .p-inputnumber-input').type("700")
  cy.get('[data-cy="button-save"]').click()
  .wait(5000) 
}




function generateRandomHash() {
  return (+new Date()).toString(36);
}