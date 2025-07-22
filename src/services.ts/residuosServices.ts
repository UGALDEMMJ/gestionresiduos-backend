import { prisma } from "../config/db";
import { Residuo, mapResiduo } from "../Types/Residuos";
import { Request, Response } from "express";

const getResiduoService = async (id: number): Promise<Residuo | null> => {
    const residuo = await prisma.residuo.findUnique({
        where: { id },
    });
    return residuo ? mapResiduo(residuo) : null;
}

const getResiduosService = async (): Promise<Residuo[]> => {
    const residuos = await prisma.residuo.findMany({});
    return residuos.map(mapResiduo);
}

const crearResiduoService = async (req: Request, res: Response): Promise<Residuo> => {

    const { tipo, cantidad, condicion, fecha_coleccion, preparacion, observaciones, imagen_url, usuarioId, generadorId, transporteId } = req.body;

    const residuo = await prisma.residuo.create({
        data: {
            tipo,
            cantidad,
            condicion,
            fecha_coleccion,
            preparacion,
            observaciones,
            imagen_url,
            usuarioId,
            generadorId,
            transporteId
        }
    });

    return {
        id: residuo.id,
        tipo: residuo.tipo,
        cantidad: residuo.cantidad ?? "",
        condicion: residuo.condicion ?? "",
        fecha_coleccion: residuo.fecha_coleccion ?? new Date(),
        preparacion: residuo.preparacion ?? "",
        observaciones: residuo.observaciones ?? "",
        imagen_url: residuo.imagen_url ?? "",
        usuarioId: residuo.usuarioId,
        generadorId: residuo.generadorId ?? undefined,
        transporteId: residuo.transporteId ?? undefined,
        creado_en: residuo.creado_en
    };
}

const actualizarResiduoService = async (req: Request, res: Response): Promise<Residuo> => {
    const { id } = req.params;
    const { tipo, cantidad, condicion, fecha_coleccion, preparacion, observaciones, imagen_url, usuarioId, generadorId, transporteId } = req.body;

    const residuoExistente = await getResiduoService(Number(id));
    if (!residuoExistente) {
        throw new Error("Residuo no encontrado");
    }

    const residuo = await prisma.residuo.update({
        where: { id: Number(id) },
        data: {
            tipo: tipo || residuoExistente.tipo,
            cantidad: cantidad || residuoExistente.cantidad,
            condicion: condicion || residuoExistente.condicion,
            fecha_coleccion: fecha_coleccion || residuoExistente.fecha_coleccion,
            preparacion: preparacion || residuoExistente.preparacion,
            observaciones: observaciones || residuoExistente.observaciones,
            imagen_url: imagen_url || residuoExistente.imagen_url,
            usuarioId: usuarioId || residuoExistente.usuarioId,
            generadorId: generadorId || residuoExistente.generadorId,
            transporteId: transporteId || residuoExistente.transporteId
        }
    });

    return mapResiduo(residuo);
}

const  eliminarResiduoService = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await prisma.residuo.delete({
        where: { id: Number(id) }
    });
}

export {
    getResiduoService,
    getResiduosService,
    crearResiduoService,
    actualizarResiduoService,
    eliminarResiduoService
};
