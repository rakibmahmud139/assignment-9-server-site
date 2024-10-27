/*
  Warnings:

  - A unique constraint covering the columns `[lostItemId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_foundItemId_fkey";

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "lostItemId" TEXT,
ALTER COLUMN "foundItemId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reviews_lostItemId_key" ON "reviews"("lostItemId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_foundItemId_fkey" FOREIGN KEY ("foundItemId") REFERENCES "foundItems"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_lostItemId_fkey" FOREIGN KEY ("lostItemId") REFERENCES "lostItems"("id") ON DELETE SET NULL ON UPDATE CASCADE;
