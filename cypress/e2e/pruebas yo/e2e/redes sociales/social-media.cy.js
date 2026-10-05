const url = "http://192.168.0.61:3002/api/v1";

describe("Redes sociales", () => {

  before(() => {
    cy.registerUser();
  });

  beforeEach(() => {
    cy.login();
  });

  it("visit page", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.url().should("include", "/configuraciones/redes-sociales");
  });

  it("check if links are incorrect", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#instagram").as("r1");
    cy.get("#facebook").as("r2");
    cy.get("#tiktok").as("r3");
    cy.get("#youtube").as("r4");
    cy.get("#twitter").as("r5");
    cy.get("#pinterest").as("r6");
    for (let i = 1; i < 7; i++) {
      cy.get(`@r${i}`).type("aaaaaa.com");
    }
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("check if ig link is correct", () => {
    cy.visit("/configuraciones/redes-sociales");
    escribir("#instagram", "https://www.instagram.com/aa");
    cy.get("button[type=submit]").click();
    cy.get(".p-toast").should("exist");
  });

  it("check if fb link is correct", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#instagram").clear();
    escribir("#facebook", "https://www.facebook.com/aa");
    cy.get("button[type=submit]").click();
    cy.get(".p-toast").should("exist");
  });
  it("check if fb link 2 is correct", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#facebook").clear();
    escribir("#facebook", "https://www.fb.com/aa");
    cy.get("button[type=submit]").click();
    cy.get(".p-toast").should("exist");
  });

  it("check if tiktok link is correct", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#facebook").clear();
    escribir("#tiktok", "https://www.tiktok.com/@c");
    cy.get("button[type=submit]").click();
    cy.get(".p-toast").should("exist");
  });

  it("check if yt link is correct", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#tiktok").clear();
    escribir("#youtube", "https://www.youtube.com/@c");
    cy.get("button[type=submit]").click();
    cy.get(".p-toast").should("exist");
    cy.wait(500);
  });
  it("check if tw link is correct", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#youtube").clear();
    escribir("#twitter", "https://www.twitter.com/c");
    cy.get("button[type=submit]").click();
    cy.get(".p-toast").should("exist");
    cy.wait(500);
  });

  it("check if tw link 2 is correct", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#twitter").clear();
    escribir("#twitter", "https://www.mobile.twitter.com/c");
    cy.get("button[type=submit]").click();
    cy.get(".p-toast").should("exist");
    cy.wait(500);
  });

  it("check if pinterest link is correct", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#twitter").clear();
    escribir("#pinterest", "https://www.pinterest.com/leograsso2");
    cy.get("button[type=submit]").click();
    cy.get(".p-toast").should("exist");
    cy.wait(500);
  });

  it("check if pinterest link 2 is correct", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#pinterest").clear();
    escribir("#pinterest", "https://pin.it/1uHCkgs");
    cy.get("button[type=submit]").click();
    cy.get(".p-toast").should("exist");
    cy.wait(500);
  });

  // incorrecto

  it("check if ig link is incorrect", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#pinterest").clear();
    escribir("#instagram", "aaaaa.com");
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("check if fb link is incorrect", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#instagram").clear();
    escribir("#facebook", "aaaaa.com");
    cy.get("button[type=submit]").should("be.disabled");
  });
  it("check if fb link 2 is incorrect", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#facebook").clear();
    escribir("#facebook", "aaaaa.com");
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("check if tiktok link is incorrect", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#facebook").clear();
    escribir("#tiktok", "aaaaa.com");
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("check if yt link is incorrect", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#tiktok").clear();
    escribir("#youtube", "aaaaa.com");
    cy.get("button[type=submit]").should("be.disabled");
    cy.wait(500);
  });

  it("check if tw link is incorrect", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#youtube").clear();
    escribir("#twitter", "aaaaa.com");
    cy.get("button[type=submit]").should("be.disabled");

    cy.wait(500);
  });

  it("check if tw link 2 is incorrect", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#twitter").clear();
    escribir("#twitter", "aaaaa.com");
    cy.get("button[type=submit]").should("be.disabled");

    cy.wait(500);
  });

  it("check if pinterest link is incorrect", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#pinterest").clear();
    escribir("#pinterest", "aaaaa.com");
    cy.get("button[type=submit]").should("be.disabled");

    cy.wait(500);
  });

  it("check if pinterest link 2 is incorrect", () => {
    cy.visit("/configuraciones/redes-sociales");
    cy.get("#pinterest").clear();
    cy.wait(500);
    escribir("#pinterest", "aaaaa.com");
    cy.get("button[type=submit]").should("be.disabled");

    cy.get("#pinterest").clear();
    cy.wait(500);
  });

  function escribir(id, texto) {
    cy.get(`${id}`).type(`${texto}`);
  }
});
