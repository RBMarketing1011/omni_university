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
	deleteUser,
} = require('../controllers/usersController')

router.route('/all')
	.get(getAllUsers)

router.route('/register')
	.post(userRegister)

router.route('/login')
	.post(userLogin)

router.route('/logout')
	.post(userLogout)

router.route('/:id')
	.get(getUser)
	.patch(updateUser)
	.delete(deleteUser)

router.route('/:id/updateVideos')
	.patch(updateUserVideos)

module.exports = router