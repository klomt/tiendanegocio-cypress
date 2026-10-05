const url = "https://paneltest.tiendanegocio.com/#/dashboard"

const credentials = {};

describe("Tutorial de inicio a fin", () => {
  before(() => {
    cy.registerUser().then((newAdmin) => {
      credentials.email = newAdmin.email;
      credentials.password = newAdmin.password;
    });
  });
  beforeEach(() => {
    cy.login(credentials);
  });

  it("visit page", () => {
    cy.visit("/dashboard");

    //page choose your design
    cy.visit("/lista-de-disenos");
    cy.get('[data-cy="item-3"]').as("buttonInput");
    cy.get("@buttonInput")
      .realHover("mouse")
      .wait(4000)
      .find('[data-cy="button-create"]').click();
    cy.get('[data-cy="dialog-congratulation"]').as("alertError");

    cy.get('[data-cy="button-ok"]').click();
    cy.get('[data-cy="button-back"]').click();
    //page categories
    cy.visit("/categorias");
    cy.get('[data-cy="button-create"]').click();
    cy.get('[data-cy="input-category"]').as("categoryInput");
    cy.get("@categoryInput").type("fffffffff");
    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-congratulation"]').as("alertError");
    //page add products
    cy.get('[data-cy="button-ok"]').click();
    cy.get('[data-cy="search-bar-products"]').type('jjjj');

    cy.get('[data-cy="button-add"]').eq(1).click();
    
    cy.get('[data-cy="input-title"]').as("nombreInput");
    cy.get("@nombreInput").type("remeras");
    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-congratulation"]').as("alertError");
    cy.get('[data-cy="button-ok"]').click();
    cy.visit("/dashboard");
    //page shipping methods
    cy.get("#step-5").as("pageInput");
    cy.get('#step-5').click();




    cy.get('[data-cy="method-custom"]').click();
    cy.get('[data-cy="input-title"]').as("nombreInput");
    cy.get("@nombreInput").type("avellaneda");
    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-congratulation"]').as("alertError");
    cy.get('[data-cy="button-ok"]').click();
    cy.visit("/dashboard");
    //page payment methods
    cy.get("#step-6").as("pageInput");
    cy.get("@pageInput").click();
    cy.get('[data-cy="method-0"]').click();
    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-congratulation"]').as("alertError");
    cy.get('[data-cy="button-ok"]').click();
    cy.visit("/dashboard");
    cy.get('[data-cy="el-banners"]').as("alertError");
  });
});
