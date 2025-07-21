export type Usuario = {
  id: number;
  email: string;
  nombre: string;
  contrasenna?: string; // Optional, as it may not be returned in some contexts
  telefono: string | null;
  activado?: boolean; // Optional, as it may not be returned in some contexts
  token?: string; // Optional, as it may not be returned in some contexts 
  creado_en: Date;
  generadores?: string[];
  transportes?: string[];
  residuos?: string[];
}

export type privUsuario = {
  id: number;
  email: string;
  nombre: string;
  contrasenna?: string; 
  activado?: boolean; 
  token?: string; 
}



interface Generador {
  id: number;
}

interface Transporte {
  id: number;
}

interface Residuo {
  id: number;
}

interface RawUsuario {
  id: number;
  email: string;
  nombre?: string;
  telefono: string | null;
  generadores: Generador[];
  transportes: Transporte[];
  residuos: Residuo[];
  creado_en: Date;
}

export const mapUsuario = (usuario: RawUsuario): Usuario => ({
  id: usuario.id,
  email: usuario.email,
  nombre: usuario.nombre ?? "",
  telefono: usuario.telefono,
  generadores: usuario.generadores.map((g: Generador) => g.id.toString()),
  transportes: usuario.transportes.map((t: Transporte) => t.id.toString()),
  residuos: usuario.residuos.map((r: Residuo) => r.id.toString()),
  creado_en: usuario.creado_en
});
