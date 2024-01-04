/*
  Warnings:

  - A unique constraint covering the columns `[tx_id]` on the table `Pix` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Pix_campaign_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Pix_tx_id_key" ON "Pix"("tx_id");
