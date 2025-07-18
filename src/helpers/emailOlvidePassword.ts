import { MailService } from "@sendgrid/mail";

const mailService = new MailService();
if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY environment variable is not defined");
}
mailService.setApiKey(process.env.SENDGRID_API_KEY as string);

export const enviarEmailRegistro = async (email: string, token: string) => {
    const msg = {
        to: email,
        from: "ugaldemoralesmj@gmail.com",
        subject: "Cambio de contraseña",
        text: `Por favor, utiliza el siguiente enlace para restablecer tu contraseña: http://localhost:3000/api/recuperar-contrasena/${token}`,
    };

    try {
        await mailService.send(msg);
    } catch (error) {
        console.error("Error al enviar el email:", error);
        throw new Error("Error al enviar el email");
    }
};