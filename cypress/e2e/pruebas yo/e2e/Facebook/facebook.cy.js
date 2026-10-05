const url = "https://paneltest.tiendanegocio.com/#/facebook"

describe('Facebook pixel', () => {

  before(()=>{
    cy.registerUser();
  })

  beforeEach(()=>{
    cy.login();
  })
  it("input empty", () => {
    cy.visit("/configuraciones/facebook");
    cy.get("#facebook_pixel_code").as("fcpixel");
    cy.get("@fcpixel").type("sss").clear();
    cy.get('[data-cy="button-save"]').click();
  })
  it("input large", () => {
    cy.visit("/configuraciones/facebook");
    cy.get("#facebook_pixel_code").as("fcpixel");
    cy.get("@fcpixel").generateRandomText(1000)
    cy.get('[data-cy="button-save"]').click();
  })
  it("input short", () => {
    cy.visit("/configuraciones/facebook");
    cy.get("#facebook_pixel_code").as("fcpixel");
    cy.get("@fcpixel").clear().type("s");
    cy.get('[data-cy="button-save"]').click();
  })
  it("link in a input", () => {
    cy.visit("/configuraciones/facebook");
    cy.get("#facebook_pixel_code").as("fcpixel");
    cy.get("@fcpixel").clear().type("https://www.youtube.com/watch?v=flpSr1TYp5o&list=RDflpSr1TYp5o&start_radio=1");
    cy.get('[data-cy="button-save"]').click();
  }) 

})