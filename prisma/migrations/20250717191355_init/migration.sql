/*
  Warnings:

  - You are about to alter the column `contrasenna` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(72)`.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "activado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "token" TEXT,
ALTER COLUMN "contrasenna" SET DATA TYPE VARCHAR(72);
