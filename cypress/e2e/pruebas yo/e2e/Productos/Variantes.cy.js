const url = "https://paneltest.tiendanegocio.com/#/productos/variantes"

describe('variantes', () => {

  before(()=>{
    cy.registerUser();
  })
  beforeEach(()=>{
    cy.login();
  })
  it("variants button", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="button-add-variant"]').click()
  })
  it("property", () => {
    cy.visit("/productos/agregar");

    cy.get('[data-cy="button-add-variant"]').click({force:true})
    cy.get('[data-cy="button-add-variant-property"]').click()

  })
  
  it("dropdown", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="button-add-variant"]').click()
    cy.get('[data-cy="button-add-variant-property"]').click()
    cy.get('[data-cy="select-properties"]').click()
    cy.wait(2000)
    cy.get('.p-select-option').eq(0).click()
  })
  it("options property", () => {
    addVariant()
    cy.get('.p-select-option').eq(0).click()
    cy.get('[data-cy="name-property"]').first().click().type("Medida {enter}")
    cy.get('[data-cy="name-property"]').eq(1).click().type('Xl {enter}')
    cy.get('[data-cy="name-property"]').eq(2).click().type('L {enter}')
  })
  it("limit 3 variants", () => {
    addVariant()
    cy.get('.p-select-option').eq(0).click()
    cy.get('[data-cy="button-select-all-properties"]').first().click()
    cy.get('[data-cy="button-save-changes"]').click()
    cy.get('.closeButton >').first().click({force: true})
    addVariant()
    cy.get('.p-select-option').eq(0).click()
    cy.get('[data-cy="button-select-all-properties"]').first().click()
    cy.get('[data-cy="button-save-changes"]').click()
    cy.get('.closeButton >').first().click({force: true})
    addVariant()
    cy.get('.p-select-option').eq(0).click()
    cy.get('[data-cy="button-select-all-properties"]').first().click()
    cy.get('[data-cy="button-save-changes"]').click()
    cy.get('.closeButton >').first().click({force:true})

    cy.get('[data-cy="button-add-variant"]').should('contain', 'Editar variantes');
  })
 
  it("delete property", () => {
    addVariant()
    cy.get('.p-select-option').eq(0).click()
    cy.get('[data-cy="name-property"]').first().click().type("Medida")
    cy.get('[data-cy="button-delete-property"]').click()

  })
  it("verify delete property", () => {
    addVariant()
    cy.get('.p-select-option').eq(0).click()
    cy.get('[data-cy="name-property"]').first().click().type("Medida")
    cy.get('[data-cy="button-delete-property"]').click()
    cy.get('[data-cy="name-property"]').should('not.exist')

  })
 

  it("variants created", () => {
    cy.visit("/productos/agregar");
    image();
    addVariant()
    cy.get('.p-select-option').eq(2).click()
    cy.get('[data-cy="input-new-properties"]').type("Tipo")
    cy.get('[data-cy="name-property"]').click().type('Xl {enter}')
    cy.get('[data-cy="button-save-changes"]').click()
    cy.get('.closeButton').first().click()

    cy.get('[data-cy="button-variant-img"]').click()
    cy.get('[data-cy="image-0"]').click()
    cy.get('[data-cy="button-image-save"]').click()
    cy.get('[data-cy="input-variant-stock"]').click().type(10)
    cy.get('[data-cy="variant-price"]').click().type("777")
    cy.get('[data-cy="input-variant-promo"]').click().type("500")
    cy.get('[data-cy="button-variant-status"]').click()
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })

  it("copy buttons", () => {
    cy.visit("/productos/agregar");
    image();

   

    addVariant()
    cy.get('.p-select-option').eq(3).click()
    cy.get('[data-cy="input-new-properties"]').type("Dimensiones")
    cy.get('[data-cy="name-property"]').eq(0).click().type('Xl {enter}')
    cy.get('[data-cy="name-property"]').eq(1).click().type('L {enter}')
    cy.get('[data-cy="name-property"]').eq(2).click().type('S {enter}')
    cy.get('[data-cy="button-save-changes"]').click()
    cy.get('.closeButton').first().click()
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="button-variant-img"]').click()
    cy.get('[data-cy="image-0"]').click()
    cy.get('[data-cy="button-image-save"]').click()
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="input-variant-stock"]').click().type(10)
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="variant-price"]').click().type("777")
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="button-variant-price-copy"]').click()
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="input-variant-promo"]').click().type("500")
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="button-variant-promo-copy"]').click()
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="button-variant-status"]').click()
    nombre()

    cy.get('[data-cy="button-save"]').click();
  })

  it("add categorias", () => {
     cy.visit("/categorias");
     cy.wait(2000)
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="input-category"]').type("f")
    cy.get('[data-cy="button-save"]').click()
    cy.get("p-toastitem").as("alertok");
    cy.get("@alertok");
  
  })

  it("verify add products", () => {
    cy.visit("/productos/lista");
    cy.get('[data-cy="button-update"]').first().click()
    cy.get('.properties-container').first().contains(' Dimensiones ').should("have.text"," Dimensiones ")

    cy.get('[data-cy="button-save"]').click();
  })
  it("verify copy buttons", () => {
    cy.visit("/productos/agregar");
    cy.visit("/productos/agregar");
    image();

    addVariant()
    cy.get('.p-select-option').eq(4).click()
    cy.get('[data-cy="input-new-properties"]').type("Dimensiones2")
    cy.get('[data-cy="name-property"]').eq(0).click().type('Xl {enter}')
    cy.get('[data-cy="name-property"]').eq(1).click().type('L {enter}')
    cy.get('[data-cy="name-property"]').eq(2).click().type('S {enter}')
    cy.get('[data-cy="button-save-changes"]').click()
    cy.get('.closeButton').first().click()
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="button-variant-img"]').click()
    cy.get('[data-cy="image-0"]').click()
    cy.get('[data-cy="button-image-save"]').click()
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="input-variant-stock"]').click().type(10)
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="variant-price"]').click().type("777")
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="button-variant-price-copy"]').click()
    cy.get('[data-cy="variant-row-1"]').find('[data-cy="variant-price"]').should("have.attr", "data-value-cy", "777");
    cy.get('[data-cy="variant-row-2"]').find('[data-cy="variant-price"]').should("have.attr", "data-value-cy", "777");
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="input-variant-promo"]').click().type("500")
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="button-variant-promo-copy"]').click()
    cy.get('[data-cy="variant-row-1"]').find('[data-cy="input-variant-promo"]').should("have.attr", "data-value-cy", "500");
    cy.get('[data-cy="variant-row-2"]').find('[data-cy="input-variant-promo"]').should("have.attr", "data-value-cy", "500");
    cy.get('[data-cy="variant-row-0"]').find('[data-cy="button-variant-status"]').click()
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })

  
  it("verify rows", () => {

    cy.visit("/productos/agregar");
  cy.get('[data-cy="button-add-variant"]').click()
  cy.wait(2000)
     cy.get('p-button.ng-star-inserted > .p-button').click()
     cy.get('.p-col-12 > .ng-untouched > .p-dropdown > .p-dropdown-label').click()
       cy.get(':nth-child(1) > .p-dropdown-item').click()
  cy.get(':nth-child(7) > .ng-untouched > .p-checkbox > .p-checkbox-box').click()
  cy.get(':nth-child(6) > .ng-untouched > .p-checkbox > .p-checkbox-box').click()
  cy.get(':nth-child(4) > .ng-untouched > .p-checkbox > .p-checkbox-box').click()
    validez()
 cy.get('.sidebar-footer > p-button > .p-button').click()
 cy.wait(2000)
     cy.get('p-sidebar.ng-tns-c88-22 > .ng-trigger > .p-sidebar-content > .p-sidebar-close').click()
       cy.wait(2000)
    cy.get('[data-cy="variant-row-0"]').should('exist');
    cy.get('[data-cy="variant-row-1"]').should('exist');
    cy.get('[data-cy="variant-row-2"]').should('exist');
  })
 
  it("verify table change", () => {
    addVariant()
    cy.get('.p-select-option').eq(5).click()
    cy.get('[data-cy="input-new-properties"]').type("Dimensiones3")
    cy.get('[data-cy="name-property"]').type('Xl {enter}')
    cy.get('[data-cy="button-save-changes"]').click()
    cy.get('.closeButton >').first().click({force: true})

    addVariant()
    cy.get('.p-select-option').eq(5).click()
    cy.get('[data-cy="input-new-properties"]').type("Tipo2")
    cy.get('[data-cy="name-property"]').type('L {enter}')
    cy.get('[data-cy="button-save-changes"]').click()
    cy.get('.closeButton >').first().click({force: true})

    addVariant()
    cy.get('.p-select-option').eq(5).click()
    cy.get('[data-cy="input-new-properties"]').type("Modelo")
    cy.get('[data-cy="name-property"]').type('S {enter}')
    cy.get('[data-cy="button-save-changes"]').click()
    cy.get('.closeButton >').first().click({force: true})
    
    cy.get('[data-cy="variant-row-0"] > [data-cy="text-variant-title"]').contains('Xl')
    cy.get('[data-cy="variant-row-0"] > [data-cy="text-variant-title"]').contains('L')
      cy.get('[data-cy="variant-row-0"] > [data-cy="text-variant-title"]').contains('S')
  
    
  })
  /*it("delete individual items", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="button-add-variant"]').click()


 cy.get('p-button.ng-star-inserted > .p-button').click()
     cy.get('.p-col-12 > .ng-untouched > .p-dropdown > .p-dropdown-label').click()
       cy.get(':nth-child(1) > .p-dropdown-item').click()
  cy.get(':nth-child(7) > .ng-untouched > .p-checkbox > .p-checkbox-box').click()
  cy.get('.sidebar-footer > p-button > .p-button').click()

 cy.get('p-button.ng-star-inserted > .p-button').click()
     cy.get('.p-col-12 > .ng-untouched > .p-dropdown > .p-dropdown-label').click()
       cy.get(':nth-child(1) > .p-dropdown-item').click()
  cy.get(':nth-child(4) > .ng-untouched > .p-checkbox > .p-checkbox-box').click()
    cy.get('.sidebar-footer > p-button > .p-button').click()
    cy.wait(1000)

    cy.get(':nth-child(2) > :nth-child(2) > p-button > .p-button-danger').click()


    cy.get('[data-cy="button-add-variant-property"]').click().type("Dimensiones")
    cy.get('[data-cy="chips-options-0"]').click().type('L {enter}')
    cy.get('[data-cy="chips-options-0"]').first().find(".p-chips-token-icon.pi.pi-times-circle.ng-star-inserted").click()
  })*/

  
  
  
})
//Funciones
function nombre() {
  cy.get("#title").as("titulo");
  cy.get("@titulo").type((+new Date()).toString(36));
}
function image(){
  cy.intercept({
    method: "POST", 
    url: `https://apitest.tiendanegocio.com/api/v1/gift/admin/image`,
  }).as("uploadRequest");
  cy.get('[data-cy="input-inner-upload"]').attachFile('yuumi.jpg');
 //cy.wait('@uploadRequest');
  cy.get("p-toastitem").as("alertok");
  cy.get("@alertok");
}
/*function validez (){
  cy.get(".p-message-wrapper").as("alertok");
  cy.get("@alertok");
}*/


function addVariant(){
    cy.visit("/productos/agregar");
    cy.get('[data-cy="button-add-variant"]').click()
    cy.get('[data-cy="button-add-variant-property"]').click()
    cy.get('[data-cy="select-properties"]').click()
    cy.wait(2000)
}