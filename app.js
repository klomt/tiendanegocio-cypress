/*
 * Archivo: app.js
 *
 * Descripción general:
 * Este script se encarga de ejecutar una suite de Cypress, recopilar los resultados
 * de cada prueba y persistirlos en una base de datos mediante Prisma.
 *
 * Flujo principal:
 * 1) Carga variables de entorno desde .env.
 * 2) Configura el adaptador Prisma para MariaDB.
 * 3) Ejecuta un spec concreto de Cypress.
 * 4) Recorre cada ejecución (run) y crea un registro en la tabla run_result.
 * 5) Para cada test dentro de ese run, crea una fila en test_result.
 * 6) Calcula el shard_hint a partir del id generado por run_result y lo asigna
 *    a cada registro hijo para soportar sharding.
 * 7) Cierra la conexión de Prisma al finalizar.
 *
 * Nota:
 * El bloque de cron está comentado y no se ejecuta por defecto. Si se habilita,
 * este script podría lanzarse periódicamente mediante node-cron.
 */

// Carga las variables de entorno definidas en el archivo .env.
const dotenv = require('dotenv');
dotenv.config();

// Dependencias principales.
const cypress = require('cypress');
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const adapter = new PrismaMariaDb({
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
  allowPublicKeyRetrieval: true,
});

// Instancia global de Prisma para interactuar con la base de datos.
const prisma = new PrismaClient({ adapter });


async function main() {
  // Ejecuta un spec determinado de Cypress.
  const results = await cypress.run({
    spec: ['cypress/e2e/pruebas yo/loginPanel.cy.js'],
  });

  console.log(process.env.DATABASE_URL);
  console.log(adapter.host);
  console.log('Cypress run completed. Results:', results);

  // Recorre cada run devuelto por Cypress.
  for (const run of results.runs) {
    // Se asume que el run es exitoso hasta que se encuentre un test no pasado.
    let estadoFinal = "passed";

    // Mapea los tests del run para construir un arreglo formateado.
    // Se usa test.title[1] porque la estructura de Cypress incluye un título padre
    // y un subtítulo, y en este caso se necesita el nombre del caso individual.
    const tests = run.tests.map(test => {
      if (test.state !== "passed") {
        estadoFinal = "failed";
      }
      return {
        test: test.title[1],
        estado: test.state,
        duracion: test.duration,
        error: test.displayError
      };
    });

    console.log(`Final state for run ${run.tests[0].title[0]}:`, estadoFinal);
    console.log(`Results for run ${run.tests[0].title[0]}:`, tests);

    // Inserta el resumen del run en run_result.
    // run.tests[0].title[0] representa el nombre del bloque o suite padre.
    const resultado = await prisma.run.create({
      data: {
        run: run.tests[0].title[0],
        estado: estadoFinal,
        duracion: parseFloat((run.stats.duration / 1000).toFixed(2)),
        fecha: run.stats.startedAt
      }
    });

    console.log(`Inserted run_result with ID: ${resultado.id}`);

    // Inserta cada test como un registro independiente en test_result.
    
    await prisma.test.createMany({
      data: tests.map(test => ({
        runId: resultado.id,
        test: test.test,
        estado: test.estado,
        duracion: parseFloat((test.duracion / 1000).toFixed(2)),
        error: test.error,
      }))
    });

    console.log(`Inserted ${tests.length} test_result records for run_result ID: ${resultado.id}`);
  }

  // Muestra los resultados finales almacenados para depuración.
  console.log(`All runs processed. Total runs: ${results.runs.length}`);
  console.log(await prisma.run.findMany());
  console.log(await prisma.test.findMany());
}

// Ejecución principal del script.
/*main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

*/
/*
 * Bloque opcional con cron.
 * Está comentado porque el script se ejecuta actualmente una sola vez.
 * Si se desea automatizar, se puede descomentar y configurar.
 */

const cron = require('node-cron');

cron.schedule('* * * * *', async () => {
  await main().catch((e) => {
    throw e;
  }).finally(async () => {
    await prisma.$disconnect();
  });
}, { noOverlap: true });