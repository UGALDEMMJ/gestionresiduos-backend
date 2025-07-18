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
    cambioContrasenna
} from '../controllers/usuarioController';

const routerUsuario = express.Router();

//Rutas publicas
routerUsuario.route('/perfiles/').get(getUsuarios);
routerUsuario.route('/signup').post(crearUsuario);
routerUsuario.route('/login').get(manejoLogin);
routerUsuario.route('/verificar/:token').get(verificarUsuario);
routerUsuario.route('/delete/:id').delete(eliminarUsuario);
routerUsuario.route('/recuperar-contrasena/:token').put(cambioContrasenna);
routerUsuario.route('/logout/:id').post(manejoLogOut);

//Rutas privadas
routerUsuario.route('/perfil/:id').get(getUsuario);
routerUsuario.route('/actualizar/:id').put(actualizarUsuario);




export default routerUsuario;