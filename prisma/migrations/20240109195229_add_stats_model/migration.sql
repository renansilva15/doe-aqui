-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "total_registered_campaigns" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);
