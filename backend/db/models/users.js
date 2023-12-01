const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const users = new Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  omniUProgress: {
    coursesComplete: {
      type: [ String ],
    },
    videosComplete: {
      type: [ String ],
    }
  },
  completedOU: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true
  }
)

// Match user entered password to hashed password in database
users.methods.matchPassword = async function (enteredPassword)
{
  return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypt password using bcrypt
users.pre("save", async function (next)
{
  if (this.email) {
    this.email = this.email.toLowerCase()
  }

  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

module.exports = mongoose.model('Users', users)
