/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `ActivationCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActivationCode_customerId_key" ON "ActivationCode"("customerId");
