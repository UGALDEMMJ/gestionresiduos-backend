import { Request, Response } from "express";
import {
    getTransporteService,
    getTransportesService,
    crearTransporteService,
    actualizarTransporteService,
    eliminarTransporteService
} from "../services.ts/transporteServices";

const getTransportes = async (req: Request, res: Response): Promise<void> => {
    try {
        const transportes = await getTransportesService();
        res.status(200).json(transportes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los transportes" });
    }
};

const crearTransporte = async (req: Request, res: Response): Promise<void> => {
    try {
        const transporte = await crearTransporteService(req, res);
        res.status(201).json(transporte);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

const getTransporte = async (req: Request, res: Response): Promise<void> => {
    try {
        const transporte = await getTransporteService(Number(req.params.id));
        if (!transporte) {
            res.status(404).json({ error: "Transporte no encontrado" });
            return;
        }
        res.status(200).json(transporte);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el transporte" });
    }
};

const actualizarTransporte = async (req: Request, res: Response): Promise<void> => {
    try {
        const transporte = await actualizarTransporteService(req, res);
        res.status(200).json({ message: "Transporte actualizado correctamente", transporte });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

const eliminarTransporte = async (req: Request, res: Response): Promise<void> => {
    try {
        await eliminarTransporteService(req, res);
        res.status(204).json({ message: "Transporte eliminado correctamente" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export {
    getTransportes,
    crearTransporte,
    getTransporte,
    actualizarTransporte,
    eliminarTransporte
};

