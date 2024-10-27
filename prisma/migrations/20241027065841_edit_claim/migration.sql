-- DropForeignKey
ALTER TABLE "claims" DROP CONSTRAINT "claims_foundItemId_fkey";

-- AlterTable
ALTER TABLE "claims" ADD COLUMN     "lostItemId" TEXT,
ALTER COLUMN "foundItemId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_foundItemId_fkey" FOREIGN KEY ("foundItemId") REFERENCES "foundItems"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_lostItemId_fkey" FOREIGN KEY ("lostItemId") REFERENCES "lostItems"("id") ON DELETE SET NULL ON UPDATE CASCADE;
