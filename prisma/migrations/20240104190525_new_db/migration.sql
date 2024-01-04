/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `pointStatusId` on the `Point` table. All the data in the column will be lost.
  - You are about to drop the column `dayOfWeekId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `timeId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the `DayOfWeek` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Time` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryTime` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exitTime` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_pointStatusId_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_timeId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_dayOfWeekId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_timeId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "departmentId",
DROP COLUMN "roleId",
ADD COLUMN     "role" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "pointStatusId",
ADD COLUMN     "adjustment" TEXT,
ADD COLUMN     "approvalStatus" TEXT,
ADD COLUMN     "entryTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "exitTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "justification" TEXT;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "dayOfWeekId",
DROP COLUMN "timeId";

-- DropTable
DROP TABLE "DayOfWeek";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Time";
