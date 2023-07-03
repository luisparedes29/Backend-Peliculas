const Pelicula = require('../../models/movies')
const upload = require('../../middleware/multer')
const cloudinary = require('../../utilities/cloudinary')
const mongoose = require('mongoose')

//Funcion para obtener todas las peliculas
const getAllMovies = async (req, res) => {
  try {
    const movies = await Pelicula.find().populate('comentarios')
    res.json({ movies })
  } catch (error) {
    return error
  }
}
//Funcion para obtener una pelicula por su ID
const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id

    // Verificar si el ID de la película es válido
    if (!movieId || !mongoose.isValidObjectId(movieId)) {
      return res.status(400).json({ error: 'ID de película inválido' })
    }

    const movie = await Pelicula.findById(movieId).populate('comentarios')
    if (!movie) {
      return res.status(404).json({ error: 'La película no existe' })
    }

    res.json(movie)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//funcion para crear pelicula añadiendole el comentario
const createMovie = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'No se proporcionó ningún archivo de imagen' })
    }

    const result = await cloudinary.uploader.upload(req.file.path)
    if (!result || !result.secure_url) {
      return res.status(500).json({ error: 'Error al subir la imagen' })
    }

    const imageUrl = result.secure_url

    const movieData = {
      genero: req.body.genero,
      titulo: req.body.titulo,
      imagen: imageUrl,
      sinopsis: req.body.sinopsis,
      fechaPublicacion: req.body.fechaPublicacion,
      actoresPrincipales: req.body.actoresPrincipales,
      directores: req.body.directores,
      franquicia: req.body.franquicia,
      comentarios: [],
    }

    // Validar los campos requeridos
    if (
      !movieData.genero ||
      !movieData.titulo ||
      !movieData.sinopsis ||
      !movieData.fechaPublicacion
    ) {
      return res
        .status(400)
        .json({ error: 'Faltan datos requeridos para crear la película' })
    }

    const movie = await Pelicula.create(movieData)
    res.json(movie)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//funcion para eliminar pelicula y los comentarios que tenga
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params

    // Verificar si el ID de la película es un valor válido
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'ID de película inválido' })
    }

    // Verificar si la película existe en la base de datos
    const movie = await Pelicula.findById(id)
    if (!movie) {
      return res.status(404).json({ error: 'La película no existe' })
    }

    // Eliminar la película de la base de datos
    await Pelicula.findByIdAndDelete(id)

    res.json(movie)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//funcion para editar pelicula
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params

    // Verificar si el ID de la película es un valor válido
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'ID de película inválido' })
    }

    // Verificar si se cargó una nueva imagen
    if (req.file) {
      // Cargar la nueva imagen usando Multer y Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)
      const imageUrl = result.secure_url

      // Actualizar la película con la nueva imagen y los demás campos enviados en req.body
      const updatedMovieData = {
        ...req.body,
        imagen: imageUrl,
      }

      // Actualizar la película en la base de datos
      const updatedMovie = await Pelicula.findByIdAndUpdate(
        id,
        updatedMovieData,
        { new: true }
      )
      res.json(updatedMovie)
    } else {
      // Si no se cargó una nueva imagen, actualizar solamente los campos enviados en req.body
      const updatedMovie = await Pelicula.findByIdAndUpdate(id, req.body, {
        new: true,
      })
      res.json(updatedMovie)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
}
