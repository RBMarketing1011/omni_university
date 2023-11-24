//Dependencies
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')

//Router
const userRoutes = require('./routes/userRoutes')

//Config
dotenv.config()
const path = require('path')
const app = express()

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

app.use('/api/users', userRoutes)

app.listen(process.env.PORT, () =>
{
  console.log(`Server running on port ${ process.env.PORT }`)
})
