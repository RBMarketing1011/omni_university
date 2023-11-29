// Middleware Set Up For Logged In, Employee, Lead, Manager, Admin, Owner

//Employee
module.exports.isEmployee = async (req, res, next) =>
{

	if (
		!req.user.role.includes('employee') ||
		!req.user.role.includes('lead') ||
		!req.user.role.includes('manager') ||
		!req.user.role.includes('admin') ||
		!req.user.role.includes('owner')) {
		res.send('Must Be An Employee')
		return res.redirect('/login')
	}
	next()
}

//Lead
module.exports.isLead = async (req, res, next) =>
{

	if (
		!req.user.role.includes('lead') ||
		!req.user.role.includes('manager') ||
		!req.user.role.includes('admin') ||
		!req.user.role.includes('owner')) {
		res.send('You Are Not Authorized')
		return res.redirect('/login')
	}
	next()
}

//Manager
module.exports.isManager = async (req, res, next) =>
{

	if (
		!req.user.role.includes('manager') ||
		!req.user.role.includes('admin') ||
		!req.user.role.includes('owner')) {
		res.send('You Are Not Authorized')
		return res.redirect('/login')
	}
	next()
}

//Admin
module.exports.isAdmin = async (req, res, next) =>
{

	if (
		!req.user.role.includes('admin') ||
		!req.user.role.includes('owner')) {
		res.send('You Are Not Authorized')
		return res.redirect('/login')
	}
	next()
}

//Owner
module.exports.isOwner = async (req, res, next) =>
{
	if (!req.user.role.includes('owner')) {
		res.send('You Are Not Authorized')
		return res.redirect('/login')
	}
	next()
}

module.exports.isLoggedIn = (req, res, next) =>
{
	if (!req.user) {
		res.send('You Must Be Logged In')
		return res.redirect('/login')
	}
	next()
}