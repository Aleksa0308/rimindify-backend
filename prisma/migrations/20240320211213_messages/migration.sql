-- AlterTable
ALTER TABLE `client_groups` ADD COLUMN `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `messages` (
    `messageId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(1500) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
