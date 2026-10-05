const url = "https://paneltest.tiendanegocio.com/#/catalogo"
var user = {};

describe("Catalogo PDF", () => {

  before(() => {
    cy.registerUser({
        complete_tutorial: true,
        assign_design: true
    }).then(($user)=>{
      user = $user;
    });
  });

  beforeEach(() => {
    cy.login(); 
  })

  it('visit page', () => {
    cy.visit('productos/catalogo');
    cy.url().should('include', 'productos/catalogo');
  })

  it('check dropdown filter', () => {
    addProd('asdfghjk', 'asajsjds');
    cy.wait(2000);
    cy.visit('productos/catalogo');
    cy.get('[data-cy="dropdown-filterType"]').click();
    cy.get('.p-select-list').should('exist');
    
})
  it('check dropdown order by', () => {
    addProd('asdfghjka', 'asajsjdss');
    cy.wait(2000);
    cy.visit('productos/catalogo');
    cy.get('[data-cy="dropdown-orderBy"]').click();
    cy.get('.p-select-list').should('exist');
    
})

it('check PDF is downloaded', () => {
  addProd('titulo', 'descripcion');
  cy.wait(2000);
  cy.visit('productos/catalogo');
  cy.get('[data-cy="button-export"]').click();
  cy.wait(10000)
  cy.readFile(`cypress/downloads/${user.title} - Catalogo de productos.pdf`).should('exist');
})

it('check that PDF content is correct (specific category)', () => {
  addProd('tituloTest-Producto123', 'descripcion', 'Remeras');
  cy.wait(2000)
  addProd('tituloTest-Categoria123', 'descripcion', 'Lompas');
  cy.wait(2000);
  cy.visit('/productos/lista')
  cy.get('[data-cy="change-visibility"]').click({multiple:true})
  cy.get('[data-cy="change-visibility"]').first().click(  )
  cy.get('[data-cy="button-update"]').eq(0).click()
  cy.get('[data-cy="category-0"]').click()
  cy.get('.p-select-option').eq(3).click()
  cy.get('[data-cy="button-save"]').click()
  cy.wait(2000)
  cy.visit('productos/catalogo');
  cy.wait(2000)
  cy.get('[data-cy="dropdown-filterType"]').click();
  cy.get('[data-cy="type-category"]').click();
  cy.wait(2000);
  cy.get('[data-cy="select-category-ids"]').click()
  cy.wait(2000)
  cy.get('.p-checkbox-box').eq('4').click({force:true});
  cy.get('[data-cy="button-export"]').click({force: true}); 
  cy.wait(10000)
  
  cy.task('readPdf', `./cypress/downloads/${user.title} - Catalogo de productos.pdf`)
  .should('contain',"tituloTest");


})

it('check that PDF content is correct (specific product)', () => {
  //addProd('tituloTest-EsteNo', 'descripcion', 'Remeras');
  //addProd('tituloTest-Producto123', 'descripcion', 'Remeras');
  cy.wait(5000);
  cy.visit('productos/catalogo');
  cy.get('[data-cy="dropdown-filterType"]').click();
  cy.get('[data-cy="type-product"]').click();
  cy.wait(2000);
  cy.get('[data-cy="select-include-product"]').click();
  cy.wait(2000);
  cy.get('.p-checkbox-box').eq('2').click({force:true});
  cy.get('[data-cy="button-export"]').click({force: true});
  
  cy.wait(10000)
  cy.task('readPdf', `./cypress/downloads/${user.title} - Catalogo de productos.pdf`)
  .should('contain', 'tituloTest')
})

  function addProd(name, desc, categoria){

      cy.visit('categorias');
      cy.wait(3000)
      cy.get('[data-cy="button-create"]').click();
      
      cy.wait(3000);
      cy.get('[data-cy="input-category"]').last().type(`${categoria}`);
      cy.get('[data-cy="button-save"]').click();
    cy.wait(2000)
    cy.visit('productos/agregar');
    cy.get('[data-cy="input-title"]').clear().type(`${name}`);
    //cy.get('.ql-editor').type(`${desc}`);
    if(categoria){
      cy.get('[data-cy="category-0"]').click();
      cy.get('input[type=checkbox]').last().click({force: true} );
    }
    cy.get('[data-cy="button-save"]').click();

    
   }


})

