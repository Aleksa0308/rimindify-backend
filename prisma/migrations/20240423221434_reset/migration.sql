/*
  Warnings:

  - The primary key for the `client_on_client_group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `client_on_client_group` table. All the data in the column will be lost.
  - You are about to drop the `_clienttoclientgroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_clienttoclientgroup` DROP FOREIGN KEY `_ClientToClientGroup_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clienttoclientgroup` DROP FOREIGN KEY `_ClientToClientGroup_B_fkey`;

-- AlterTable
ALTER TABLE `client_on_client_group` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`clientId`, `clientGroupId`);

-- DropTable
DROP TABLE `_clienttoclientgroup`;
