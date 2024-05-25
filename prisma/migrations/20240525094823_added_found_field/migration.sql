/*
  Warnings:

  - You are about to drop the column `isFound` on the `lostItems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lostItems" DROP COLUMN "isFound",
ADD COLUMN     "found" BOOLEAN NOT NULL DEFAULT false;
