/*
  Warnings:

  - You are about to drop the column `resultadoObtenido` on the `resultados` table. All the data in the column will be lost.
  - You are about to drop the column `tipoprueba` on the `resultados` table. All the data in the column will be lost.
  - Added the required column `tipoPrueba` to the `resultados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resultados` DROP COLUMN `resultadoObtenido`,
    DROP COLUMN `tipoprueba`,
    ADD COLUMN `tipoPrueba` VARCHAR(191) NOT NULL;
