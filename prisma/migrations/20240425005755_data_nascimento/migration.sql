-- CreateTable
CREATE TABLE `users` (
    `idusers` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NULL,
    `email` VARCHAR(180) NULL,
    `password` VARCHAR(45) NULL,
    `dataNascimento` DATE NULL,
    `createadAat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateadAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idusers`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
