import { Request, Response } from "express";
import { 
    getGeneradorService,  
    getGeneradoresService,
    crearGeneradorService,
    actualizarGeneradorService,
    eliminarGeneradorService
} from "../services.ts/generadorServices";

const getGeneradores = async (req: Request, res: Response): Promise<void> => {
    try {
        const generadores = await getGeneradoresService();
        res.status(200).json(generadores);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los generadores" });
    }
};

const crearGenerador = async (req: Request, res: Response): Promise<void> => {
    try {
        const generador = await crearGeneradorService(req, res);
        res.status(201).json(generador);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

const getGenerador = async (req: Request, res: Response): Promise<void> => {
    try {
        const generador = await getGeneradorService(Number(req.params.id));
        if (!generador) {
            res.status(404).json({ error: "Generador no encontrado" });
            return;
        }
        res.status(200).json(generador);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el generador" });
    }
};

const actualizarGenerador = async (req: Request, res: Response): Promise<void> => {
    try {
        const generador = await actualizarGeneradorService(req, res);
        res.status(200).json({ message: "Generador actualizado correctamente", generador });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

const eliminarGenerador = async (req: Request, res: Response): Promise<void> => {
    try {
        await eliminarGeneradorService(req, res);
        res.status(204).json({ message: "Generador eliminado correctamente" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export{
    getGeneradores,
    crearGenerador,
    getGenerador,
    actualizarGenerador,
    eliminarGenerador
}