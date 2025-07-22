import { prisma } from "../config/db";
import { Generador, mapGenerador } from "../Types/Generador";
import { Request, Response } from "express";

const getGeneradorService = async (id: number): Promise<Generador | null> => {
    const generador = await prisma.generador.findUnique({
        where: { id },
    });
    return generador ? mapGenerador(generador) : null;
}

const getGeneradoresService = async (): Promise<Generador[]> => {
    const generadores = await prisma.generador.findMany({});
    return generadores.map(mapGenerador);
}

const crearGeneradorService = async (req: Request, res: Response): Promise<Generador> => {

    const { nombre, encargado, contacto, descripcion, usuarioId } = req.body;

    const generador = await prisma.generador.create({
        data: {
            nombre,
            encargado,
            contacto,
            descripcion,
            usuarioId
        }
    });

    return {
        id: generador.id,
        nombre: generador.nombre,
        encargado: generador.encargado || "",
        contacto: generador.contacto || "",
        descripcion: generador.descripcion || "",
        usuarioId: generador.usuarioId,
        residuos: [],
    }
}

const actualizarGeneradorService = async (req: Request, res: Response): Promise<Generador> => {
    const { id } = req.params;
    const { nombre, encargado, contacto, descripcion, usuarioId } = req.body;
    const generadorExistente = await getGeneradorService(Number(id));

    if (!generadorExistente) {
        throw new Error("Generador no encontrado");
    }

    const generador = await prisma.generador.update({
        where: { id: Number(id) },
        data: {
            nombre: nombre || generadorExistente.nombre,
            encargado: encargado || generadorExistente.encargado,
            contacto: contacto || generadorExistente.contacto,
            descripcion: descripcion || generadorExistente.descripcion,
            usuarioId: usuarioId || generadorExistente.usuarioId,
        }, include: {
            residuos: true
        }
    });
    return mapGenerador(generador);
}

const eliminarGeneradorService = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await prisma.generador.delete({
        where: { id: Number(id) }
    });
}

export {
    getGeneradorService,
    getGeneradoresService,
    crearGeneradorService,
    actualizarGeneradorService,
    eliminarGeneradorService
};
