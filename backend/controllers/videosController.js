const asyncHandler = require('express-async-handler')
const Videos = require('../db/models/videos')
const Course = require('../db/models/courses')

// POST - Create Video
//Private - Only Admins
// /api/courses/:id/videos/create
module.exports.createVideo = asyncHandler(async (req, res) =>
{
	try
	{
		const { id } = req.params
		console.log(id)
		const course = await Course.findById(id)

		const {
			title,
			videoLink,
			q1, q1a1, q1a2, q1a3,
			q2, q2a1, q2a2, q2a3,
			q3, q3a1, q3a2, q3a3,
		} = req.body

		const newVideo = await Videos.create({
			title,
			videoLink,
			questions: {
				q1: {
					text: q1,
					answers: {
						a1: { text: q1a1 },
						a2: { text: q1a2 },
						a3: { text: q1a3 },
					}
				},
				q2: {
					text: q2,
					answers: {
						a1: { text: q2a1 },
						a2: { text: q2a2 },
						a3: { text: q2a3 },
					}
				},
				q3: {
					text: q3,
					answers: {
						a1: { text: q3a1 },
						a2: { text: q3a2 },
						a3: { text: q3a3 },
					}
				}
			},
			course
		})
		course.videos.push(newVideo)
		await course.save()
		await newVideo.save()
		res.status(200).json({ message: 'New Video Created' })
	} catch (err)
	{
		res.status(401).json(err.stack)
		console.log(err)
	}
})

//GET - Get Video
//Private - User
// /api/courses/:id/videos/:videoId
module.exports.getVideo = asyncHandler(async (req, res) =>
{
	try
	{
		const { videoId } = req.params
		const video = await Videos.findById(videoId)
		res.send(video)
	} catch (err)
	{
		res.status(400).send(err.stack)
	}
})

//GET - Get Video
//Private - User
// /api/courses/:id/videos
module.exports.getVideosInCourse = asyncHandler(async (req, res) =>
{
	try
	{
		const { id } = req.params
		const allCourseVideos = await Videos.find({ course: id })
		res.send(allCourseVideos)
	} catch (err)
	{
		res.status(statusCode).send(err.stack)
	}
})

//PUT - Update Video
//Private - Admins
// /api/courses/:id/videos/:videoId
module.exports.updateVideo = asyncHandler(async (req, res) =>
{
	try
	{
		const { videoId } = req.params

		const {
			title,
			videoLink,
			q1, q1a1, q1a2, q1a3,
			q2, q2a1, q2a2, q2a3,
			q3, q3a1, q3a2, q3a3,
		} = req.body

		const updateVideo = await Videos.findByIdAndUpdate(videoId, {
			title,
			videoLink,
			questions: {
				q1: {
					text: q1,
					answers: {
						a1: { text: q1a1 },
						a2: { text: q1a2 },
						a3: { text: q1a3 },
					}
				},
				q2: {
					text: q2,
					answers: {
						a1: { text: q2a1 },
						a2: { text: q2a2 },
						a3: { text: q2a3 },
					}
				},
				q3: {
					text: q3,
					answers: {
						a1: { text: q3a1 },
						a2: { text: q3a2 },
						a3: { text: q3a3 },
					}
				}
			}
		})

		res.status(200).json({ message: 'Updated Video Successfully' })
	} catch (err)
	{
		res.status(400).send(err.stack)
	}
})

//Delete - Delete Video
//Private - Admins
// /api/courses/:id/videos/:videoId
module.exports.deleteVideo = asyncHandler(async (req, res) =>
{
	try
	{
		const { id, videoId } = req.params
		await Course.findByIdAndUpdate(id, { $pull: { videos: videoId } })
		const deleteVideo = await Videos.findByIdAndDelete(videoId)
		res.status(200).json({ message: 'Deleted Video' })
	} catch (err)
	{
		res.status(400).send(err.stack)
	}
})