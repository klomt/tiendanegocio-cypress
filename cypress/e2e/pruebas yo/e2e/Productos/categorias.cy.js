const url = "http://192.168.0.61:3002/api/v1"

describe('informacion basica', () => {

  before(()=>{
    cy.registerUser();
  })

  beforeEach(()=>{
    cy.login();
  })
  it("add category", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="button-create"]').click()
    cy.wait(2000)
    cy.get('[data-cy="button-select-0"]').click()
    cy.get('[data-cy="button-save"]').click();
  })
  it("product categories", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').type('Producto 1')
    cy.get('[data-cy="category-0"]').click()
    cy.get('.p-select-option').eq(0).click({force : true})
    cy.get('[data-cy="button-save"]').click();
  })

  /*
  it("add the categories", () => {
    cy.visit("/productos/agregar");
    nombre()
    addCategory()
  })
  */

  it("subcategory", () => {
    cy.visit("/productos/agregar");
    nombre()
    cy.get('[data-cy="category-0"]').click()
    cy.get('.p-select-option').eq(0).click({force : true})
    cy.get('[data-cy="category-1"]').click()
    cy.get('.p-select-option').eq(0).click({force : true})
    cy.get('[data-cy="button-save"]').click();
  })

  
   
  

    
  
})
function addCategory(){
  cy.get('[data-cy="category-0"]').click()
  cy.get('.p-dropdown-item').eq(0).click({force : true})
  cy.get('[data-cy="button-category-add"]').click()
  cy.get('[data-cy="categories-1"] > [data-cy="category-0"] > .p-dropdown > .p-dropdown-label').click()
  cy.get('.p-dropdown-item').eq(1).click({ force: true })
  cy.get('[data-cy="button-category-add"]').click()
  cy.get('[data-cy="categories-2"]').click()
  cy.get(':nth-child(3) > .p-dropdown-item').click({force : true})
  cy.get('[data-cy="button-save"]').click();
}
function nombre() {
  cy.get('[data-cy="input-title"]').as("titulo");
  cy.get("@titulo").type((+new Date()).toString(36));
}