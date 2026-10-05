-- CreateTable
CREATE TABLE `resultados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoprueba` VARCHAR(191) NOT NULL,
    `resultadoObtenido` INTEGER NOT NULL,
    `tiempoObtenido` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
