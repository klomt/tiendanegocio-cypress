const url = "http://192.168.0.61:3002/api/v1"

describe('Categorias', () => {

  before(()=>{
    cy.registerUser({
        complete_tutorial: true, 
        default_plan_id: 3
    });
  })
  beforeEach(()=>{
    cy.login();
  })
  it("template example", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="button-create"]').click()
    cy.wait(2000)
    cy.get('[data-cy="button-select-0"]').click()
    cy.get('[data-cy="button-save"]').click();
    cy.get("p-toastitem").as("alertok");
    cy.get("@alertok");
    cy.wait(2000)
    cy.get('[data-cy="more-options-category"]').first().click()
    cy.get('.p-menu-item-link').last().click() 
    cy.get('[data-cy="more-options-category"]').first().click()
    cy.get('.p-menu-item-link').last().click() 
    cy.get('[data-cy="more-options-category"]').first().click()
    cy.get('.p-menu-item-link').last().click() 
    cy.get('[data-cy="button-save"]').click()
  })
  it("Input category short", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="input-category"]').type("f")
    cy.get('[data-cy="button-save"]').click()
    cy.get("p-toastitem").as("alertok");
    cy.get("@alertok");
    cy.wait(2000)
    cy.get('[data-cy="input-category"]').first().click()         
    cy.get('[data-cy="more-options-category"]').click() 
    cy.get('.p-menu-item-link').last().click()
    cy.get('[data-cy="button-save"]').click()
  })

  it("Input category large", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="input-category"]').generateRandomText(100)
    cy.get('[data-cy="button-save"]').click()
    cy.get("p-toastitem").as("alertok");
    cy.get("@alertok");
  })
  it("Subcategory", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="input-category"]').type("f")    
    cy.get('[data-cy="button-save"]').click()
    cy.wait(2000)
    cy.get('[data-cy="more-options-category"]').click()
    cy.get('.p-menu-item-link').first().click({force: true})
    cy.wait(2000)
    addCategory()
  })
it("add category input", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="input-category"]').eq(1).type("Ropa")
    cy.get('[data-cy="button-save"]').click()
    cy.get("p-toastitem").as("alertok");
    cy.get("@alertok");
    cy.wait(2000)
    cy.get('[data-cy="input-category"]').first().click()
    cy.get('[data-cy="more-options-category"]').eq(1).click()
    cy.get('.p-menu-item-link').last().click()
   
  })


it("Subcategory excesive", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="input-category"]').first().click()
    cy.get('[data-cy="more-options-category"]').first().click()
    cy.get('.p-menu-item-link').first().click()
    cy.get('[data-cy="input-category"]').last().type("Que miras?")
    cy.get('[data-cy="button-save"]').click();
  })
  it("delete subcategory", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="input-category"]').first().click()
    cy.get('[data-cy="more-options-category"]').first().click()
    cy.get('.p-menu-item-link').first().click() 
    cy.get('[data-cy="input-category"]').last().type("No me borres")
    cy.get('[data-cy="more-options-category"]').last().click()
    cy.get('.p-menu-item-link').last().click() 
  })   
  
  it("button edit", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="input-category"]').first().click()
    cy.get('[data-cy="more-options-category"]').first().click()
    cy.get('.p-menu-item-link').eq(1).click()
    cy.get('[data-cy="input-title"]').clear().type("Ropa para mayores")
    cy.get('[data-cy="input-slug"]').clear().type("RopaParaMayores")
    cy.get('[data-cy="button-save"]').click()
    cy.get("p-toastitem").as("alertok");
    cy.get("@alertok");
  })
  it("button delete", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="more-options-category"]').first().click()
    cy.get('.p-menu-item-link').last().click()
    cy.get('[data-cy="button-save"]').click()
  })
  it("button sort", () => {
    cy.visit("/categorias");
    for(let i=0; i<=2;i++){
      cy.get('[data-cy="button-create"]').click()
    }
    cy.get('[data-cy="input-category"]').first().type("D")
    cy.get('[data-cy="input-category"]').eq(1).type("C")
    cy.get('[data-cy="input-category"]').last().type("A")
    cy.get('[data-cy="button-sort"]').click()
    cy.get('.p-button-success').last().click()
    cy.wait(2000)
    cy.get('[data-cy="input-category"]').first().should("have.value", "A")
    cy.get('[data-cy="input-category"]').eq(1).should("have.value", "C")
    cy.get('[data-cy="input-category"]').last().should("have.value", "D")
    cy.get('[data-cy="button-save"]').click()
  })
it("button add and button revert", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="button-create"]').click()
    cy.get('[data-cy="input-category"]').last().type("Que miras?")
    cy.get('[data-cy="button-revert"]').click()
    cy.get('.p-confirmdialog-accept-button').click()
  })
  it("maximize and minimize button", () => {
    cy.visit("/categorias");
    cy.get('[data-cy="more-options-category"]').first().click()
    cy.get('.p-menu-item-link').first().click() 
    cy.get('[data-cy="checkbox-category"]').click()
    cy.wait(2000)
    cy.get('[data-cy="checkbox-category"]').click()
  })
})
 function addCategory(){
    cy.get('[data-cy="input-category"]').eq(1).type('fffff')
    cy.get('[data-cy="button-save"]').click()
    
 }
