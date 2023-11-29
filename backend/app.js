//Dependencies
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')

//Database Schemas
const Users = require('./db/models/users')
// const Courses = require('./db/models/courses')
// const Videos = require('./db/models/videos')

//Database Connection
const connectDB = require('./db/connection/connection')

//Config
dotenv.config()
const path = require('path')
const app = express()

//Utilities
const expressErr = require('./utils/expressErr')

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

// Res.Locals SET UP
app.use((req, res, next) =>
{
  res.locals.currentUser = req.user
  next()
})


//URL Mapping
app.get('/', (req, res) =>
{
  res.send('Hello')
})

//User Routes
app.use('/api/users', userRoutes)
//Course Routes
app.use('/api/courses', courseRoutes)
//Video Routes
app.use('/api/courses', videoRoutes)

//Connect Database
connectDB()

// MIDDLEWARE SETUP
app.all('*', (req, res, next) =>
{
  next(new expressErr('Page Not Found', 404))
})

app.use((err, req, res, next) =>
{
  const { statusCode = 500 } = err
  if (!err.message) err.message = "Couldn't find the requested URL"
  res.status(statusCode).send(err)
})

//Server Start
app.listen(process.env.PORT, () =>
{
  console.log(`Server running on port ${ process.env.PORT }`)
})
