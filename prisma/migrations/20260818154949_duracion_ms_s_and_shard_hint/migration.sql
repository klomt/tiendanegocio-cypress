/*
  Warnings:

  - You are about to drop the column `duracion_total` on the `run_result` table. All the data in the column will be lost.
  - You are about to alter the column `duracion` on the `test_result` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `duracion` to the `run_result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shard_hint` to the `test_result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `run_result` DROP COLUMN `duracion_total`,
    ADD COLUMN `duracion` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `test_result` ADD COLUMN `shard_hint` INTEGER NOT NULL,
    MODIFY `duracion` DOUBLE NOT NULL;
