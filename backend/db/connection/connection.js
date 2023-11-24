const mongoose = require('mongoose')
const db = mongoose.connection
const dotenv = require('dotenv')
dotenv.config()

// Connect Mongoose to MongoDB
const connectDB = () =>
{
  mongoose.connect(process.env.MONGO_URI)
  db.on('error', console.error.bind('connection error:'))
  db.once('open', () =>
  {
    console.log('Database Connected')
  })
}

module.exports = connectDB