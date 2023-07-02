const express = require('express')
const { registerUser, loginUser } = require('../routes/controllers/users')
const router = express.Router()

// Ruta para registrar admin
router
  .post('/signup', registerUser)

  // Ruta para iniciar sesion
  .post('/login', loginUser)

module.exports = router
