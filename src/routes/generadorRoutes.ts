import express from 'express';
import {
    getGeneradores,
    crearGenerador,
    getGenerador,
    actualizarGenerador,
    eliminarGenerador
} from '../controllers/generadorController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();
// Rutas públicas
router.route('/all').get(getGeneradores);
// Rutas privadas
router.route('/crear').post(authMiddleware, crearGenerador);
router.route('/obtener/:id').get(authMiddleware, getGenerador);
router.route('/actualizar/:id').put(authMiddleware, actualizarGenerador);
router.route('/eliminar/:id').delete(authMiddleware, eliminarGenerador);

export default router;