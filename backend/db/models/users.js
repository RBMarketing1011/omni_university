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
    // validate: {
    //   validator: (v) =>
    //   {
    //     // return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(v)
    //     if (
    //       !v.includes(' ') &&
    //       v.includes(Number) &&
    //       v.includes()
    //     )
    //     {
    //       return true
    //     } else
    //     {
    //       return false
    //     }
    //   },
    // },
    required: [ true, 'Please Enter A Valid Password' ],
  },
  role: {
    type: String,
    required: true,
  },
  omniUProgress: {
    coursesComplete: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Courses'
      }
    ],
    videosComplete: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Videos'
      }
    ]
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
  if (this.email)
  {
    this.email = this.email.toLowerCase()
  }

  if (!this.isModified('password'))
  {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

module.exports = mongoose.model('Users', users)
