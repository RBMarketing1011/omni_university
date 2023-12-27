const Jwt = require('jsonwebtoken')

const genToken = (res, userId) =>
{
	const token = Jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: '30d'
	})

	cookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 30 * 24 * 60 * 60 * 1000
	}

	res.cookie('jwtToken', token, cookieOptions)
}

module.exports = genToken