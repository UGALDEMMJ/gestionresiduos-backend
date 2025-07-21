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
router.route('/allresiduos').get(getResiduos); 
// Rutas privadas
router.route('/obtenerresiduo/:id').get(authMiddleware,getResiduo)
router.route('/crearresiduo').post(authMiddleware,crearResiduo);
router.route('/actualizarresiduo/:id').put(authMiddleware, actualizarResiduo);
router.route('/eliminarresiduo/:id').delete(authMiddleware, eliminarResiduo);

export default router;