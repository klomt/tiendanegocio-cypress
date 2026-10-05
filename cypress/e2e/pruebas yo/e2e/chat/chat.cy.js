const url = "http://192.168.0.61:3002/api/v1"
const credentials = {};

describe('Chat', () => {
    before(()=>{
        cy.registerUser().then((newAdmin)=>{
        credentials.email = newAdmin.email;
        credentials.password = newAdmin.password;
    });
    })  
    beforeEach(()=>{
        cy.login(credentials);
    })

    it("visit page", () => {
        cy.visit('/configuraciones/chat');
    })
    it("empty inputs", () => {
        cy.visit("/configuraciones/chat");
        cy.get('#whatsapp').as('wppInput');
        cy.get("#facebook").as('faceInput');
        cy.get("@wppInput").clear();
        cy.get("@faceInput").clear();
        cy.get('button[type="submit"]').click();
        cy.get('p-toastitem').as('alertError');
        cy.get("@alertError").contains("Se guardaron los cambios exitosamente");
     })
    it("whatsapp verification", () => {
        incomeOfInput()
        cy.get("#facebook").as('faceInput');
        cy.get("@faceInput").clear();
        cy.get('button[type="submit"]').click();
        cy.get('p-toastitem').as('alertError');
        cy.get("@alertError").contains("Se guardaron los cambios exitosamente");
    })
    it("empty whatsapp", () => {
        incomeOfInput()
        cy.get('#whatsapp').as('wppInput');
        cy.get("@wppInput").clear();
        cy.get('button[type="submit"]').click();
        cy.get('p-toastitem').as('alertError');
        cy.get("@alertError").contains("Se guardaron los cambios exitosamente");
    })
    it("number short whatsapp", () => {
        incomeOfInput()
        cy.get('#whatsapp').as('wppInput');
        cy.get("@wppInput").type("1");   
        cy.get('button[type="submit"]').click();
        cy.get('p-toastitem').as('alertError');
        cy.get("@alertError").contains("Se guardaron los cambios exitosamente");
    })
    it("number large whatsapp", () => {
        incomeOfInput()        
        cy.get('#whatsapp').as('wppInput');
        cy.get("@wppInput").generateRandomNumber(100)          
        cy.get('button[type="submit"]').should("be.disabled");
    })    
    it("facebook verification", () => {
        incomeOfInput()     
        cy.get('#whatsapp').as('wppInput');
        cy.get("@wppInput").clear(); 
        cy.get('button[type="submit"]').click();
        cy.get('p-toastitem').as('alertError');
        cy.get("@alertError").contains("Se guardaron los cambios exitosamente");
    })
    it("empty facebook", () => {
        incomeOfInput() 
        cy.get("#facebook").as('faceInput');
        cy.get("@faceInput").clear("");        
        cy.get('button[type="submit"]').click();
        cy.get('p-toastitem').as('alertError');
        cy.get("@alertError").contains("Se guardaron los cambios exitosamente");
    })
    /*
    it("instagram verification", () => {
        cy.visit("/configuraciones/chat");    
        cy.get('#whatsapp').as('wppInput');
        cy.get("#facebook").as('faceInput');
        cy.get('#instagram').as('igInput');
        cy.get("@wppInput").clear();
        cy.get("@faceInput").clear();
        cy.get('@igInput').clear().type("https://twitter.com/DiarioOle");        
        cy.get('button[type="submit"]').should("be.disabled");
    })
    
    it("empty instagram", () => {
        cy.visit("/configuraciones/chat");        
        cy.get('#whatsapp').as('wppInput');
        cy.get("#facebook").as('faceInput');
        cy.get("@wppInput").clear().type("1134567897");
        cy.get("@faceInput").type("https://www.facebook.com/TiendaNegocio");       
        cy.get('button[type="submit"]').click();
        cy.get('p-toastitem').as('alertError');
        cy.get("@alertError").contains("Se guardaron los cambios exitosamente");
    })
    */
    it("checkbox button", () => {
        incomeOfInput()       
        cy.get('[data-cy="input-checkbox"]').click();
        cy.get('button[type="submit"]').click();
        cy.get('p-toastitem').as('alertError');
        cy.get("@alertError").contains("Se guardaron los cambios exitosamente");
    })
})
function incomeOfInput(){
    cy.visit("/configuraciones/chat");        
    cy.get('#whatsapp').as('wppInput');
    cy.get("#facebook").as('faceInput');
    cy.get("@wppInput").clear().type('231312312')
    cy.get("@faceInput").clear().type("https://www.facebook.com/TiendaNegocio");
}