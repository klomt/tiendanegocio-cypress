const url = "http://192.168.0.61:3002/api/v1";

describe("Filtro de los productos",()=>{
    before(() => {
        cy.registerUser({
        complete_tutorial: true,
        assign_design: true
        });
    });

    beforeEach(() => {
        cy.login();
    })
    it('Visit page',()=>{   
        cy.visit('productos/lista');
        cy.url().should('include', 'productos/lista');
    })
    it("add 2 products", () => {
        addProduct('Prod 1', 'Desc 1', '2000', 'yuumi.jpg', '1000', '0');
        addProduct('Prod 2', 'Desc 2', '4000', 'image.jpg', '0', '100');
    })

    it('Filtrar por el mas nuevo',()=>{
        cy.visit('productos/lista');
        cy.get('[data-cy="button-add"]').last().click()
        cy.get('[data-cy="select-order-by"]').click()
        cy.get('[data-cy="order-created_at-desc"]').click()
        cy.get('[label="Filtrar productos"]').click()
        cy.get('[data-cy="row-0"]').should('contain', 'Prod 2')
    })
   
    it('Filtrar por el mas viejo',()=>{
        cy.visit('productos/lista');
        cy.get('[data-cy="button-add"]').last().click()
        cy.get('[data-cy="select-order-by"]').click()
        cy.get('[data-cy="order-created_at-asc"]').click()
        cy.get('[label="Filtrar productos"]').click()
        cy.get('[data-cy="row-0"]').should('contain', 'Prod 1')
    })

    it('Filtrar por A-Z',()=>{
        cy.visit('productos/lista');
        cy.get('[data-cy="button-add"]').last().click()
        cy.get('[data-cy="select-order-by"]').click()
        cy.get('[data-cy="order-title-asc"]').click()
        cy.get('[label="Filtrar productos"]').click()
        cy.get('[data-cy="row-0"]').should('contain', 'Prod 1')
    })

    it('Filtrar por Z-A',()=>{
        cy.visit('productos/lista');
        cy.get('[data-cy="button-add"]').last().click()
        cy.get('[data-cy="select-order-by"]').click()
        cy.get('[data-cy="order-title-desc"]').click()
        cy.get('[label="Filtrar productos"]').click()
        cy.get('[data-cy="row-0"]').should('contain', 'Prod 2')
    })

    it('Filtrar por precio menor a mayor',()=>{
        cy.visit('productos/lista');
        cy.get('[data-cy="button-add"]').last().click()
        cy.get('[data-cy="select-order-by"]').click()
        cy.get('[data-cy="order-price-asc"]').click()
        cy.get('[label="Filtrar productos"]').click()
        cy.get('[data-cy="row-0"]').should('contain', 'Prod 1')
    })

    it('Filtrar por precio mayor a menor',()=>{
        cy.visit('productos/lista');
        cy.get('[data-cy="button-add"]').last().click()
        cy.get('[data-cy="select-order-by"]').click()
        cy.get('[data-cy="order-price-desc"]').click()
        cy.get('[label="Filtrar productos"]').click()
        cy.get('[data-cy="row-0"]').should('contain', 'Prod 2')
    })

    it('Filtrar por sku A-Z',()=>{
        cy.visit('productos/lista');
        cy.get('[data-cy="button-add"]').last().click()
        cy.get('[data-cy="select-order-by"]').click()
        cy.get('[data-cy="order-sku-asc"]').click()
        cy.get('[label="Filtrar productos"]').click()
        cy.get('[data-cy="row-0"]').should('contain', 'Prod 1')
    })
    
    it('Filtrar por sku Z-A',()=>{
        cy.visit('productos/lista');
        cy.get('[data-cy="button-add"]').last().click()
        cy.get('[data-cy="select-order-by"]').click()
        cy.get('[data-cy="order-sku-desc"]').click()
        cy.get('[label="Filtrar productos"]').click()
        cy.get('[data-cy="row-0"]').should('contain', 'Prod 2')
    })
   
    it('Filtrar por oferta',()=>{
        cy.visit('productos/lista');
        cy.get('[data-cy="button-add"]').last().click()
        cy.get('[data-cy="list-2"]').first().click()
        cy.get('[label="Filtrar productos"]').click()
        cy.get('[data-cy="row-0"]').should('contain', 'Prod 1')
    })

    it('Filtrar por sin peso',()=>{
        cy.visit('productos/lista');
        cy.get('[data-cy="button-add"]').last().click()
        cy.get('[data-cy="visibility-3"]').eq(1).click()
        cy.get('[label="Filtrar productos"]').click()
        cy.get('[data-cy="row-0"]').should('contain', 'Prod 1')
    })

    it('Filtrar por ocultos',()=>{
        cy.visit('productos/lista');
        cy.get('[data-cy="change-visibility"]').first().click()
        cy.get('[data-cy="button-add"]').last().click()
        cy.get('[data-cy="visibility-3"]').first().click()
        cy.get('[label="Filtrar productos"]').click()
        cy.get('[data-cy="row-0"]').should('contain', 'Prod 2')
    })
    

    function addProduct(title,desc,price,image,oferta,peso){
        cy.wait(1000);
        cy.visit("productos/agregar");
        cy.get('[data-cy="input-title"]').type(`${title}`);
        cy.wait(2000);
        cy.get('.tox-edit-area__iframe').click().type(`${desc}`);
        cy.wait(2000);
        cy.get('[data-cy="input-price"]').type(`${price}`);
        cy.get('[data-cy="input-promo"]').type(`${oferta}`)
        cy.get('[data-cy="input-weight"]').type(`${peso}`)
        cy.intercept({
            method: "POST",
            url: `${url}/gift/admin/image`,
        }).as("uploadRequest");
        cy.wait(2000);
        cy.get('[data-cy="input-inner-upload"]').attachFile(`${image}`);
        cy.get('[data-cy="button-save"]').click();
        cy.reload();
        cy.wait(1000);
        cy.visit('/productos/lista');
        cy.url().should('include', '/productos/lista');
    }
})

