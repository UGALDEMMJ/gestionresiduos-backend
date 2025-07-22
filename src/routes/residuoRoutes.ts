import express from 'express';
import {
    getResiduos,
    crearResiduo,
    getResiduo,
    actualizarResiduo,
    eliminarResiduo
} from '../controllers/residuosController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();
// Rutas públicas
router.route('/all').get(getResiduos); 
// Rutas privadas
router.route('/crear').post(authMiddleware,crearResiduo);
router.route('/obtener/:id').get(authMiddleware,getResiduo)
router.route('/actualizar/:id').put(authMiddleware, actualizarResiduo);
router.route('/eliminar/:id').delete(authMiddleware, eliminarResiduo);

export default router;