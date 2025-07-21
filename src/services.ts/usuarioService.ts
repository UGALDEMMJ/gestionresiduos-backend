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

    return {
        id: usuario?.id || 0,
        email: usuario?.email || "",
        nombre: usuario?.nombre || "",
        contrasenna: usuario?.contrasenna || "",
        activado: usuario?.activado || false,
        telefono: usuario?.telefono || null,
        creado_en: usuario?.creado_en || new Date(0),
        token: usuario?.token || undefined,
    }
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
            telefono: null, // Assuming telefono is optional and can be null
        }
    });

    const token = generarJWT({ id: usuario.id });

    await prisma.usuario.update({
        where: { id: usuario.id },
        data: {
            token: generarJWT({ id: usuario.id })
        }
    });

    console.log(email, token);
    // await enviarEmailRegistro(email, token || "");

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

const verificarUsuarioService = async (req: Request, res: Response): Promise<void> => {

    const { tokenUser } = req.params;

    const usuario = await prisma.usuario.findFirst({
        where: { token: tokenUser }
    });

    if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
    }

    await prisma.usuario.update({
        where: { id: usuario.id },
        data: {
            activado: true,
            token: null
        }
    });
};

const manejoLoginService = async (req: Request, res: Response): Promise<Usuario | void> => {

    const { email, contrasenna } = req.body;
    const usuario = await getUsuarioByEmailService(email); 
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    if (!usuario.activado) {
        throw new Error("Usuario no ha sido verificado");
    }

    if (usuario.contrasenna) {
        const contrasennaValida = await verificarPassword(contrasenna, usuario.contrasenna);
        if (!contrasennaValida) {
            throw new Error("Credenciales incorrecta");
        }
    }

    const tokenLogin = generarJWT({ id: usuario.id });
    await prisma.usuario.update({
        where: { id: usuario.id },
        data: { token: tokenLogin }
    });
    console.log("Usuario autenticado:", usuario.email, "Token:", tokenLogin);
}

const manejoLogOutService = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    await prisma.usuario.update({
        where: { id: Number(id) },
        data: { token: null }
    });
}

const cambioContrasennaService = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params;
    const { contrasenna } = req.body;

    const usuario = await prisma.usuario.findFirst({
        where: { token }
    });

    if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
    }

    const hashContrasenna = await hashearPassword(contrasenna);
    await prisma.usuario.update({
        where: { id: usuario.id },
        data: { contrasenna: hashContrasenna }
    });

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
    cambioContrasennaService
};