/*
 Warnings:
 
 - The primary key for the `Url` table will be changed. If it partially fails, the table could be left without primary key constraint.
 - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
 
 */
-- DropForeignKey
ALTER TABLE `UserUrl` DROP FOREIGN KEY `UserUrl_urlId_fkey`;
-- DropForeignKey
ALTER TABLE `UserUrl` DROP FOREIGN KEY `UserUrl_userId_fkey`;
-- AlterTable
ALTER TABLE `Url` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
-- AlterTable
ALTER TABLE `UserUrl` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
-- AlterTable
ALTER TABLE `UserUrl`
MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `urlId` VARCHAR(191) NOT NULL;
-- AddForeignKey
ALTER TABLE `UserUrl`
ADD CONSTRAINT `UserUrl_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `UserUrl`
ADD CONSTRAINT `UserUrl_urlId_fkey` FOREIGN KEY (`urlId`) REFERENCES `Url`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;