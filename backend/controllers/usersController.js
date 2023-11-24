const asyncHandler = require('express-async-handler')
const User = require('../db/models/users')

// POST - Register User
//Public
// /api/users/register
module.exports.userRegister = asyncHandler(async (req, res) =>
{
	res.send('Register User')
})

//POST - Login User
//Public
// /api/users/login
module.exports.userLogin = asyncHandler(async (req, res) =>
{
	res.send('User Logged In')
})

//POST - Logout User
//Public
// /api/users/logout
module.exports.userLogout = (req, res, next) =>
{
	res.send('User Logged Out')
}

//GET - Get User Data
//Private
// /api/users/:id
module.exports.getUser = asyncHandler(async (req, res) =>
{
	res.send('Get User Data')
})

//PUT - Update User Data
//Private
// /api/users/:id
module.exports.updateUser = asyncHandler(async (req, res) =>
{
	res.send('Updated User')
})

//Delete - Delete User Data
//Private
// /api/users/:id
module.exports.deleteUser = asyncHandler(async (req, res) =>
{
	res.send('Deleted User')
})
