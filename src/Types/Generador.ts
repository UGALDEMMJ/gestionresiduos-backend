export type Generador = {
  id: number;
  nombre: string;
  encargado?: string;
  contacto?: string;
  descripcion?: string;
  usuarioId: number;
  residuos?: [];
}

export const mapGenerador = (generador: any): Generador => ({
  id: generador.id,
  nombre: generador.nombre,
  encargado: generador.encargado || "",
  contacto: generador.contacto || "",
  descripcion: generador.descripcion || "",
  usuarioId: generador.usuarioId,
  residuos: generador.residuos ? generador.residuos.map((r: any) => r.id.toString()) : [],
});