const Pelicula = require('../../models/movies')
const upload = require('../../middleware/multer')
const cloudinary = require('../../utilities/cloudinary')
const mongoose = require('mongoose')

//Funcion para obtener todas las peliculas
const getAllMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1 // Página actual (por defecto: 1)
    const limit = parseInt(req.query.limit) || 15 // Límite de resultados por página (por defecto: 10)

    const skip = (page - 1) * limit // Calcular el número de documentos a saltar

    const moviesCount = await Pelicula.countDocuments() // Contar el número total de documentos

    const movies = await Pelicula.find()
      .populate({
        path: 'comentarios',
        select: '-__v',
        populate: {
          path: 'usuario',
          select: '-__v -contraseña -nombre',
        },
      })
      .select('-__v')
      .skip(skip)
      .limit(limit)

    const totalPages = Math.ceil(moviesCount / limit) // Calcular el número total de páginas

    res.json({
      movies,
      currentPage: page,
      totalPages,
      totalCount: moviesCount,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const getLatestMovies = async (req, res) => {
  try {
    const latestMovies = await Pelicula.find()
      .sort({ _id: -1 }) // Ordenar por _id en orden descendente
      .limit(5) // Limitar a las últimas 5 películas
      .select('-__v')
      .populate({
        path: 'comentarios',
        select: '-__v', // Excluir el campo __v de los comentarios
        populate: {
          path: 'usuario',
          model: 'Usuario',
          select: '-__v -contraseña -nombre',
        },
      })

    res.json({ latestMovies })
  } catch (error) {
    res.json(error)
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

    const movie = await Pelicula.findById(movieId)
      .select('-__v') // Excluir el campo __v de la película
      .populate({
        path: 'comentarios',
        select: '-__v', // Excluir el campo __v de los comentarios
        populate: {
          path: 'usuario',
          model: 'Usuario',
          select: '-__v -nombre -_id -contraseña', // Excluir el campo __v del usuario
        },
      })

    if (!movie) {
      return res.status(404).json({ error: 'La película no existe' })
    }

    res.json(movie)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const searchMovies = async (req, res) => {
  try {
    const { palabraClave } = req.body
    console.log(palabraClave)

    if (!palabraClave) {
      return res.status(400).json({ error: 'No se proporcionó una palabra clave' })
    }

    const movies = await Pelicula.find({
      $or: [
        { genero: { $regex: palabraClave, $options: 'i' } },
        { titulo: { $regex: palabraClave, $options: 'i' } },
        { sinopsis: { $regex: palabraClave, $options: 'i' } },
        { actoresPrincipales: { $regex: palabraClave, $options: 'i' } }
      ]
    })

    res.json(movies)
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
      ).populate('comentarios') // Agregar populate para obtener los comentarios
      res.json(updatedMovie)
    } else {
      // Si no se cargó una nueva imagen, actualizar solamente los campos enviados en req.body
      const updatedMovie = await Pelicula.findByIdAndUpdate(id, req.body, {
        new: true,
      }).populate('comentarios') // Agregar populate para obtener los comentarios
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
  getLatestMovies,
  searchMovies
}
