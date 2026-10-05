const url = "http://192.168.0.61:3002/api/v1"

describe('Productos-Pesos y dimensiones', () => {

  before(()=>{
    cy.registerUser();
  })

  beforeEach(()=>{
    cy.login();
  })
  it("visit page", () => {
    cy.visit("/productos/agregar");
  })
//weight
  it("negative weight", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-weight"]').type("-777777");
    nombre()

    cy.get('[data-cy="button-save"]').click();
  })
  it("positive weight", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-weight"]').type("777");
    nombre()

    cy.get('[data-cy="button-save"]').click();
  })
  it("letters in weight", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-weight"]').type("fffffff");
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })
//height
  it("negative height", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-height"]').type("-777777");
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })
  it("positive height", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-height"]').type("777");
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })
  it("letters in height", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-height"]').type("fffff");
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })
//width
  it("negative width", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-width"]').type("-777777");
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })
  it("positive width", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-width"]').type("777");
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })
  it("letters in width", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-width"]').type("fffff");
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })
  //depth
  it("negative depth", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-depth"]').type("-777777");
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })
  it("positive depth", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-depth"]').type("777");
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })
  it("letters in depth", () => {
   
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-depth"]').type("fffff");
    nombre()
    cy.get('[data-cy="button-save"]').click();
  })
  //Empty inputs
  it("empty inputs", () => {
    cy.visit("/productos/agregar");
    cy.get('[data-cy="input-weight"]').type("-777777").clear();
    cy.get('[data-cy="input-height"]').type("-777777").clear();
    cy.get('[data-cy="input-width"]').type("-777777").clear();
    cy.get('[data-cy="input-depth"]').type("-777777").clear();
    nombre()
    cy.get('[data-cy="button-save"]').click();
    
  })
  
 
  
})
function nombre() {
    cy.get('[data-cy="input-title"]').as("titulo");
    cy.get("@titulo").type((+new Date()).toString(36), {force:true});
  }
  function generateRandomHash() {
    return (+new Date()).toString(36);
  }