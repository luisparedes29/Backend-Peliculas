const Pelicula = require('../../models/movies')
const upload = require('../../middleware/multer')
const cloudinary = require('../../utilities/cloudinary')

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
    const movie = await Pelicula.findById(req.params.id).populate('comentarios')
    res.json(movie)
  } catch (error) {
    res.json(error)
  }
}

//funcion para crear pelicula añadiendole el comentario
const createMovie = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;

    const movieData = {
      ...req.body,
      imagen: imageUrl
    };
    console.log(movieData);
    const movie = await Pelicula.create(movieData);
    res.json(movie);
  } catch (error) {
    res.json(error);
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
    // Verificar si se cargó una nueva imagen
    if (req.file) {
      // Cargar la nueva imagen usando Multer y Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = result.secure_url;

      // Actualizar la película con la nueva imagen
      const updatedMovieData = {
        ...req.body,
        imagen: imageUrl
      };

      // Actualizar la película en la base de datos
      const updatedMovie = await Pelicula.findByIdAndUpdate(req.params.id, updatedMovieData, { new: true });
      res.json(updatedMovie);
    } else {
      // Si no se cargó una nueva imagen, simplemente actualizar los otros campos de la película
      const updatedMovie = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedMovie);
    }
  } catch (error) {
    res.json(error);
  }
}


module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
}
