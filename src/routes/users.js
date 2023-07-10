const express = require('express')
const { registerUser, loginUser } = require('../routes/controllers/users')
const router = express.Router()

/**
 * @openapi
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64a4b7ac379f99db833ab32b
 *         nombre:
 *           type: string
 *           example: Atilio García
 *         usuario:
 *           type: string
 *           example: atigar14
 *         contraseña:
 *           type: string
 *           example: password123
 *         isAdmin:
 *           type: boolean
 *           example: false
 */

/**
 * @openapi
 * /users/signup:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Registro de usuario
 *     description: Registra un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               usuario:
 *                 type: string
 *                 description: Nombre de usuario
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación generado
 *                 usuario:
 *                   type: string
 *                   description: Nombre de usuario registrado
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indica si el usuario es administrador
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El nombre, usuario y la contraseña son requeridos."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al intentar crear un nuevo usuario."
 *
 *
 * /users/login:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Iniciar sesión
 *     description: Inicia sesión con un usuario existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: Nombre de usuario
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación generado
 *                 usuario:
 *                   type: string
 *                   description: Nombre de usuario
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indica si el usuario es administrador
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El usuario y la contraseña son requeridos para iniciar sesión"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al intentar iniciar sesión."
 */



// Ruta para registrar admin
router
  .post('/signup', registerUser)

  // Ruta para iniciar sesion
  .post('/login', loginUser)

module.exports = router
