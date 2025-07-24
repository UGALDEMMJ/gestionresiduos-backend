# Backend - Proyecto CRUD Residuos

Este es el backend del proyecto CRUD Residuos, diseñado para gestionar datos relacionados con generadores, transportes y residuos. Proporciona una API RESTful para realizar operaciones CRUD y manejar la lógica de negocio.

## Características principales

- **Gestión de usuarios**: Registro, autenticación y manejo de usuarios.
- **Gestión de residuos**: CRUD para residuos con soporte para imágenes.
- **Gestión de generadores y transportes**: CRUD para entidades relacionadas con los residuos.
- **Conexión a base de datos**: Uso de Prisma como ORM.
- **CORS habilitado**: Configuración para permitir solicitudes desde el frontend.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para el backend.
- **Express**: Framework para construir la API REST.
- **Prisma**: ORM para manejar la base de datos.
- **Supabase**: Almacenamiento de imágenes y autenticación.
- **TypeScript**: Tipado estático para un desarrollo más robusto.

## Estructura del proyecto

```
backend/
├── src/
│   ├── config/          # Configuración de la base de datos
│   ├── controllers/     # Controladores para manejar la lógica de negocio
│   ├── helpers/         # Funciones auxiliares
│   ├── middleware/      # Middleware para autenticación
│   ├── routes/          # Definición de rutas
│   ├── Types/           # Definición de tipos
│   └── index.ts         # Punto de entrada del servidor
├── prisma/              # Esquema y migraciones de Prisma
├── package.json         # Dependencias y scripts del proyecto
└── tsconfig.json        # Configuración de TypeScript
```

## Instalación y configuración

### Requisitos previos

- Node.js
- npm o yarn
- Base de datos configurada (PostgreSQL recomendado)
- Supabase configurado

### Pasos para ejecutar el backend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/UGALDEMMJ/gestionresiduos-backend.git
   ```

2. Instala las dependencias:
   ```bash
   cd backend
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`:
   ```env
   DATABASE_URL=tu_url_de_base_de_datos
   SUPABASE_URL=tu_url_de_supabase
   SUPABASE_KEY=tu_clave_de_supabase
   ```

4. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Inicia el servidor:
   ```bash
   npm run dev
   ```

6. El servidor estará disponible en `http://localhost:3000`.

## Endpoints principales

### Usuarios
- `POST /api/usuario` - Crear un nuevo usuario
- `POST /api/usuario/login` - Iniciar sesión

### Generadores
- `GET /api/generador` - Obtener todos los generadores
- `POST /api/generador` - Crear un generador

### Transportes
- `GET /api/transporte` - Obtener todos los transportes
- `POST /api/transporte` - Crear un transporte

### Residuos
- `GET /api/residuo` - Obtener todos los residuos
- `POST /api/residuo` - Crear un residuo
- `PUT /api/residuo/:id` - Actualizar un residuo
- `DELETE /api/residuo/:id` - Eliminar un residuo

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los pasos a continuación:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección de errores:
   ```bash
   git checkout -b mi-nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Agrega mi nueva funcionalidad"
   ```
4. Sube tus cambios a tu fork:
   ```bash
   git push origin mi-nueva-funcionalidad
   ```
5. Abre un Pull Request en el repositorio original.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por usar y contribuir a este proyecto!
