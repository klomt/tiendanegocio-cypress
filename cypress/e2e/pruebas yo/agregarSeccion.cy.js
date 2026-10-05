/// <reference types="cypress"/>
describe('Secciones', () =>{
    Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Script error")) {
    return false;
  }
});
    beforeEach(()=>{
        cy.login('', ''); 
        cy.visit('https://panel.tiendanegocio.com/#/configuraciones/diseno/editor/inicio')
        cy.intercept('GET', 'https://api.tiendanegocio.com/api/v1/menu/admin').as('datosCargados');
        cy.wait('@datosCargados');
        cy.get('[data-cy="button-page-init"] > .nav-button').click()
        cy.get('[data-cy="button-add-section"]').click()
      })
    it('Banners',()=>{
      cy.get('[data-cy="button-add-section-2"]')
    })/*/
    it('Informacion de compra',()=>{
      cy.get('[data-cy="button-add-section-9"]')
    })
    it('Grupo de productos',()=>{
      cy.get('[data-cy="button-add-section-3"]')
    })
    it('Barra de anuncios',()=>{
      cy.get('[data-cy="button-add-section-15"]')
    })
    it('Categorias destacadas',()=>{
      cy.get('[data-cy="button-add-section-12"]')
    })
    it('Newletter',()=>{

    })
    it('Blog',()=>{

    })
    it('Texto',()=>{

    })
    it('Grilla de img con links',()=>{

    })
    it('Video texto y boton',()=>{

    })
    it('Resenas y testimonios',()=>{

    })
    it('Galeria de imgs',()=>{

    })
    it('Img con fondo y texto',()=>{

    })
    it('Img con texto y boton',()=>{

    })
    it('Lista logros',()=>{

    })
    it('Img con temporizador',()=>{

    })
    /*/
    
})