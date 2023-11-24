const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const users = new Schema({
  _id: {
    type: String,
    required: true
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

users.pre('save', async function (next)
{
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('Users', users)
