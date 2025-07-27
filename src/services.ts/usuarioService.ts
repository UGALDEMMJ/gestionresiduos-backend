import { prisma } from "../config/db";
import { hashearPassword, verificarPassword } from "../helpers/hashearPassword";
import { Usuario, mapUsuario, privUsuario } from "../Types/Usuarios";
import { generarJWT } from "../helpers/generarJWT";
import { Request, Response } from "express";

const getUsuarioService = async (id: number): Promise<Usuario | null> => {
    const usuario = await prisma.usuario.findUnique({
        where: { id },
        include: {
            generadores: true,
            transportes: true,
            residuos: true
        }
    });

    return usuario ? mapUsuario(usuario) : null;

}

const getUsuarioByEmailService = async (email: string): Promise<Usuario | null> => {
    const usuario = await prisma.usuario.findUnique({
        where: { email },
        include: {
            generadores: true,
            transportes: true,
            residuos: true
        }
    });

    return usuario ? {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        contrasenna: usuario.contrasenna,
        activado: usuario.activado,
        telefono: usuario.telefono,
        creado_en: usuario.creado_en,
        token: usuario.token || undefined,
    } : null;
}


const getUsuariosService = async (): Promise<Usuario[]> => {
    const usuarios = await prisma.usuario.findMany({
        include: {
            generadores: true,
            transportes: true,
            residuos: true
        }
    });

    return usuarios.map(mapUsuario);
}

const crearUsuarioService = async (req: Request, res: Response): Promise<Usuario> => {

    const { email, nombre, contrasenna } = req.body;

    const usuarioExiste = await getUsuarioByEmailService(email);
    if (usuarioExiste) {
        throw new Error("El usuario ya existe");
    }

    const hashContrasenna = contrasenna ? await hashearPassword(contrasenna) : "";

    const usuario = await prisma.usuario.create({
        data: {
            email,
            nombre,
            contrasenna: hashContrasenna || "",
            telefono: null, 
        }
    });

    await prisma.usuario.update({
        where: { id: usuario.id },
        data: {
            token: generarJWT({ id: usuario.id })
        }
    });
    return {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre ?? "",
        telefono: usuario.telefono,
        generadores: [],
        transportes: [],
        residuos: [],
        creado_en: usuario.creado_en,
    };

}

const actualizarUsuarioService = async (req: Request, res: Response): Promise<privUsuario> => {
    const { id } = req.params;
    const { email, nombre, telefono, contrasenna } = req.body;
    const usuarioExistente = await getUsuarioService(Number(id));

    if (!usuarioExistente) {
        throw new Error("Usuario no encontrado");
    }

    let hashContrasenna: string | undefined;
    if (contrasenna) {
        hashContrasenna = await hashearPassword(contrasenna);
        if (!hashContrasenna) {
            throw new Error("Error al hashear la contraseña");
        }
    }
    const usuario = await prisma.usuario.update({
        where: { id: Number(id) },
        data: {
            email: email || usuarioExistente.email,
            nombre: nombre || usuarioExistente.nombre,
            contrasenna: hashContrasenna || usuarioExistente.contrasenna,
            telefono: telefono || usuarioExistente.telefono,
        },
        include: {
            generadores: true,
            transportes: true,
            residuos: true
        }
    });

    return mapUsuario(usuario);
}

const eliminarUsuarioService = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;
    await prisma.usuario.delete({
        where: { id: Number(id) }
    });
};

const verificarUsuarioService = async (tokenUser: string): Promise<void> => {
    const usuario = await prisma.usuario.findFirst({
        where: { token: tokenUser }
    });

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    await prisma.usuario.update({
        where: { id: usuario.id },
        data: {
            activado: true,
            token: null
        }
    });
};

const manejoLoginService = async (req: Request, res: Response): Promise<void> => {
    const { email, contrasenna } = req.body;

    try {
        const usuario = await getUsuarioByEmailService(email);
        if (!usuario) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }

        if (!usuario.activado) {
            res.status(401).json({ error: "Usuario no ha sido verificado" });
            return;
        }

        if (usuario.contrasenna) {
            const contrasennaValida = await verificarPassword(contrasenna, usuario.contrasenna);
            if (!contrasennaValida) {
                res.status(401).json({ error: "Credenciales incorrectas" });
                return;
            }
        }

        const tokenLogin = generarJWT({ id: usuario.id });
        await prisma.usuario.update({
            where: { id: usuario.id },
            data: { token: tokenLogin }
        });
        res.status(200).json({ 
            message: "Token de login generado correctamente", 
            token: tokenLogin 
        });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

const manejoLogOutService = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    await prisma.usuario.update({
        where: { id: Number(id) },
        data: { token: null }
    });
}

const actualizarInformacionUsuarioService = async (req: Request, res: Response): Promise<Usuario> => {
    const { id } = req.params;
    const { email, nombre, telefono, contrasenna } = req.body;

    const usuarioExistente = await getUsuarioService(Number(id));

    if (!usuarioExistente) {
        throw new Error("Usuario no encontrado");
    }

    let hashContrasenna: string | undefined;
    if (contrasenna) {
        hashContrasenna = await hashearPassword(contrasenna);
        if (!hashContrasenna) {
            throw new Error("Error al hashear la contraseña");
        }
    }

    const usuarioActualizado = await prisma.usuario.update({
        where: { id: Number(id) },
        data: {
            email: email || usuarioExistente.email,
            nombre: nombre || usuarioExistente.nombre,
            telefono: telefono || usuarioExistente.telefono,
            contrasenna: hashContrasenna || usuarioExistente.contrasenna,
        },
        include: {
            generadores: true,
            transportes: true,
            residuos: true
        }
    });

    return mapUsuario(usuarioActualizado);
};

export {
    getUsuarioService,
    getUsuarioByEmailService,
    getUsuariosService,
    crearUsuarioService,
    actualizarUsuarioService,
    eliminarUsuarioService,
    verificarUsuarioService,
    manejoLoginService,
    manejoLogOutService,
    actualizarInformacionUsuarioService
};