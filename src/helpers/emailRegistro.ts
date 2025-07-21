import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);


export const enviarEmailRegistro = async (email: string, token: string) => {
    const urlVerificacion = `http://localhost:3000/api/usuario/verificar/${token}`;

    try {
        const { data, error } = await resend.emails.send({
            from: "ugaldemorales@ejemplo.com",
            to: email,
            subject: "Verifica tu cuenta",
            text: `Por favor verifica tu cuenta usando el link: ${urlVerificacion}`,
        });

        if (error) throw error;
        console.log('Correo enviado con Resend:', data?.id);
    } catch (error) {
        console.error("Error al enviar el email:", error);
        throw new Error("Error al enviar el email");
    }
};