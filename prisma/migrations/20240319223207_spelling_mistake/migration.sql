/*
  Warnings:

  - You are about to drop the column `appoinment` on the `clients` table. All the data in the column will be lost.
  - Added the required column `appointment` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clients` DROP COLUMN `appoinment`,
    ADD COLUMN `appointment` DATETIME(3) NOT NULL;
