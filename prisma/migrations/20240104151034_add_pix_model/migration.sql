-- CreateTable
CREATE TABLE "Pix" (
    "campaign_id" TEXT NOT NULL,
    "tx_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Pix_campaign_id_key" ON "Pix"("campaign_id");
