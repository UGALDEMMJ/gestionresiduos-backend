import express from 'express';
import { TestDbConnection } from './config/db';
import usuarioRoutes from './routes/usuarioRoutes'
import transporteRoutes from './routes/transporteRoutes'
import residuoRoutes from './routes/transporteRoutes'
import generadorRoutes from './routes/transporteRoutes'


const app = express();
app.use(express.json());

TestDbConnection();

app.use("/api/usuario", usuarioRoutes)
app.use("/api/generador", transporteRoutes)
app.use("/api/transporte", residuoRoutes)
app.use("/api/residuo", generadorRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});