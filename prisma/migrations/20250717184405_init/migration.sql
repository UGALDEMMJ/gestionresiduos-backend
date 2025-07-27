/*
  Warnings:

  - Added the required column `contrasenna` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Made the column `nombre` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "contrasenna" TEXT NOT NULL,
ALTER COLUMN "nombre" SET NOT NULL;
