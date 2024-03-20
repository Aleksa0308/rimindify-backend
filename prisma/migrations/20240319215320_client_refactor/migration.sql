/*
  Warnings:

  - The primary key for the `client_groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `client_groups` table. All the data in the column will be lost.
  - The primary key for the `clients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `clients` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_clientgrouptouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_clienttouser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientGroupId` to the `client_groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `client_groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_clientgrouptouser` DROP FOREIGN KEY `_ClientGroupToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clientgrouptouser` DROP FOREIGN KEY `_ClientGroupToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `_clienttoclientgroup` DROP FOREIGN KEY `_ClientToClientGroup_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clienttoclientgroup` DROP FOREIGN KEY `_ClientToClientGroup_B_fkey`;

-- DropForeignKey
ALTER TABLE `_clienttouser` DROP FOREIGN KEY `_ClientToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clienttouser` DROP FOREIGN KEY `_ClientToUser_B_fkey`;

-- AlterTable
ALTER TABLE `client_groups` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `clientGroupId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`clientGroupId`);

-- AlterTable
ALTER TABLE `clients` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `clientId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`clientId`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- DropTable
DROP TABLE `_clientgrouptouser`;

-- DropTable
DROP TABLE `_clienttouser`;

-- CreateTable
CREATE TABLE `client_on_client_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NOT NULL,
    `clientGroupId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clients` ADD CONSTRAINT `clients_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_groups` ADD CONSTRAINT `client_groups_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_on_client_group` ADD CONSTRAINT `client_on_client_group_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`clientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_on_client_group` ADD CONSTRAINT `client_on_client_group_clientGroupId_fkey` FOREIGN KEY (`clientGroupId`) REFERENCES `client_groups`(`clientGroupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientToClientGroup` ADD CONSTRAINT `_ClientToClientGroup_A_fkey` FOREIGN KEY (`A`) REFERENCES `clients`(`clientId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientToClientGroup` ADD CONSTRAINT `_ClientToClientGroup_B_fkey` FOREIGN KEY (`B`) REFERENCES `client_groups`(`clientGroupId`) ON DELETE CASCADE ON UPDATE CASCADE;
