var express = require('express')
var router = express.Router()
const {
  getAllComentarios,
  agregarComentario,
  editarComentario,
  eliminarComentario,
} = require('./controllers/comments')

/* GET home page. */
router
  .get('/', getAllComentarios)
  .post('/new/:id', agregarComentario)
  .delete('/delete/:id', eliminarComentario)
  .put('/update/:id', editarComentario)

/**
 * @openapi
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 61dbae02c1474e28863cdb7bd402b2d6
 *         usuario:
 *           type: string
 *           description: ID del usuario que realiza el comentario
 *           example: 61dbae02c1474e28-863cdb7bd402b2d6
 *         contenido:
 *           type: string
 *           description: Contenido del comentario
 *           example: Me encantó esta película
 *         idPelicula:
 *           type: string
 *           description: ID de la película a la que pertenece el comentario
 *           example: 61dbae02c1474e28863cdb7bd402b2d6
 *
 */

/**
 * @openapi
 * /comments:
 *   get:
 *     tags:
 *       - Comentarios
 *     summary: Obtener todos los comentarios
 *     description: Obtiene una lista de todos los comentarios existentes.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al obtener los comentarios"
 */

/**
 * @openapi
 * /comments/new/{id}:
 *   post:
 *     tags:
 *       - Comentarios
 *     security:
 *       - bearerAuth: [token]
 *     summary: Agregar un nuevo comentario a una película
 *     description: Agrega un nuevo comentario a una película específica.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la película
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *                 description: ID del usuario que realiza el comentario
 *                 example: 61dbae02c1474e28863cdb7bd402b2d6
 *               contenido:
 *                 type: string
 *                 description: Contenido del comentario
 *                 example: este es un comentario
 *     responses:
 *       201:
 *         description: Comentario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nuevoComentario:
 *                   $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Datos de entrada inválidos o faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ID de película inválido o no ha sido enviado"
 *       404:
 *         description: Película no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "La película no existe"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al agregar el comentario"
 */

/**
 * @openapi
 * /comments/update/{id}:
 *   put:
 *     tags:
 *       - Comentarios
 *     security:
 *       - bearerAuth: [token]
 *     summary: Editar un comentario existente
 *     description: Edita el contenido de un comentario existente.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del comentario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *                 description: ID del usuario que realiza la edición del comentario
 *                 example: 61dbae02c1474e28863cdb7bd402b2d6
 *               nuevoContenido:
 *                 type: string
 *                 description: Nuevo contenido del comentario
 *                 example: Nuevo comentario
 *               isAdmin:
 *                 type: boolean
 *                 description: Indica si el usuario es un administrador
 *     responses:
 *       200:
 *         description: Comentario editado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comentarioActualizado:
 *                   $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Datos de entrada inválidos o faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ID de comentario inválido"
 *       403:
 *         description: Permiso denegado para editar el comentario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No tienes permisos para editar este comentario"
 *       404:
 *         description: Comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El comentario no existe"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al editar el comentario"
 */

/**
 * @openapi
 * /comments/delete/{id}:
 *   delete:
 *     tags:
 *       - Comentarios
 *     security:
 *       - bearerAuth: [token]
 *     summary: Eliminar un comentario existente
 *     description: Elimina un comentario existente según su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del comentario a eliminar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *                 description: ID del usuario que realiza la eliminación del comentario
 *                 example: 61dbae02c1474e28863cdb7bd402b2d6
 *               isAdmin:
 *                 type: boolean
 *                 description: Indica si el usuario es un administrador
 *                 example: true
 *     responses:
 *       200:
 *         description: Comentario eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comentarioId:
 *                   type: string
 *                   example: 61dbae02c1474e28863cdb7bd402b2d6
 *       400:
 *         description: Datos de entrada inválidos o faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ID de comentario inválido"
 *       403:
 *         description: Permiso denegado para eliminar el comentario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No tienes permisos para eliminar este comentario"
 *       404:
 *         description: Comentario no encontrado o no se pudo eliminar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El comentario no existe o no se pudo eliminar"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al eliminar el comentario"
 */

module.exports = router
