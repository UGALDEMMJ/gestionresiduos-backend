import { Request, Response } from "express";
import { 
    getUsuarioService,  
    getUsuariosService,
    crearUsuarioService,
    actualizarUsuarioService,
    eliminarUsuarioService,
    verificarUsuarioService,
    manejoLoginService,
    manejoLogOutService,
    actualizarInformacionUsuarioService
} from "../services.ts/usuarioService";


interface AuthenticatedRequest extends Request {
    user?: any; 
}


const getUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarios = await getUsuariosService();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

const crearUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuario = await crearUsuarioService(req, res);
        res.status(201).json(usuario);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

const getUsuario = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userPayload = req.user;
    const id = typeof userPayload === 'object' && userPayload !== null ? userPayload.id : null;
    if (!id) {
      return res.status(400).json({ error: "ID de usuario no válido en token" });
    }

    const usuario = await getUsuarioService(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (err) {
    console.error("Error al obtener el usuario:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const actualizarUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuario = await actualizarUsuarioService(req, res);
        res.status(200).json({ message: "Usuario actualizado correctamente", usuario });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};


const eliminarUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        await eliminarUsuarioService(req, res);
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};


const verificarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { tokenUser } = req.params;

    try {
        await verificarUsuarioService(tokenUser);
        res.status(200).json({ message: "Usuario verificado correctamente" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};


const manejoLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        await manejoLoginService(req, res);     
    } catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};

const manejoLogOut = async (req: Request, res: Response): Promise<void> => {
    try {
        await manejoLogOutService(req, res);
        res.status(200).json({ message: "Sesión cerrada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al cerrar sesión" });
    }
};

const actualizarInformacionUsuario = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userPayload = req.user;

        const id = typeof userPayload === 'object' && userPayload !== null ? userPayload.id : null;
        if (!id) {
            return res.status(400).json({ error: "ID de usuario no válido en token" });
        }

        const usuarioActualizado = await actualizarInformacionUsuarioService(id, req.body);
        res.status(200).json({ message: "Información del usuario actualizada correctamente", usuario: usuarioActualizado });
    } catch (error) {
        console.error("Error al actualizar la información del usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};



export {
    getUsuarios,
    crearUsuario,
    getUsuario,
    actualizarUsuario,
    eliminarUsuario,
    verificarUsuario,
    manejoLogin,
    manejoLogOut,
    actualizarInformacionUsuario
};
