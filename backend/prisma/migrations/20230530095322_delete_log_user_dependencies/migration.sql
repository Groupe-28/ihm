/*
  Warnings:

  - You are about to drop the column `authorId` on the `Log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_authorId_fkey";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "authorId";
