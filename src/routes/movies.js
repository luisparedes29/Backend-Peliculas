var express = require('express')
var router = express.Router()
const {
  getMovieById,
  createMovie,
  getAllMovies,
  deleteMovie,
  updateMovie,
} = require('./controllers/movies')

/* GET home page. */
router
  .get('/', getAllMovies)
  .get('/:id', getMovieById)
  .post('/create', createMovie)
  .delete('/delete/:id', deleteMovie)
  .put('/update/:id', updateMovie)

module.exports = router
