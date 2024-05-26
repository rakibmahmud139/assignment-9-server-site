/*
  Warnings:

  - You are about to drop the column `lostItemId` on the `claims` table. All the data in the column will be lost.
  - Added the required column `photo` to the `claims` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "claims" DROP CONSTRAINT "claims_lostItemId_fkey";

-- AlterTable
ALTER TABLE "claims" DROP COLUMN "lostItemId",
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "securityFeatures" TEXT,
ADD COLUMN     "thirdPartyConfirmation" TEXT;
