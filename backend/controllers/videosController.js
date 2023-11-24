const asyncHandler = require('express-async-handler')
const Videos = require('../db/models/videos')

// POST - Create Video
//Private - Only Admins
// /api/courses/:id/videos/create
module.exports.createVideo = asyncHandler(async (req, res) =>
{
	res.send('Created Video')
})

//GET - Get Video
//Private - User
// /api/courses/:id/videos/:id
module.exports.getVideo = asyncHandler(async (req, res) =>
{
	res.send('Get Video')
})

//PUT - Update Video
//Private - Admins
// /api/courses/:id/videos/:id
module.exports.updateVideo = asyncHandler(async (req, res) =>
{
	res.send('Updated Video')
})

//Delete - Delete Video
//Private - Admins
// /api/courses/:id/videos/:id
module.exports.deleteVideo = asyncHandler(async (req, res) =>
{
	res.send('Deleted Video')
})