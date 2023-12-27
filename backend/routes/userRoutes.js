const express = require('express')
const router = express.Router()

const {
	userRegister,
	userLogin,
	userLogout,
	getUser,
	getAllUsers,
	updateUser,
	updateUserVideos,
	updateUserCourses,
	deleteUser,
} = require('../controllers/usersController')

const { isLoggedIn, isAdmin } = require('../middleware/AuthMiddleware')

router.route('/all')
	.get(isLoggedIn, isAdmin, getAllUsers)

router.route('/register')
	.post(isLoggedIn, isAdmin, userRegister)

router.route('/login')
	.post(userLogin)

router.route('/logout')
	.post(isLoggedIn, userLogout)

router.route('/:id')
	.get(isLoggedIn, getUser)
	.patch(isLoggedIn, updateUser)
	.delete(isLoggedIn, deleteUser)

router.route('/:id/updateVideos')
	.patch(isLoggedIn, updateUserVideos)

router.route('/:id/updateCourses')
	.patch(isLoggedIn, updateUserCourses)

module.exports = router