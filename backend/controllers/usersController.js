const asyncHandler = require('express-async-handler')
const User = require('../db/models/users')
const Videos = require('../db/models/videos')
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
		const sendUser = await User.findById(newUser._id).select('-password')
		res.status(201).json(sendUser)
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
	const lowerCaseEmail = email.toLowerCase()

	const user = await User.findOne({ email: lowerCaseEmail })

	//See if user found with valid password
	if (user && (await user.matchPassword(password)))
	{
		genToken(res, user._id)
		const sendUser = await User.findById(user._id).select('-password')
		res.status(200).json(sendUser)
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
		const user = await User.findById(id).select('-password')
			.populate({ path: 'omniUProgress', populate: [ 'coursesComplete', 'videosComplete' ] })
		res.status(200).json(user)
	} catch (error)
	{
		res.status(400)
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
		const allUsers = await User.find({}).select('-password')
			.populate({ path: 'omniUProgress', populate: [ 'coursesComplete', 'videosComplete' ] })
		res.status(200).json({ allUsers }) //Format Properly
	} catch (err)
	{
		res.status(401)
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
		const { firstName, lastName, email, password, role, completedOU } = req.body
		const { id } = req.params
		const user = await User.findByIdAndUpdate(id,
			{
				name:
					{ firstName, lastName },
				email,
				password,
				role,
				completedOU: completedOU
			})

		const sendUser = await User.findById(user._id).select('-password')

		res.status(200).json(sendUser)

	} catch (err)
	{
		res.send(err.message)
	}
})

//PATCH - Update Courses Complete For User Data
//Private
// /api/users/:id/updateCourses
module.exports.updateUserCourses = asyncHandler(async (req, res) =>
{
	try
	{
		const { courseId } = req.body
		const { id } = req.params
		const user = await User.findById(id)
		user.omniUProgress.coursesComplete.push(courseId)
		await user.save()

		const sendUser = await User.findById(user._id).select('-password')

		res.status(200).json(sendUser)

	} catch (err)
	{
		res.json(err.message)
	}
})

//PATCH - Update Video Courses For User Data
//Private
// /api/users/:id/updateVideos
module.exports.updateUserVideos = asyncHandler(async (req, res) =>
{
	try
	{
		const { videoId } = req.body
		const { id } = req.params
		const user = await User.findById(id)
		user.omniUProgress.videosComplete.push(videoId)
		await user.save()

		const sendUser = await User.findById(user._id).select('-password')

		res.status(200).json(sendUser)

	} catch (err)
	{
		res.json(err.message)
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
		await User.findByIdAndDelete(id)
		res.status(200).json({ message: 'User Deleted' })
	} catch (err)
	{
		res.status(401).json(err.message)
	}
})
