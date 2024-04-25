-- CreateTable
CREATE TABLE `shedules` (
    `sheduleId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `clientGroupId` INTEGER NOT NULL,
    `messageId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`sheduleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message_histories` (
    `messageHistoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `messageId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,
    `clientGroupId` INTEGER NOT NULL,
    `flag` ENUM('Success', 'Error') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`messageHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `shedules` ADD CONSTRAINT `shedules_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shedules` ADD CONSTRAINT `shedules_clientGroupId_fkey` FOREIGN KEY (`clientGroupId`) REFERENCES `client_groups`(`clientGroupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shedules` ADD CONSTRAINT `shedules_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `messages`(`messageId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message_histories` ADD CONSTRAINT `message_histories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message_histories` ADD CONSTRAINT `message_histories_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `messages`(`messageId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message_histories` ADD CONSTRAINT `message_histories_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`clientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message_histories` ADD CONSTRAINT `message_histories_clientGroupId_fkey` FOREIGN KEY (`clientGroupId`) REFERENCES `client_groups`(`clientGroupId`) ON DELETE RESTRICT ON UPDATE CASCADE;
