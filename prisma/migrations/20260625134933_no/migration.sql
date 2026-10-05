/*
  Warnings:

  - Added the required column `resultadoObtenido` to the `resultados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resultados` ADD COLUMN `resultadoObtenido` VARCHAR(191) NOT NULL;
