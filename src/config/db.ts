import { PrismaClient } from "@prisma/client"; 

export async function TestDbConnection() {
    try {
        await prisma.$connect();
        console.log('✅ Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const prisma = new PrismaClient();
