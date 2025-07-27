import express from 'express';
import 
{ 
    actualizarUsuario,
    crearUsuario,
    eliminarUsuario,
    getUsuario,
    getUsuarios,
    manejoLogin,
    verificarUsuario,
    manejoLogOut,
    actualizarInformacionUsuario
} from '../controllers/usuarioController';
import authMiddleware from '../middleware/authMiddleware';

const routerUsuario = express.Router();

//Rutas publicas
routerUsuario.route('/perfiles/').get(getUsuarios);
routerUsuario.route('/signup').post(crearUsuario);
routerUsuario.route('/login').post(manejoLogin);
routerUsuario.route('/verificar/:tokenUser').post(verificarUsuario);
routerUsuario.route('/delete/:id').delete(eliminarUsuario);
routerUsuario.route('/actualizar/:id').post(actualizarInformacionUsuario);
routerUsuario.route('/logout/:id').post(manejoLogOut);

//Rutas privadas
routerUsuario.route('/perfil/').get(authMiddleware, getUsuario);
routerUsuario.route('/actualizar/:id').put(authMiddleware, actualizarUsuario);
routerUsuario.route('/eliminar/:id').delete(authMiddleware, eliminarUsuario);


export default routerUsuario;