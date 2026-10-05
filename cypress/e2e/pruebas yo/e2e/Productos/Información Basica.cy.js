const url = "http://192.168.0.61:3002/api/v1"

describe('informacion basica', () => {

  before(()=>{
    cy.registerUser();
  })

  beforeEach(()=>{
    cy.login();
  })
  it("visit page", () => {
    cy.visit("/productos/agregar");
  })
  //Name
  it("long name", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').generateRandomText(100)
    cy.get('[data-cy="button-save"]').click();

  })
  it("name empty", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').type("remera").clear()
    cy.get('[data-cy="button-save"]').click();
  })
  it("rare symbology in name", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').type("⇢ ๑ ◞♡ ⸙͎ ˀˀ ♡")
    cy.get('[data-cy="button-save"]').click();
  })
  //Description
  it("long description", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').type("remera")
    cy.wait(4000)
    cy.get('.tox-edit-area__iframe').as("descripcion")
    cy.get('@descripcion').generateRandomText(100)
    cy.get('[data-cy="button-save"]').click();
  })
  it("description empty", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').type("remera")
    cy.get('.tox-edit-area__iframe').as("descripcion")
    cy.get('[data-cy="button-save"]').click();
  })
  it("rare symbology in description", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').type("remera")
    cy.get('.tox-edit-area__iframe').as("descripcion")
    cy.get('@descripcion').type("⇢ ๑ ◞♡ ⸙͎ ˀˀ ♡", {force:true})
    cy.get('[data-cy="button-save"]').click();
  })
  //Sku
  it("full sku", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').type("remera")
    cy.get('[data-cy="input-sku"]').type("remera")
    cy.get('[data-cy="button-save"]').click();
  })
  it("repeated sku", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').type("remera")
    cy.get('[data-cy="input-sku"]').type("remera")
    cy.get('[data-cy="button-save"]').click();
  })
  it("large sku", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').type("remera")
    cy.get('[data-cy="input-sku"]').generateRandomText(100)
    cy.get('[data-cy="button-save"]').click();
  })
  it("rare symbology in sku", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-title"]').type("remera")
    cy.get('[data-cy="input-sku"]').type("⇢ ๑ ◞♡ ⸙͎ ˀˀ ♡")
    cy.get('[data-cy="button-save"]').click();
  })
 

})