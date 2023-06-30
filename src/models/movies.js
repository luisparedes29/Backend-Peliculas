const mongoose = require('mongoose')
const Schema = mongoose.Schema

const peliculaSchema = new Schema({
  genero: { type: String, required: true },
  titulo: { type: String, required: true },
  imagen: { type: String, required: true },
  sinopsis: { type: String, required: true },
  fechaPublicacion: { type: Date, required: true },
  actoresPrincipales: { type: String },
  directores: { type: String },
  franquicia: { type: String },
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
})

const Pelicula = mongoose.model('Pelicula', peliculaSchema)

module.exports = Pelicula
