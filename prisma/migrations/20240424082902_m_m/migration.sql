/*
  Warnings:

  - You are about to drop the `client_client_group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `client_client_group` DROP FOREIGN KEY `client_client_group_clientGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `client_client_group` DROP FOREIGN KEY `client_client_group_clientId_fkey`;

-- DropTable
DROP TABLE `client_client_group`;

-- CreateTable
CREATE TABLE `ClientClientGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NOT NULL,
    `clientGroupId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ClientClientGroup_clientId_clientGroupId_idx`(`clientId`, `clientGroupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientClientGroup` ADD CONSTRAINT `ClientClientGroup_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`clientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientClientGroup` ADD CONSTRAINT `ClientClientGroup_clientGroupId_fkey` FOREIGN KEY (`clientGroupId`) REFERENCES `client_groups`(`clientGroupId`) ON DELETE RESTRICT ON UPDATE CASCADE;
