const url = "https://apitest.tiendanegocio.com/api/v1";
let img;

describe("Imagenes", () => {
  before(() => {
    cy.registerUser();
  });

  beforeEach(() => {
    cy.login();
  });

  it('visit page', () => {
    cy.wait(1000);
    cy.visit('/productos/agregar');
    cy.url().should('include', 'productos/agregar')
  });
  
  it('add image', () => {
    cy.visit('/productos/agregar');
             
    
    cy.wait(2000);

    cy.get('[data-cy="input-inner-upload"]').attachFile("yuumi.jpg");
    cy.intercept({
        method: "POST",
        url: `${url}/gift/admin/image`,
    }).as("uploadRequest");
    cy.wait("@uploadRequest");
    cy.get('[data-cy="input-title"]').type('a');
    cy.get('[data-cy="button-save"]').first().click();
  });

 

  it('drag 2nd image to first position', () => {
    cy.visit('productos/lista');
    cy.intercept({
        method: "POST",
        url: `${url}/gift/admin/image`,
      }).as("uploadRequest");
    cy.wait(2000);
    cy.get('[data-cy="button-update"]').first().click();
    cy.get('[data-cy="input-inner-upload"]').attachFile("yuumi.jpg");
    cy.wait("@uploadRequest");
    cy.wait(2000);
    cy.get('[data-cy="input-inner-upload"]').attachFile("yuumi2.jpg");
    cy.wait("@uploadRequest");
    cy.wait(2000);
    cy.get('[data-cy="input-inner-upload"]').attachFile("ibai.jpeg");
    cy.wait("@uploadRequest");
    cy.wait(2000);
    cy.get('[data-cy="input-inner-upload"]').attachFile("ibai2.jpeg");
    cy.wait("@uploadRequest");
    cy.wait(2000);
    cy.get('#position-1').drag('#position-0');
    cy.get('#position-2').drag('#position-3');
    cy.url().should('include', '/editar');
  });

  it('validate images position', () => {

    let anchorLink;

    cy.visit('productos/lista');
    cy.get('[data-cy="button-update"]').first().click();
    cy.get('[data-cy="image-search"]').then((element)=>{
      anchorLink = element.prop("href");
      const links = anchorLink.replace(/\?.*$/,'')
      cy.visit('productos/lista');
      cy.get('[data-cy="row-0"]').get('.img').first()
      .invoke('attr', 'src')
      .then((x)=>{
        const link = x.replace(/\?.*$/,'')
        expect(link).to.equal(links)
      })
    })    

  })

   it('delete image', () => {
    cy.visit('productos/lista');
    cy.wait(2000);
    cy.get('[data-cy="button-extra"]').eq(0).click();
    cy.get('.p-menu-item').eq(1).click();
    cy.get('.p-button-danger').click();
  });
})