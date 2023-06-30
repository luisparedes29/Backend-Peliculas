const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario
