const asyncHandler = require('express-async-handler')
const User = require('../db/models/users')
const genToken = require('../utils/genToken')

// POST - Register User
// Public
// /api/users/register
module.exports.userRegister = asyncHandler(async (req, res) =>
{
	const { firstName, lastName, email, password, role } = req.body
	const userExists = await User.findOne({ email })

	if (userExists)
	{
		res.status(400)
		throw new Error('User Already Exists')
	}

	const newUser = await User.create({ name: { firstName, lastName }, email, password, role })

	if (newUser)
	{
		genToken(res, newUser._id)

		res.status(201).json(user)
	} else
	{
		res.status(400)
		throw new Error('Invalid User Data')
	}
})

//POST - Login User
//Public
// /api/users/login
module.exports.userLogin = asyncHandler(async (req, res) =>
{
	const { email, password } = req.body
	console.log(email + '   ' + password)
	const lowerCaseEmail = email.toLowerCase()

	const user = await User.findOne({ email: lowerCaseEmail })

	//See if user found with valid password
	if (user && (await user.matchPassword(password)))
	{
		const token = genToken(res, user._id)
		res.status(200).json(user)
	} else
	{
		//Invalid Info
		res.status(401)
		throw new Error('Invalid Email or Password')
	}
})

//POST - Logout User
//Public
// /api/users/logout
module.exports.userLogout = (req, res) =>
{
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	})
	res.status(200).json({ message: 'Logged out successfully' })
}

//GET - Get User Data
//Private
// /api/users/:id
module.exports.getUser = asyncHandler(async (req, res) =>
{
	try
	{
		const { id } = req.params
		const user = await User.findById(id)
		res.status(200).json(user) //Format Properly
	} catch (error)
	{
		res.status(400) //Handle Errors Properly
		throw new Error('User Not Found')
	}
})

//GET - Get All User Data
//Private
// /api/users/all
module.exports.getAllUsers = asyncHandler(async (req, res) =>
{
	try
	{
		const allUsers = await User.find({})
		res.status(200).json({ allUsers }) //Format Properly
	} catch (err)
	{
		res.status(400)
		throw new Error('No Users Exist')
	}
})

//PUT - Update User Data
//Private
// /api/users/:id
module.exports.updateUser = asyncHandler(async (req, res) =>
{
	try
	{
		const { firstName, lastName, email, password, role } = req.body
		const { id } = req.params
		await User.findByIdAndUpdate(id, { name: { firstName, lastName }, email, password, role })
		const updateUser = await User.findById(id)
		res.status(200).json(updateUser)
	} catch (err)
	{
		res.send(err.message)
	}
})

//Delete - Delete User Data
//Private
// /api/users/:id
module.exports.deleteUser = asyncHandler(async (req, res) =>
{
	try
	{
		const { id } = req.params
		const deleteUser = await User.findByIdAndDelete(id)
		res.send('User Deleted')
	} catch (err)
	{
		res.status().send(err.message)
	}
})
