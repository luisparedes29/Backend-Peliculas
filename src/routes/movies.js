var express = require('express')
var router = express.Router()
const upload = require('.././middleware/multer')
const validateToken = require('../routes/controllers/jwtAuth')

const {
  getMovieById,
  createMovie,
  getAllMovies,
  deleteMovie,
  updateMovie,
  getLatestMovies,
  searchMovies
} = require('./controllers/movies')

/* GET home page. */
router
  .get('/', getAllMovies)
  .get('/:id', getMovieById)
  .post('/create', validateToken, upload.single('image'), createMovie)
  .delete('/delete/:id', validateToken, deleteMovie)
  .put('/update/:id', validateToken, upload.single('image'), updateMovie)
  .get('/filter/latestMovies', getLatestMovies)
  .post('/filter/search', searchMovies)

module.exports = router
