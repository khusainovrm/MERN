const express = require('express')
const config = require('./config/default.json')
const mongoose = require('mongoose')

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.port || 5000

async function start() {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () =>
      console.log(`App has been started at the port ${PORT}...`)
    )
  } catch (error) {
    console.log(`Server Error ${error}`)
    process.exit(1)
  }
}

start()
