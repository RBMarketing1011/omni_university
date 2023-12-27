const User = require('../db/models/users')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const isLoggedIn = asyncHandler(async (req, res, next) =>
{
  let token
  token = req.cookies.jwtToken

  if (token)
  {
    try
    {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.userId).select('-password')

      next()
    } catch (err)
    {
      res.status(401)
      throw new Error('Not Authorized, Need Permissions')
    }
  } else
  {
    res.status(401)
    throw new Error('Not Authorized, Please Log In')
  }
})

const isAdmin = asyncHandler(async (req, res, next) =>
{
  let token
  token = req.cookies.jwtToken

  if (token)
  {
    try
    {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.userId).select('-password')

      if (user.role === 'admin' || user.role === 'manager')
      {
        next()
      } else
      {
        res.status(401)
        throw new Error('Not Authorized')
      }
    } catch (err)
    {
      res.status(401)
      throw new Error('Not Authorized')
    }
  } else
  {
    res.status(401)
    throw new Error('Not Authorized, Please Log In')
  }
})

module.exports = { isLoggedIn, isAdmin }