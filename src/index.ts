import express from 'express';
import { TestDbConnection } from './config/db';
import usuarioRoutes from './routes/usuarioRoutes'
import transporteRoutes from './routes/transporteRoutes'
import residuoRoutes from './routes/residuoRoutes'
import generadorRoutes from './routes/generadorRoutes'
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true
}))

TestDbConnection();

app.use("/api/usuario", usuarioRoutes)
app.use("/api/generador", generadorRoutes)
app.use("/api/transporte", transporteRoutes)
app.use("/api/residuo", residuoRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});