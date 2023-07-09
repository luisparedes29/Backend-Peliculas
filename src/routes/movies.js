var express = require('express')
var router = express.Router()
const upload = require('.././middleware/multer')
const validateToken = require('../routes/controllers/jwtAuth')

const {
  getMovieById,
  createMovie,
  getAllMovies,
  deleteMovie,
  updateMovie,
  getLatestMovies,
  searchMovies
} = require('./controllers/movies')


/**
 * @openapi
 * components:
 *   securitySchemes: 
 *      bearerAuth: 
 *           type: http 
 *           scheme: bearer
 *           bearerFormat: JWT
 *   schemas:
 *     Pelicula:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         genero: 
 *           type: string
 *           example: Suspenso
 *         titulo:
 *           type: string
 *           example: Inception
 *         imagen:
 *           type: string
 *           format: uri
 *           example: https://res.cloudinary.com/dhdm4ter5/image/upload/v1688597656/qqhozpsdiagjuspdo1cd.jpg
 *         sinopsis:
 *           type: string       
 *           example: Este es el ejemplo de una sinopsis
 *         fechaPublicacion:
 *           type: date
 *           example: 2022-04-20
*         acioresPrincipales:
 *           type: string
 *           example: Leonardo DiCaprio
 *         directores:
 *           type: string
 *           example: Joss Whedon
 *         franquicia:
 *           type: string
 *           example: 20th Century Fox
 *         comentarios:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *               usuario:
 *                 type: string
 *                 example: John Doe
 *               contenido:
 *                 type: string
 *                 example: Me encantó esta película
 *           example:
 *             - id: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *               usuario: John Doe
 *               contenido: Me encantó esta película
 *             - id: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *               usuario: Stinky1
 *               contenido: Excelente actuación de los protagonistas
 */




/**
 * @openapi
 * /movies:
 *   get:
 *     tags:
 *       - Get Movies
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: '#/components/schemas/Pelicula'
 *       500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Ocurrió un error al buscar las películas en la base de datos" 
 * 
 * /movies/{id}:
 *   get:
 *     tags:
 *       - Get Movies
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la película
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/Pelicula'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: NOT_FOUND
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "La película no existe"
 *       500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Ocurrió un error al buscar la película en la base de datos" 
 * 
 * 
 * /movies/create:
 *   post:
 *     tags:
 *       - Create Movies
 *     security:
 *       - bearerAuth: [token]
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               genero:
 *                 type: string
 *                 description: Género de la película
 *               titulo:
 *                 type: string
 *                 description: Título de la película
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen de la película
 *               sinopsis:
 *                 type: string
 *                 description: Sinopsis de la película
 *               fechaPublicacion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de publicación de la película (YYYY-MM-DD)
 *               actoresPrincipales:
 *                 type: string
 *                 items:
 *                   type: string
 *                 description: Actores principales de la película
 *               directores:
 *                 type: string
 *                 description: Directores de la película
 *               franquicia:
 *                 type: string
 *                 description: Franquicia de la película
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Faltan datos requeridos para crear la película"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token de autenticación no válido"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear la película"
 */






router
  .get('/', getAllMovies)
  .get('/:id', getMovieById)
  .post('/create', validateToken, upload.single('image'), createMovie)
  .delete('/delete/:id', validateToken, deleteMovie)
  .put('/update/:id', validateToken, upload.single('image'), updateMovie)
  .get('/filter/latestMovies', getLatestMovies)
  .post('/filter/search', searchMovies)

module.exports = router
