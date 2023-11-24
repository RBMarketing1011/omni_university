const asyncHandler = require('express-async-handler')
const User = require('../db/models/users')

// POST - Register User
//Public
// /api/users/register
module.exports.userRegister = asyncHandler(async (req, res) =>
{
	// try {
	//   const { firstName, lastName, email, username, password } = req.body;
	//   const roles = 'customer';
	//   const displayName = `${firstName} ${lastName}`;
	//   const user = new User({
	//     displayName,
	//     firstName,
	//     lastName,
	//     email,
	//     username,
	//     roles,
	//   });
	//   const registeredUser = await User.register(user, password);
	//   req.login(registeredUser, (err) => {
	//     if (err) return next(err);
	//     req.flash('success', 'Welcome To Omni Coffee & Eggs!');
	//     res.redirect('/');
	//   });
	// } catch (err) {
	//   req.flash('error', err.message);
	//   res.redirect('/register');
	// }

	res.send('Register User')
})

//POST - Login User
//Public
// /api/users/login
module.exports.userLogin = asyncHandler(async (req, res) =>
{
	// const { firstName } = req.body;
	// req.flash('success', `Welcome Back ${firstName}`);
	// const redirectUrl = res.locals.returnTo || '/';
	// delete res.locals.returnTo;
	// res.redirect(redirectUrl);

	res.send('User Logged In')
})

//POST - Logout User
//Public
// /api/users/logout
module.exports.userLogout = (req, res, next) =>
{
	// req.logout(function (err) {
	//   if (err) {
	//     return next(err);
	//   }
	//   req.flash('success', 'Goodbye!');
	//   res.redirect('/');
	// });

	res.send('User Logged Out')
}

//GET - Get User Data
//Private
// /api/users/:id
module.exports.getUser = asyncHandler(async (req, res) =>
{
	// const { id } = req.params
	// const getUserData = await Users.findOne({ _id: id })

	// getUserData ? res.status(200).json('User Found') : res.status(404).json('No User Found')

	res.send('Get User Data')
})

//PUT - Update User Data
//Private
// /api/users/:id
module.exports.updateUser = asyncHandler(async (req, res) =>
{
	// const { id } = req.params;
	// const { street, city, state, zipCode, user } = req.body;
	// const updateUser = await User.findByIdAndUpdate(id, {
	//   ...user,
	//   address: { street, city, state, zipCode },
	// });

	// if (!updateUser) {
	//   req.flash('error', 'User Not Found');
	//   return res.redirect(req.get('referer'));
	// }
	// req.flash('success', 'User Updated Successfully');
	// res.redirect(req.get('referer'));

	res.send('Updated User')
})

//Delete - Delete User Data
//Private
// /api/users/:id
module.exports.deleteUser = asyncHandler(async (req, res) =>
{
	// const { id } = req.params;
	// const deleteUser = await User.findByIdAndDelete(id);
	// req.flash('success', 'You Successfully Deleted This User');
	// res.redirect('/admin/dashboard');

	res.send('Deleted User')
})
