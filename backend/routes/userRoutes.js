const express = require('express')
const router = express.Router()

const {
	userRegister,
	userLogin,
	userLogout,
	getUser,
	updateUser,
	deleteUser,
} = require('../controllers/usersController')

router.route('/register')
	.post(userRegister)

router.route('/login')
	.post(userLogin)

router.route('/logout')
	.post(userLogout)

router.route('/:id')
	.get(getUser)
	.put(updateUser)
	.delete(deleteUser)

module.exports = router