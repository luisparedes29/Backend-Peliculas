const Pelicula = require('../../models/movies')
const Comentario = require('../../models/comments')
const mongoose = require('mongoose')

//controlador para obtener todos los comentarios

const getAllComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find()
    res.json(comentarios)
  } catch (error) {
    res.json(error)
  }
}

// Controlador para agregar un nuevo comentario a una película
const agregarComentario = async (req, res) => {
  try {
    // Obtener el ID de la película y el contenido del comentario desde el cuerpo de la solicitud
    const { usuarioId, contenido } = req.body
    const peliculaId = req.params.id

    // Verificar si el peliculaId es un valor válido
    if (!peliculaId || !mongoose.isValidObjectId(peliculaId)) {
      return res
        .status(400)
        .json({ error: 'ID de película inválido o no ha sido enviado' })
    }

    // Verificar si la película existe en la base de datos
    const pelicula = await Pelicula.findById(peliculaId)
    if (!pelicula) {
      return res.status(404).json({ error: 'La película no existe' })
    }

    // Verificar si el usuarioId es un valor válido
    if (!usuarioId || !mongoose.isValidObjectId(usuarioId)) {
      return res
        .status(400)
        .json({ error: 'ID de usuario inválido o no ha sido enviado' })
    }

    // Verificar si los datos de entrada son válidos
    if (!contenido) {
      return res.status(400).json({ error: 'Faltan datos de entrada' })
    }

    // Crear una nueva instancia del modelo Comentario con los datos recibidos
    const nuevoComentario = await Comentario.create({
      usuario: usuarioId, // Suponiendo que tienes el ID del usuario actual disponible en req.usuarioId
      contenido,
      idPelicula: peliculaId,
    })

    // Agregar el comentario al arreglo de comentarios de la película
    pelicula.comentarios.push(nuevoComentario._id)
    await pelicula.save()
    
    const newComment = await Comentario.findById(nuevoComentario._id, { __v: 0})
      .populate({ path: 'usuario', select: 'usuario'})

    res.status(201).json({ newComment })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//funcion para editar comentario
const editarComentario = async (req, res) => {
  try {
    // Obtener el ID del comentario y el nuevo contenido desde el cuerpo de la solicitud
    const { usuarioId, nuevoContenido, esAdmin } = req.body
    const comentarioId = req.params.id

    // Verificar si el comentarioId es un valor válido
    if (!comentarioId || !mongoose.isValidObjectId(comentarioId)) {
      return res.status(400).json({ error: 'ID de comentario inválido' })
    }

    // Verificar si el comentario existe en la base de datos
    const comentario = await Comentario.findById(comentarioId)
    if (!comentario) {
      return res.status(404).json({ error: 'El comentario no existe' })
    }

    // Verificar si el comentario pertenece al usuario actual o si es un administrador
    if (comentario.usuario.toString() !== usuarioId && !esAdmin) {
      return res
        .status(403)
        .json({ error: 'No tienes permisos para editar este comentario' })
    }

    // Verificar si los datos de entrada son válidos
    if (!nuevoContenido) {
      return res
        .status(400)
        .json({ error: 'Falta el contenido del comentario' })
    }

    // Actualizar el contenido del comentario
    comentario.contenido = nuevoContenido
    const comentarioActualizado = await comentario.save()

    // Actualizar el contenido del comentario en la película asociada
    const pelicula = await Pelicula.findOne({ comentarios: comentarioId })
    if (pelicula) {
      const comentarioIndex = pelicula.comentarios.findIndex(
        (id) => id.toString() === comentarioId
      )
      if (comentarioIndex !== -1) {
        pelicula.comentarios[comentarioIndex].contenido = nuevoContenido
        await pelicula.save()
      }
    }

    res.status(200).json({ comentarioActualizado })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//eliminar comentario tanto de la coleccion como de las peliculas
const eliminarComentario = async (req, res) => {
  try {
    const { usuarioId, isAdmin } = req.body
    const comentarioId = req.params.id

    // Verificar si el comentarioId es un valor válido
    if (!comentarioId || !mongoose.isValidObjectId(comentarioId)) {
      return res.status(400).json({ error: 'ID de comentario inválido' })
    }

    // Verificar si el comentario existe en la base de datos y eliminarlo
    const comentario = await Comentario.findById(comentarioId)
    if (!comentario) {
      return res.status(404).json({ error: 'El comentario no existe' })
    }

    // Verificar si la películaId es un valor válido
    if (
      !comentario.idPelicula ||
      !mongoose.isValidObjectId(comentario.idPelicula)
    ) {
      return res.status(400).json({ error: 'ID de película inválido' })
    }

    // Verificar si el comentario pertenece al usuario actual
    if (!isAdmin && comentario.usuario.toString() !== usuarioId) {
      return res
        .status(403)
        .json({ error: 'No tienes permisos para eliminar este comentario' })
    }
    const comentarioEliminado = await Comentario.findByIdAndDelete(comentarioId)
    if (!comentarioEliminado) {
      return res
        .status(404)
        .json({ error: 'No se pudo eliminar el comentario' })
    }

    // Eliminar el comentario de la colección de la película
    const peliculaActualizada = await Pelicula.findByIdAndUpdate(
      comentario.idPelicula,
      {
        $pull: { comentarios: comentarioId },
      },
      { new: true }
    )

    // Verificar si la película fue encontrada y actualizada
    if (!peliculaActualizada) {
      return res
        .status(404)
        .json({ error: 'La película no existe o no pudo ser actualizada' })
    }

    res.status(200).json(comentarioId)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllComentarios,
  agregarComentario,
  editarComentario,
  eliminarComentario,
}
