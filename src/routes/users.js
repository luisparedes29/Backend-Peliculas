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
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
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




// Ruta para registrar admin
router
  .post('/signup', registerUser)

  // Ruta para iniciar sesion
  .post('/login', loginUser)

module.exports = router
