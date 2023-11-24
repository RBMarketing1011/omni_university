const asyncHandler = require('express-async-handler')
const User = require('../db/models/users')
const genToken = require('../utils/genToken')
const { v4: uuid } = require('uuid')

// POST - Register User
//Public
// /api/users/register
module.exports.userRegister = asyncHandler(async (req, res) =>
{
	const _id = uuid()
	const { firstName, lastName, email, password, role } = req.body
	const user = await User.findOne({ email })
	const lastLogin = new Date()

	try {
		const newUser = await User.create({ _id, name: { firstName: firstName, lastName: lastName }, email, password, role, lastLogin })
		genToken(res, newUser._id)
		res.send({
			'action': 'Created User',
			'_id': _id,
			'name': { firstName, lastName },
			'email': email,
			'password': password,
			'role': role,
			'lastLogin': lastLogin
		})
	} catch (err) {
		res.status(400).json(err.code)
	}
})

//POST - Login User
//Public
// /api/users/login
module.exports.userLogin = asyncHandler(async (req, res) =>
{
	const { email, password } = req.body
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
