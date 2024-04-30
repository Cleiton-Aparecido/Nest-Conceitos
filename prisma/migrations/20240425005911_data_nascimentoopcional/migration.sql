/*
  Warnings:

  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createadAat` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(64) NOT NULL,
    MODIFY `email` VARCHAR(180) NOT NULL,
    MODIFY `password` VARCHAR(45) NOT NULL,
    MODIFY `createadAat` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);
