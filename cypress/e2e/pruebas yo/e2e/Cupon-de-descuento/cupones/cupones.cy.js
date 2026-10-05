const url = "http://192.168.0.61:3002/api/v1";
const credentials = {};

const generateRandomHash = (prefix = "", suffix = "") => {
  return `${prefix}${(+new Date()).toString(36)}${suffix}`;
};

function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("cupones", () => {
  before(() => {
    cy.registerUser().then((newAdmin) => {
      credentials.email = newAdmin.email;
      credentials.password = newAdmin.password;
    });
  });

  beforeEach(() => {
    cy.login(credentials);
    cy.visit("/cupones");
  });

  it("Entry cupones", () => {
    cy.get('[data-cy="button-create"').as("buttonCreate");
    cy.get("@buttonCreate").click();
  });

  it("Cupon exeda 40 caracteres", () => {
    NuevoCupon();
    cy.get('[data-cy="code"]').as("inputCupon");
    cy.get("@inputCupon").type(
      "funca bassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssien ."
    );
    cy.get('button[type="submit"]').as("guardarCupon").should("be.disabled");
  });

  it("Dejar el cupon vacio", () => {
    NuevoCupon();
    cy.get('[data-cy="code"]').as("inputCupon");
    cy.get('button[type="submit"]').as("guardarCupon").should("be.disabled");
  });

  it("nombre cupon bien", () => {
    NuevoCupon();
    cy.get('[data-cy="code"]').as("inputCupon");
    cy.get("@inputCupon").type(generateRandomHash());
    NuevoCupon();
  });

  //requerido siempre
  it("Porcentaje total de la compra", () => {
    NuevoCupon();
    cy.get('[data-cy="type-coupon"]').as("tipoCupon").click();
    cy.get('[data-cy="type-coupon-1"]').as("Cupon1").click();
  });

  //It porcentaje total de compra
  it("totalCompraSinPrecio", () => {
    NuevoCupon();
    totalCompraSinPrecio();
    limitePecio();
    limitarCantidadUso();
    validezTiempoLimitado();
    NuevoCupon();
  });
  it("totalCompraPrecioNegativo", () => {
    NuevoCupon();
    totalCompraPrecioNegativo();
    limitePecio();
    permitirLimite();
    ValidezFecha();
    NuevoCupon();
  });
  it("totalCompraPrecioReal", () => {
    NuevoCupon();
    totalCompraPrecioReal();
    limitePecio();
    permitirLimite();
    validezTiempoLimitado();
    NuevoCupon();
  });
  //cancelar cupon
  it("Cancelar cupon", () => {
    NuevoCupon();
    cancelarCupon();
  });

  //It monto fijo de descuento
  it("monto fijo de descuento bien ", () => {
    NuevoCupon();
    montoFijoPrecioReal();
    limitePecio();
    permitirLimite();
    NuevoCupon();
  });

  it("Monto fijo de descuento sin precio", () => {
    NuevoCupon();
    montoFijoSinPrecio();
    permitirLimite();
    ValidezFecha();
    NuevoCupon();
  });

  it("Monto fijo con precio negativo", () => {
    NuevoCupon();
    montoFijoPrecioNegativo();
    permitirLimite();
    ValidezFecha();
    limitePecio();
    NuevoCupon();
  });

  //Envio gratis
  it("Envio gratis", () => {
    NuevoCupon();
    cy.get('[data-cy="code"]').as("inputCupon").clear();
    cy.get("@inputCupon").type(generateRandomHash());
    cy.get('[data-cy="type-coupon"]').as("tipoCupon").click();
    cy.get('[data-cy="type-coupon-3"]').as("Cupon3").click();
    noLimitarPrecio();
    permitirLimite();
    ValidezFecha();
    NuevoCupon();
  });

  //Borrar cupon
  it("borrar", () => {
    borrarCupon();
  });

//Deshabilitar cupon
it('Deshabilitar', () => {
    cy.get('[data-cy="button-status"]').first().click().wait(2000)
});
//Habilitar cupon
it('Habilitar', () => {
  cy.get('[data-cy="button-status"]').first().click().wait(2000)
  cy.get('[data-cy="button-status"]').first().click()
});


  //Buscador de cupones
  it("Prueba el cupon no existe", () => {
    const code = generateRandomHash();
    cy.get('[data-cy="input-search"').as("busca").type(code);
    cy.get("tbody").find("td").first().wait(2000);

    cy.get("@busca").clear();
  });

  it("Probar varios cupones", () => {
    const code = "M";
    cy.get('[data-cy="input-search"').as("busca").type(code);

    cy.get("tbody")
      .find("tr")
      .each(($event) => {
        cy.wrap($event).find("td").first().should("contain", code);
      });
    cy.get("@busca").clear();
  });


  //Boton codigo 
  it('Boton codigo aumento', () => {
      cy.get('[data-cy="sort-title"]').click().wait(1000)
  });

  it('Boton codigo decrecimiento', () => {
    cy.get('[data-cy="sort-title"]').dblclick().wait(1000)
});

//Boton descuento
it('Boton descuento aumento', () => {
    cy.get('[data-cy="sort-discount"]').click().wait(1000)
}); 

it('Boton descuento decrecimiento', () => {
  cy.get('[data-cy="sort-discount"]').dblclick().wait(1000)
});

//Boton usos
it('Boton usos aumento', () => {
  cy.get('[data-cy="sort-used"]').click().wait(1000)
});

it('Boton usos decrecimiento', () => {
  cy.get('[data-cy="sort-used"]').dblclick().wait(1000)
});

//Boton limite de usos
it('Boton limite de usos aumento', () => {
  cy.get('[data-cy="sort-max_used"]').click().wait(1000)
});

it('Boton limite de usos decrecimiento', () => {
  cy.get('[data-cy="sort-max_used"]').dblclick().wait(1000)
});

//Boton limite de fecha
it('Boton limite de fecha aumento', () => {
  cy.get('[data-cy="sort-time_start"]').click().wait(1000)
});

it('Boton limite de fecha decrecimiento', () => {
  cy.get('[data-cy="sort-time_start"]').dblclick().wait(1000)
});

//Boton limite de monto
it('Boton limite de monto aumento', () => {
  cy.get('[data-cy="sort-min_price"]').click().wait(1000)
});

it('Boton limite de monto decrecimiento', () => {
  cy.get('[data-cy="sort-min_price"]').dblclick().wait(1000)
});

//Boton estado 
it('Boton estado aumento', () => {
  cy.get('[data-cy="sort-isAvailable"]').click().wait(1000)
});

it('Boton estado decrecimiento', () => {
  cy.get('[data-cy="sort-isAvailable"]').dblclick().wait(1000)
});


  //funciones

  function borrarCupon() {
    cy.get('[data-cy="button-delete"').first().click().as("borrar");
    cy.get('.p-confirmdialog-accept-button').click();//Ya no existe el data-cy
  }

  function NuevoCupon() {
    cy.get('[data-cy="button-create"]').click();
  }
  //INFORMACION BASICA
  //Funciones de porcentaje total de compra

  function cancelarCupon() {
    cy.get('[data-cy="code"]').as("inputCupon");
    cy.get("@inputCupon").type(generateRandomHash());
    cy.get('[data-cy="discount"]')
      .as("descuento")
      .type(generateRandomIntegerInRange(1, 100));
    cy.get('[data-cy="button-cancel"]').click();
  }

  function totalCompraSinPrecio() {
    cy.get('[data-cy="code"]').as("inputCupon").clear();
    cy.get("@inputCupon").type(generateRandomHash());
    cy.get('[data-cy="discount"]').as("descuento").clear();
  }
  function totalCompraPrecioNegativo() {
    cy.get('[data-cy="code"]').as("inputCupon").clear();
    cy.get("@inputCupon").type(generateRandomHash());
    cy.get('[data-cy="discount"]').as("descuento").clear().type("-50");
  }
  function totalCompraPrecioReal() {
    cy.get('[data-cy="code"]').as("inputCupon").clear();
    cy.get("@inputCupon").type(generateRandomHash());
    cy.get('[data-cy="discount"]').as("descuento");
    cy.get("@descuento").clear();
    cy.get("@descuento").type(generateRandomIntegerInRange(1, 100));
  }

  //Monto de descuento fijo

  function montoFijoSinPrecio() {
    cy.get('[data-cy="code"]').as("inputCupon").clear();
    cy.get("@inputCupon").type(generateRandomHash());
    cy.get('[data-cy="type-coupon"]').as("tipoCupon").click();
    cy.get('[data-cy="type-coupon-2"]').as("Cupon2").click();
    cy.get('[data-cy="discount"').as("descuento").clear();
  }

  function montoFijoPrecioNegativo() {
    cy.get('[data-cy="code"]').as("inputCupon").clear();
    cy.get("@inputCupon").type(generateRandomHash());
    cy.get('[data-cy="type-coupon"]').as("tipoCupon").click();
    cy.get('[data-cy="type-coupon-2"]').as("Cupon2").click();
    cy.get('[data-cy="discount"').as("descuento").type("-50");
  }

  function montoFijoPrecioReal() {
    cy.get('[data-cy="code"]').as("inputCupon").clear();
    cy.get("@inputCupon").type(generateRandomHash());
    cy.get('[data-cy="type-coupon"]').as("tipoCupon").click();
    cy.get('[data-cy="type-coupon-2"]').as("Cupon2");
    cy.get('@Cupon2').click();
    cy.get('[data-cy="discount"')
      .as("descuento")
      .clear()
      .type(generateRandomIntegerInRange(1, 100));
  }

  //LIMITES DE CUPONES
  //limitar por precio

  //limitar por precio!
  //sin limite
  function noLimitarPrecio() {
    cy.get('[data-cy="limit-min-price"').click();
    cy.get('[data-cy="limit-min-price-0"').click();
  }
  //con limite
  function limitePecio() {
    cy.get('[data-cy="limit-min-price"').click();
    cy.get('[data-cy="limit-min-price-1"').click();
    cy.get('[data-cy="min-price"')
      .clear()
      .type(generateRandomIntegerInRange(1, 100));
  }

  //limitar cantidad de uso!
  //sin limite
  function limitarCantidadUso() {
    cy.get('[data-cy="limit-max-used"').click();
    cy.get('[data-cy="limit-max-used-0"').click();
  }
  //con usos limitados
  function permitirLimite() {
    cy.get('[data-cy="limit-max-used"').click();
    cy.get('[data-cy="limit-max-used-1"').click();
    cy.get('[data-cy="max-used"]')
      .clear()
      .type(generateRandomIntegerInRange(1, 100));
  }

  //validez del cupon por la fecha!
  //sin fecha
  function validezTiempoLimitado() {
    cy.get('[data-cy="limit-time"]').click();
    cy.get('[data-cy="limit-time-0"]').click();
  }
  //con fecha
  function ValidezFecha() {
    cy.get('[data-cy="limit-time"]').click();
    cy.get('[data-cy="limit-time-1"]').click();
    cy.get('[data-cy="time-start"]').click();
    cy.get("tbody").first().find("td.p-datepicker-today").click();
    cy.get('[data-cy="time-end"]').click();
    cy.get("tbody").last().find("td.p-datepicker-today").click();
  }

  //final
});
