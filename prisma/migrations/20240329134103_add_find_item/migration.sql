-- CreateTable
CREATE TABLE "foundItems" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "foundItemName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foundItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "foundItems" ADD CONSTRAINT "foundItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundItems" ADD CONSTRAINT "foundItems_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "foundItemCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
