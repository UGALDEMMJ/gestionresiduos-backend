import express from 'express';
import{
    getTransportes,
    crearTransporte,
    getTransporte,
    actualizarTransporte,
    eliminarTransporte
} from '../controllers/transporteController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();
// Rutas públicas
router.route('/all').get(getTransportes);
// Rutas privadas
router.route('/crear').post(authMiddleware, crearTransporte);
router.route('/obtener/:id').get(authMiddleware, getTransporte);
router.route('/actualizar/:id').put(authMiddleware, actualizarTransporte);
router.route('/eliminar/:id').delete(authMiddleware, eliminarTransporte);

export default router;