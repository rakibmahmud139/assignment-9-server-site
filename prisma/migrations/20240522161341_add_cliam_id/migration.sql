/*
  Warnings:

  - Added the required column `lostItemId` to the `claims` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "claims" ADD COLUMN     "lostItemId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_lostItemId_fkey" FOREIGN KEY ("lostItemId") REFERENCES "lostItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
