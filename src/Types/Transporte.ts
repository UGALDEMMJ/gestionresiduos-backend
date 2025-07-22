export type Transporte = {
  id: number;
  via_transporte: string;
  contacto: string;     
  matricula: string;
  usuarioId: number;
  residuos?: string[];    
};

export const mapTransporte = (residuo: any): Transporte => ({
    id: residuo.id,
    via_transporte: residuo.via_transporte,
    contacto: residuo.contacto,
    matricula: residuo.matricula,
    usuarioId: residuo.usuarioId,
    residuos: residuo.residuos ? residuo.residuos.map((r: any) => r.id.toString()) : [],
});
