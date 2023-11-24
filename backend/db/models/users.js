const mongoose = require('mongoose')
const { Schema } = mongoose
const db = require('../connection/connection')

const users = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
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
  lastLogin: {
    type: Date,
    required: true,
  },
},
  {
    timestamps: true
  }
)

users.pre('save', function (next)
{
  if (this.email) {
    this.email = this.email.toLowerCase()
  }

  if (this.name) {
    this.name.firstName = this.name.firstName.toLowerCase()
    this.name.lastName = this.name.lastName.toLowerCase()
  }
  next()
})

module.exports = mongoose.model('Users', users)
