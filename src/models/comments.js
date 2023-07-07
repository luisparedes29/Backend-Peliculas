const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comentarioSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  contenido: { type: String, required: true },
  idPelicula: { type: Schema.Types.ObjectId, required: true },
})

const Comentario = mongoose.model('Comentario', comentarioSchema)

module.exports = Comentario
