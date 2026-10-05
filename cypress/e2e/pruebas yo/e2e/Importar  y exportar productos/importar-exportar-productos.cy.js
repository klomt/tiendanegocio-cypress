const url = "https://apitest.tiendanegocio.com/api/v1";


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

  it('Importar productos',()=>{
    cy.visit('productos/masivo')
    cy.get('[data-cy="tab-import-products"]').click()
    cy.get('input[type="file"][data-pc-section="input"]').attachFile("listado_de_producto.xlsx")
    cy.wait(2000)
    cy.get('[data-cy="button-preview"]').click()
    cy.get('[data-cy="button-confirm-import"]').click()
    cy.get('.p-button-success').last().click()
    cy.wait(2000)
    cy.visit('productos/lista')
    cy.get('[data-cy="row-5"]').should('contain.text','Producto 2')
  })
  it('Exportar productos',()=>{
    cy.visit('productos/masivo')
    cy.get('.body_form_actions').click()
    cy.readFile(`cypress/downloads/listado_de_producto.xlsx`).should('exist');
  })
 
  
  
})