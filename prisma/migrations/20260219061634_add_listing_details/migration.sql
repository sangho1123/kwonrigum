-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Listing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" TEXT,
    "description" TEXT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "address_area" TEXT,
    "address_full" TEXT,
    "rent_monthly" INTEGER,
    "deposit" INTEGER,
    "goodwill_price" INTEGER,
    "monthly_sales" INTEGER,
    "parking_spaces" INTEGER,
    "lat" REAL,
    "lng" REAL,
    "isRevenueVerified" BOOLEAN NOT NULL DEFAULT false,
    "isBuildingLedgerVerified" BOOLEAN NOT NULL DEFAULT false,
    "isRegistryVerified" BOOLEAN NOT NULL DEFAULT false,
    "revenueProofUrl" TEXT,
    "buildingLedgerUrl" TEXT,
    "registryUrl" TEXT,
    "photos" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Listing_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Listing" ("address_area", "category", "createdAt", "deposit", "goodwill_price", "id", "lat", "lng", "monthly_sales", "ownerId", "parking_spaces", "photos", "rent_monthly", "title") SELECT "address_area", "category", "createdAt", "deposit", "goodwill_price", "id", "lat", "lng", "monthly_sales", "ownerId", "parking_spaces", "photos", "rent_monthly", "title" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
CREATE INDEX "Listing_ownerId_idx" ON "Listing"("ownerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
