import { prisma } from "../config/db";
import { Transporte, mapTransporte   } from "../Types/Transporte";
import { Request, Response } from "express";

const getTransporteService = async (id: number): Promise<Transporte | null> => {
    const transporte = await prisma.transporte.findUnique({
        where: { id },
    });
    return transporte ? mapTransporte(transporte) : null;
}

const getTransportesService = async (): Promise<Transporte[]> => {
    const transportes = await prisma.transporte.findMany({});
    return transportes.map(mapTransporte);
}

const crearTransporteService = async (req: Request, res: Response): Promise<Transporte> => {

    const { via_transporte, contacto, matricula, usuarioId, } = req.body;

    const transporte = await prisma.transporte.create({
        data: {
            via_transporte,
            contacto,
            matricula,
            usuarioId
        }
    });

    return {
      id: transporte.id,
      via_transporte: transporte.via_transporte,
      contacto: transporte.contacto || "",
      matricula: transporte.matricula || "",
      usuarioId: transporte.usuarioId,
      residuos: [],
    };
}

const actualizarTransporteService = async (req: Request, res: Response): Promise<Transporte> => {
    const { id } = req.params;
    const { via_transporte, contacto, matricula, usuarioId } = req.body;
    const transporteExistente = await getTransporteService(Number(id));

    if (!transporteExistente) {
        throw new Error("Transporte no encontrado");
    }

    const transporte = await prisma.transporte.update({
        where: { id: Number(id) },
        data: {
            via_transporte: via_transporte || transporteExistente.via_transporte,
            contacto: contacto || transporteExistente.contacto,
            matricula: matricula || transporteExistente.matricula,
            usuarioId: usuarioId || transporteExistente.usuarioId,
        }, include: {
            residuos: true
        }
    });
    return mapTransporte(transporte);
}

const eliminarTransporteService = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await prisma.transporte.delete({
        where: { id: Number(id) }
    });
}

export {
    getTransporteService,
    getTransportesService,
    crearTransporteService,
    actualizarTransporteService,
    eliminarTransporteService
};
