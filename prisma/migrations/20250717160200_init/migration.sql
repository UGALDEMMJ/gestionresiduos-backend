-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT,
    "telefono" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generador" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "encargado" TEXT,
    "contacto" TEXT,
    "descripcion" TEXT,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Generador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transporte" (
    "id" SERIAL NOT NULL,
    "via_transporte" TEXT NOT NULL,
    "contacto" TEXT,
    "matricula" TEXT,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Transporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Residuo" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "cantidad" TEXT,
    "condicion" TEXT,
    "fecha_coleccion" TIMESTAMP(3),
    "preparacion" TEXT,
    "observaciones" TEXT,
    "imagen_url" TEXT,
    "usuarioId" INTEGER NOT NULL,
    "generadorId" INTEGER,
    "transporteId" INTEGER,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Residuo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Generador" ADD CONSTRAINT "Generador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transporte" ADD CONSTRAINT "Transporte_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residuo" ADD CONSTRAINT "Residuo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residuo" ADD CONSTRAINT "Residuo_generadorId_fkey" FOREIGN KEY ("generadorId") REFERENCES "Generador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residuo" ADD CONSTRAINT "Residuo_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "Transporte"("id") ON DELETE SET NULL ON UPDATE CASCADE;
