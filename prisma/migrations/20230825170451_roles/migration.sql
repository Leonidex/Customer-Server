-- CreateEnum
CREATE TYPE "RolesEnum" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "role" "RolesEnum" NOT NULL DEFAULT 'USER';
