  const url = "http://192.168.0.61:3002/api/v1"

  describe('precio', () => {

    before(()=>{
      cy.registerUser();
    })

    beforeEach(()=>{
      cy.login();
    })
    it("visit page", () => {
      cy.visit("/productos/agregar");
    })
    it("negative price", () => {
    
      cy.visit("/productos/agregar");
      cy.get('[data-cy="input-price"]').type("-777777");
      nombre()

      cy.get('[data-cy="button-save"]').click();
    })
    it("price too high", () => {
      cy.visit("/productos/agregar");
      cy.get('[data-cy="input-price"]').generateRandomNumber(100)
      nombre()
      cy.get('[data-cy="button-save"]').click();
    })
    it("empty price", () => {
      cy.visit("/productos/agregar");
      cy.get('[data-cy="input-price"]').type("7").clear();
      nombre()
      cy.get('[data-cy="button-save"]').click();
    })
    it("price with letters", () => {
      cy.visit("/productos/agregar");
      cy.get('[data-cy="input-price"]').type("francisco")
      nombre()
      cy.get('[data-cy="button-save"]').click();
    })
    it("offer equeal to price", () => {
      cy.visit("/productos/agregar");
      cy.get('[data-cy="input-price"]').type("7777")
      cy.get('[data-cy="input-promo"]').type("7777")
      nombre()
      cy.get('[data-cy="button-save"]').click();
    })
    it("higher price offer ", () => {
      cy.visit("/productos/agregar");
      cy.get('[data-cy="input-price"]').type("7777")
      cy.get('[data-cy="input-promo"]').type("8888")
      nombre()
      cy.get('[data-cy="button-save"]').click();
    })
    it("stock negative ", () => {
      cy.visit("/productos/agregar");
      cy.get('[data-cy="input-stock"]').type("-8")
      nombre()
      cy.get('[data-cy="button-save"]').click();
    })
    it("stock with letters ", () => {
      cy.visit("/productos/agregar");
      cy.get('[data-cy="input-stock"]').type("fffff")
      nombre()
      cy.get('[data-cy="button-save"]').click();
    })
    it("excessive stock ", () => {
      cy.visit("/productos/agregar");
      cy.get('[data-cy="input-stock"]').generateRandomNumber(100)
      nombre()
      cy.get('[data-cy="button-save"]').click();
    })
    it("visibility button ", () => {
      cy.visit("/productos/agregar");
      cy.get('[data-cy="input-price"]').type("700")
      cy.get('[data-cy="input-promo"]').type("500")
      cy.get('[data-cy="input-stock"]').type("7")
      nombre()
      cy.get('[data-cy="input-status"]').click();
      cy.get('[data-cy="button-save"]').click();
    })
    it("date validity ", () => {

      cy.visit("/productos/agregar");
      cy.get('[data-cy="input-price"]').type("7777")
      cy.get('[data-cy="input-promo"]').type("500")
      cy.get("body").click()
      cy.get("#expiration_date_promo").as("expiration")
      cy.get("@expiration").click();
      cy.get("tbody").find("td.p-datepicker-today").click()
      nombre()
      cy.get('[data-cy="button-save"]').click();
      
    })
    
  })
  function nombre() {
      cy.get('[data-cy="input-title"]').as("titulo");
      cy.get("@titulo").type((+new Date()).toString(36));
    }
    function generateRandomHash() {
      return (+new Date()).toString(36);
    }

  