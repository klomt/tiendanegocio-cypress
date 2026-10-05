/*
  Warnings:

  - You are about to drop the `resultados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `resultados`;

-- CreateTable
CREATE TABLE `run_result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `run` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `duracion_total` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `test_result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `runId` INTEGER NOT NULL,
    `test` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `duracion` INTEGER NOT NULL,
    `error` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `test_result` ADD CONSTRAINT `test_result_runId_fkey` FOREIGN KEY (`runId`) REFERENCES `run_result`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
