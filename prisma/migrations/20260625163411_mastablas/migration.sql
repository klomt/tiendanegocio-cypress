/*
  Warnings:

  - You are about to drop the column `resultadoObtenido` on the `resultados` table. All the data in the column will be lost.
  - You are about to drop the column `tiempoObtenido` on the `resultados` table. All the data in the column will be lost.
  - You are about to drop the column `tipoPrueba` on the `resultados` table. All the data in the column will be lost.
  - Added the required column `estado` to the `resultados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha` to the `resultados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prueba` to the `resultados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultado` to the `resultados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resultados` DROP COLUMN `resultadoObtenido`,
    DROP COLUMN `tiempoObtenido`,
    DROP COLUMN `tipoPrueba`,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL,
    ADD COLUMN `fecha` DATETIME(3) NOT NULL,
    ADD COLUMN `prueba` VARCHAR(191) NOT NULL,
    ADD COLUMN `resultado` INTEGER NOT NULL;
