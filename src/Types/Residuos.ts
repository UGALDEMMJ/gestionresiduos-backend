export type Residuo = {
  id: number;
  tipo: string;
  cantidad?: string;
  condicion?: string;
  fecha_coleccion: Date;
  preparacion?: string;
  observaciones?: string;
  imagen_url?: string;
  usuarioId: number;
  generadorId?: number;
  transporteId?: number;
  creado_en: Date;
};

export const mapResiduo = (residuo: any): Residuo => ({
  id: residuo.id,
  tipo: residuo.tipo,
  cantidad: residuo.cantidad,
  condicion: residuo.condicion,
  fecha_coleccion: residuo.fecha_coleccion,
  preparacion: residuo.preparacion,
  observaciones: residuo.observaciones,
  imagen_url: residuo.imagen_url,
  usuarioId: residuo.usuarioId,
  generadorId: residuo.generadorId,
  transporteId: residuo.transporteId,
  creado_en: residuo.creado_en,
});
