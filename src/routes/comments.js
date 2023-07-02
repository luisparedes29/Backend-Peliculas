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

module.exports = router
