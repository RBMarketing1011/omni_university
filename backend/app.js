//Dependencies
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')

//Database
const connectDB = require('./db/connection/connection')

//Config
dotenv.config()
const path = require('path')
const app = express()

//Router
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const videoRoutes = require('./routes/videoRoutes')

//App Setup
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'assets')))

// SESSION CONFIG SETTINGS
app.use(
  session({
    name: '_omniUSession',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
)

app.get('/', (req, res) =>
{
  res.send('Hello')
})

//User Routes
app.use('/api/users', userRoutes)
//Course Routes
app.use('/api/courses', courseRoutes)
//Video Routes
app.use('/api/courses/:id/videos', videoRoutes)

//Connect Database
connectDB()

//Server Start
app.listen(process.env.PORT, () =>
{
  console.log(`Server running on port ${ process.env.PORT }`)
})
