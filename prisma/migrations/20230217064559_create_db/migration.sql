-- CreateTable
CREATE TABLE `User` (
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExtendedProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `profileImage` VARCHAR(191) NULL,
    `job` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    UNIQUE INDEX `ExtendedProfile_userId_key`(`userId`),
    UNIQUE INDEX `ExtendedProfile_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExtendedProfile` ADD CONSTRAINT `ExtendedProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
