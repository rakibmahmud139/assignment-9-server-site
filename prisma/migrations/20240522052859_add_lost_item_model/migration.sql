-- AlterTable
ALTER TABLE "foundItems" ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "photo" TEXT;

-- CreateTable
CREATE TABLE "lostItems" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "foundItemName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "isFound" TEXT,
    "contactNumber" TEXT,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lostItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lostItems" ADD CONSTRAINT "lostItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lostItems" ADD CONSTRAINT "lostItems_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "foundItemCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
