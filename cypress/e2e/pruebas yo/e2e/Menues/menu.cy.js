const url = "http://192.168.0.61:3002/api/v1";
const credentials = {};

describe("Menues", () => {
    before(()=>{
        cy.registerUser();
      })
      beforeEach(()=>{
        cy.login();
      })

it("visit page", () => {
        cy.visit("/menu");
  });

  it ("create new menu", () =>{
    cy.visit("/menu");
        addmenues();
  })
  it ("add link", () =>{
        cy.visit("/menu");
        cy.get('[data-cy="button-create-item"]').last().click();
        cy.get('[data-cy="input-title"]').type("bad bunny");
        cy.get('[data-cy="button-save"]').click();
  })
  it ("edit link", () =>{
        cy.visit("/menu");
        cy.get('[data-cy="button-item-edit-0"]').first().click();
        cy.get('[data-cy="input-title"]').clear().type("redes");
        cy.get('[data-cy="button-save"]').click();
  })
  it("add categories", () =>{
        cy.visit("/menu");
        cy.get('[data-cy="button-create-item"]').last().click();
        cy.get('[data-cy="input-type_menu_item_id"]').click();
        cy.get('[data-cy="item-3"]').click();
        cy.get('button[type="submit"]').should("be.disabled");
})
it("add menues", () =>{
    cy.visit("/menu");
    addmenues();

})
it("delete buttom", () =>{
    cy.visit("/menu");
    for(let i=0; i<=2;i++){
        delbutton(); 
    } 
})
it("edit menu alternativo", () =>{
    cy.visit("/menu");   
        editar(); 
})
it("delete menu alternativo", () =>{
    cy.visit("/menu");
        delmenu2();      
})

//Funciones

function delbutton (){
    cy.get(`[data-cy="menu-0"]`).as("delete");
    cy.get("@delete")
    .find(`[data-cy="button-item-delete-0"]`)
    .click();
    cy.get('.p-confirmdialog-accept-button').click(); 
    cy.wait(2000);

}
function delmenu2(){
cy.get(`[data-cy="button-edit-menu-1"]`).click();
cy.get("#button-delete-menu").contains('span', 'Eliminar').click();
cy.get('.p-confirmdialog-accept-button').click();
cy.wait(2000);
cy.get('#p-panel-3-titlebar').should('not.exist')
}
function editar(){
    cy.get(`[data-cy="button-edit-menu-1"]`).click();
    cy.get("#button-edit-menu").contains('span', 'Editar').click();
    cy.get('[data-cy="input-title"]').clear().type("no estamos bien :(");
    cy.get('[data-cy="button-save"]').click();
    
    }
function addmenues(){
    
    cy.get('[data-cy="button-create-menu"]').click();
    cy.get('[data-cy="input-title"]').type("Estamos bien", {"delay": 0});
    cy.get('[data-cy="button-save"]').click();
    
}
})