import { Request, Response } from "express";
import { 
    getResiduoService,
    getResiduosService,
    crearResiduoService,
    actualizarResiduoService,
    eliminarResiduoService
} from "../services.ts/residuosServices";


const getResiduos = async (req: Request, res: Response): Promise<void> => {
    try {
        const residuos = await getResiduosService();
        res.status(200).json(residuos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los residuos" });
    }
};

const crearResiduo = async (req: Request, res: Response): Promise<void> => {
    try {
        const residuo = await crearResiduoService(req, res);
        res.status(201).json(residuo);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

const getResiduo = async (req: Request, res: Response): Promise<void> => {
    try {
        const residuo = await getResiduoService(Number(req.params.id));
        if (!residuo) {
            res.status(404).json({ error: "Residuo no encontrado" });
            return;
        }
        res.status(200).json(residuo);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el residuo" });
    }
};

const actualizarResiduo = async (req: Request, res: Response): Promise<void> => {
    try {
        const residuo = await actualizarResiduoService(req, res);
        res.status(200).json({ message: "Residuo actualizado correctamente", residuo });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};


const eliminarResiduo = async (req: Request, res: Response): Promise<void> => {
    try {
        await eliminarResiduoService(req, res);
        res.status(200).json({ message: "Residuo eliminado correctamente" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export {
    getResiduos,
    crearResiduo,
    getResiduo,
    actualizarResiduo,
    eliminarResiduo
};
