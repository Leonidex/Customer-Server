/*
  Warnings:

  - You are about to drop the column `hashedToken` on the `ActivationCode` table. All the data in the column will be lost.
  - Added the required column `code` to the `ActivationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivationCode" DROP COLUMN "hashedToken",
ADD COLUMN     "code" TEXT NOT NULL;
