/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Thread` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Made the column `category` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Listing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" TEXT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "address_area" TEXT,
    "rent_monthly" INTEGER,
    "deposit" INTEGER,
    "goodwill_price" INTEGER,
    "monthly_sales" INTEGER,
    "parking_spaces" INTEGER,
    "photos" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Listing_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Listing" ("address_area", "category", "createdAt", "deposit", "goodwill_price", "id", "monthly_sales", "ownerId", "parking_spaces", "photos", "rent_monthly", "title") SELECT "address_area", "category", "createdAt", "deposit", "goodwill_price", "id", "monthly_sales", "ownerId", "parking_spaces", "photos", "rent_monthly", "title" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
CREATE INDEX "Listing_ownerId_idx" ON "Listing"("ownerId");
CREATE TABLE "new_Thread" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "listingId" INTEGER,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAdminReadAt" DATETIME,
    "lastUserReadAt" DATETIME,
    CONSTRAINT "Thread_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Thread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Thread" ("createdAt", "id", "lastAdminReadAt", "lastUserReadAt", "listingId", "type", "userId") SELECT "createdAt", "id", "lastAdminReadAt", "lastUserReadAt", "listingId", "type", "userId" FROM "Thread";
DROP TABLE "Thread";
ALTER TABLE "new_Thread" RENAME TO "Thread";
CREATE INDEX "Thread_type_listingId_idx" ON "Thread"("type", "listingId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'CLIENT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "role") SELECT "createdAt", "email", "id", "name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
