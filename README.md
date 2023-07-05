# Backend del Sistema de SPA de Películas

Este repositorio contiene el código del backend para un sistema de SPA (Single Page Application) de películas, desarrollado utilizando Node.js y Express. El sistema permite a los usuarios ver películas existentes, ver detalles de cada película, dejar reseñas y utilizar un buscador para filtrar películas. Además, cuenta con una sección administrativa que permite al administrador subir, eliminar y editar películas con autenticación JWT. También se incluye personalización con Dark Mode.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB (u otra base de datos)
- JWT para autenticación

## Estructura del proyecto

El proyecto tiene la siguiente estructura de directorios:

- `src/`
  - `bin/`: Contiene el archivo de inicio del servidor.
  - `middleware/`: Contiene los middlewares utilizados en el backend.
  - `models/`: Contiene los modelos de datos utilizados en el backend.
  - `routes/`: Contiene las definiciones de las rutas del servidor.
    - `controllers/`: Contiene los controladores para manejar las peticiones HTTP.
  - `utilities/`: Contiene utilidades y funciones auxiliares.
  - `app.js`: Archivo principal del servidor Express.
  - `conexionDB.js`: Archivo para la conexión a la base de datos.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega hasta el directorio del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:

```shell
npm install
```

4. Configura la conexión a la base de datos en el archivo `env`.
5. Ejecuta el siguiente comando para iniciar el servidor:

```shell
npm start
```

6. El backend del sistema de películas estará disponible en `http://localhost:3000`.

## API Endpoints

A continuación se detallan los endpoints disponibles en el backend del sistema de películas:

### Comentarios

- `GET /comments`: Obtiene todos los comentarios existentes.
- `POST /comments/new/:id`: Agrega un nuevo comentario a una película específica.
- `DELETE /comments/delete/:id`: Elimina un comentario específico.
- `PUT /comments/update/:id`: Edita un comentario específico.

### Películas

- `GET /movies`: Obtiene todas las películas existentes.
- `GET /movies/:id`: Obtiene los detalles de una película específica.
- `POST /movies/create`: Crea una nueva película.
- `DELETE /movies/delete/:id`: Elimina una película específica.
- `PUT /movies/update/:id`: Actualiza una película existente.
- `GET /movies/filter/latestMovies`: Obtiene las películas más recientes.

### Usuarios

- `POST /users/signup`: Registra un nuevo usuario.
- `POST /users/login`: Inicia sesión del usuario.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Crea un fork de este repositorio.
2. Crea una nueva rama para tu contribución.
3. Realiza los cambios y mejoras necesarias.
4. Envía un pull request explicando tus cambios.


