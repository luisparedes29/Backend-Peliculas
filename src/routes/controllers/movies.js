const Pelicula = require('../../models/movies')

//Funcion para obtener todas las peliculas
const getAllMovies = async (req, res) => {
  try {
    const movies = await Pelicula.find()
    res.json({ movies })
  } catch (error) {
    return error
  }
}
//Funcion para obtener una pelicula por su ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Pelicula.findById(req.params.id)
    res.json(movie)
  } catch (error) {
    res.json(error)
  }
}

//funcion para crear pelicula añadiendole el comentario
const createMovie = async (req, res) => {
  try {
    const movie = await Pelicula.create(req.body)
    res.json(movie)
  } catch (error) {
    res.json(error)
  }
}

//funcion para eliminar pelicula y los comentarios que tenga
const deleteMovie = async (req, res) => {
  try {
    const movie = await Pelicula.findByIdAndDelete(req.params.id)
    res.json(movie)
  } catch (error) {
    res.json(error)
  }
}

//funcion para editar pelicula
const updateMovie = async (req, res) => {
  try {
    const movie = await Pelicula.findByIdAndUpdate(req.params.id, req.body)
    res.json(movie)
  } catch (error) {
    res.json(error)
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
}
