var express = require('express')
var router = express.Router()
const upload = require('.././middleware/multer')

const {
  getMovieById,
  createMovie,
  getAllMovies,
  deleteMovie,
  updateMovie,
  getLatestMovies,
} = require('./controllers/movies')

/* GET home page. */
router
  .get('/', getAllMovies)
  .get('/:id', getMovieById)
  .post('/create', upload.single('image'), createMovie)
  .delete('/delete/:id', deleteMovie)
  .put('/update/:id', upload.single('image'), updateMovie)
  .get('/filter/latestMovies', getLatestMovies)

module.exports = router
