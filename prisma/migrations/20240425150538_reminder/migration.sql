/*
  Warnings:

  - You are about to drop the `shedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `shedules` DROP FOREIGN KEY `shedules_clientGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `shedules` DROP FOREIGN KEY `shedules_messageId_fkey`;

-- DropForeignKey
ALTER TABLE `shedules` DROP FOREIGN KEY `shedules_userId_fkey`;

-- DropTable
DROP TABLE `shedules`;

-- CreateTable
CREATE TABLE `schedules` (
    `scheduleId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `clientGroupId` INTEGER NOT NULL,
    `messageId` INTEGER NOT NULL,
    `reminderInterval` ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL,
    `daysBeforeAppointment` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`scheduleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_clientGroupId_fkey` FOREIGN KEY (`clientGroupId`) REFERENCES `client_groups`(`clientGroupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `messages`(`messageId`) ON DELETE RESTRICT ON UPDATE CASCADE;
