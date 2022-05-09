-- CreateTable
CREATE TABLE `Vagas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `salary` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `enterprise` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
