const mongoose = require('mongoose')
const Schema = mongoose.Schema

const peliculaSchema = new Schema({
  genero: { type: String, required: true },
  titulo: { type: String, required: true },
  //Quite el required de aqui de manera provisional para probar la carga de imagenes rapidamente, creo que hay que implementar una logica para eso, porque aun cuando cargaba la imagen, lo interprretaba como string vacio
  imagen: { type: String },
  sinopsis: { type: String, required: true },
  fechaPublicacion: { type: Date, required: true },
  actoresPrincipales: { type: String },
  directores: { type: String },
  franquicia: { type: String },
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
})

const Pelicula = mongoose.model('Pelicula', peliculaSchema)

module.exports = Pelicula
