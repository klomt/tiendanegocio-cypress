/*
  Warnings:

  - Added the required column `log` to the `resultados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resultados` ADD COLUMN `log` VARCHAR(191) NOT NULL;
