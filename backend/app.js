//Dependencies
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')

//MIDDLEWARE
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

//Database Connection
const connectDB = require('./db/connection/connection')

//Connect Database
connectDB()

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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}))

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

if (process.env.NODE_ENV === 'production')
{
  const __dirname = path.resolve()
  console.log(__dirname)
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')))

  app.get('*', (req, res) =>
  {
    res.redirect('/')
  })
} else
{
  //URL Mapping
  app.get('/', (req, res) =>
  {
    res.send('Server Is Ready')
  })
}

//User Routes
app.use('/api/users', userRoutes)
//Course Routes
app.use('/api/courses', courseRoutes)
//Video Routes
app.use('/api/courses', videoRoutes)

// MIDDLEWARE SETUP
app.all('*', (req, res, next) =>
{
  next(new expressErr('Page Not Found', 404))
})

//Error Handling
app.use(notFound)
app.use(errorHandler)

//Server Start
app.listen(process.env.PORT, () =>
{
  console.log(`Server running on port ${ process.env.PORT }`)
})
