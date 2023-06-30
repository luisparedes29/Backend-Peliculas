const mongoose = require('mongoose')

const connectDB = async () => {
  mongoose
    .connect(
      // @ts-ignore
      process.env.URI,
      // @ts-ignore
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Conectado a Mongo'))
    .catch((err) => console.error(err))
}

module.exports = connectDB
