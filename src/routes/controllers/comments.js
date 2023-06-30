const Pelicula = require('../../models/movies')
const Comentario = require('../../models/comments')

// Controlador para agregar un nuevo comentario a una película
const agregarComentario = async (req, res) => {
  try {
    // Obtener el ID de la película y el contenido del comentario desde el cuerpo de la solicitud
    const { usuarioId, peliculaId, contenido } = req.body

    // Verificar si la película existe en la base de datos
    const pelicula = await Pelicula.findById(peliculaId)
    if (!pelicula) {
      return res.status(404).json({ error: 'La película no existe' })
    }

    // Crear una nueva instancia del modelo Comentario con los datos recibidos
    const nuevoComentario = await Comentario.create({
      usuario: usuarioId, // Suponiendo que tienes el ID del usuario actual disponible en req.usuarioId
      contenido,
    })

    // Agregar el comentario al arreglo de comentarios de la película
    pelicula.comentarios.push(nuevoComentario._id)
    await pelicula.save()

    res.status(201).json({ comentario: nuevoComentario })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//funcion para editar comentario
const editarComentario = async (req, res) => {
  try {
    // Obtener el ID del comentario y el nuevo contenido desde el cuerpo de la solicitud
    const { usuarioId, nuevoContenido } = req.body
    const comentarioId = req.params.id

    // Verificar si el comentario existe en la base de datos
    const comentario = await Comentario.findById(comentarioId)
    if (!comentario) {
      return res.status(404).json({ error: 'El comentario no existe' })
    }

    // Verificar si el comentario pertenece al usuario actual
    if (comentario.usuario.toString() !== usuarioId) {
      return res
        .status(403)
        .json({ error: 'No tienes permisos para editar este comentario' })
    }

    // Actualizar el contenido del comentario
    comentario.contenido = nuevoContenido
    const comentarioActualizado = await comentario.save()

    res.status(200).json({ comentario: comentarioActualizado })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//eliminar comentario tanto de la coleccion como de las peliculas
const eliminarComentario = async (req, res) => {
  try {
    const { peliculaId } = req.body
    const comentarioId = req.params.id
    // Verificar si el comentario existe en la base de datos y eliminamos
    const comentario = await Comentario.findByIdAndDelete(comentarioId)
    if (!comentario) {
      return res.status(404).json({ error: 'El comentario no existe' })
    }
    // eliminamos el comentario de la coleccion de la pelicula
    const peliculaActualizada = await Pelicula.findByIdAndUpdate(
      peliculaId,
      {
        $pull: { comentarios: comentarioId },
      },
      { new: true }
    )

    res.status(200).json({ pelicula: peliculaActualizada })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  agregarComentario,
  editarComentario,
  eliminarComentario,
}
