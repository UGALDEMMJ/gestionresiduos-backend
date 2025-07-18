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
        subject: "Verifica tu cuenta",
        text: `Por favor verifica tu cuenta usando el link: http://localhost:3000/api/usuario/verificar/${token}`,
    };

    try {
        await mailService.send(msg);
    } catch (error) {
        console.error("Error al enviar el email:", error);
        throw new Error("Error al enviar el email");
    }
};