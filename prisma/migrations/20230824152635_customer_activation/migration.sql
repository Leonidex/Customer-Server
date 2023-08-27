-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('INITIAL', 'VERIFIED');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "activationCode" TEXT NOT NULL,
ADD COLUMN     "status" "StatusEnum" NOT NULL DEFAULT 'INITIAL';
