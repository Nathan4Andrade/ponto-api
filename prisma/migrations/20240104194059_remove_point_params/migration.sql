/*
  Warnings:

  - You are about to drop the column `adjustment` on the `Point` table. All the data in the column will be lost.
  - You are about to drop the column `approvalStatus` on the `Point` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Point" DROP COLUMN "adjustment",
DROP COLUMN "approvalStatus";
