const asyncHandler = require('express-async-handler')
const User = require('../db/models/users')
const genToken = require('../utils/genToken')
const bcrypt = require('bcrypt')

//Middleware Management
const {
	isLoggedIn,
	isEmployee,
	isLead,
	isManager,
	isAdmin,
	isOwner
} = require('../utils/middleware')

// POST - Register User
// Public
// /api/users/register
module.exports.userRegister = asyncHandler(async (req, res) =>
{
	const { firstName, lastName, email, password, role } = req.body

	//hash password and save in variable
	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(password, salt)

	try {
		const newUser = await User.create({ name: { firstName, lastName }, email, password: hashPassword, role })
		genToken(res, newUser._id)
		res.send({
			'action': 'Created User',
			'_id': newUser._id,
			'name': { firstName, lastName },
			'email': email,
			'password': hashPassword,
			'role': role
		})
	} catch (err) {
		res.send(err.message)
	}
})

//POST - Login User
//Public
// /api/users/login
module.exports.userLogin = asyncHandler(async (req, res) =>
{
	const { email, password } = req.body
	const user = await User.findOne({ email })

	//See if user found
	if (user) {
		const hashedPassword = user.password
		const passwordIsValid = await bcrypt.compare(password, hashedPassword)
		//validate password
		passwordIsValid ? res.status(200).send(user) : res.send('Invalid credentials')
	} else {
		//Invalid Info
		res.send('Invalid Credientials')
	}
})

//POST - Logout User
//Public
// /api/users/logout
module.exports.userLogout = (req, res, next) =>
{
	res.clearCookie('jwtToken')
	res.redirect('/')
}

//GET - Get User Data
//Private
// /api/users/:id
module.exports.getUser = asyncHandler(async (req, res) =>
{
	try {
		const { id } = req.params
		const user = await User.findById(id)
		res.send(user) //Format Properly
	} catch (error) {
		res.send(err.message) //Handle Errors Properly
	}
})

//GET - Get All User Data
//Private
// /api/users/all
module.exports.getAllUsers = asyncHandler(async (req, res) =>
{
	try {
		const allUsers = await User.find()
		res.send(allUsers) //Format Properly
	} catch (error) {
		res.send(err.message)
	}
})

//PUT - Update User Data
//Private
// /api/users/:id
module.exports.updateUser = asyncHandler(async (req, res) =>
{
	try {
		const { firstName, lastName, email, password, role } = req.body
		const { id } = req.params
		const updateUser = await User.findByIdAndUpdate(id, { name: { firstName, lastName }, email, password, role })
		res.status(200).send(updateUser)
	} catch (err) {
		res.send(err.message)
	}
})

//Delete - Delete User Data
//Private
// /api/users/:id
module.exports.deleteUser = asyncHandler(async (req, res) =>
{
	try {
		const { id } = req.params
		const deleteUser = await User.findByIdAndDelete(id)
		res.send('User Deleted')
	} catch (err) {
		res.status().send(err.message)
	}
})
