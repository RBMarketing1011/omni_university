import { useState } from 'react'
import { Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCircleXmark, FaCircleCheck, FaTrash, FaXmark, FaPenToSquare, FaPlus } from 'react-icons/fa6'

import
{
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
  useCreateCourseMutation,
  useDeleteCourseMutation
} from '../../slices/coursesApiSlice'

import
{
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation
} from '../../slices/videosApiSlice'

import { InputField } from '../components/InputField'

import '../css/AdminCoursesScreen.css'

const AdminCoursesScreen = () =>
{
  // ================================================= ALL DATA FOR VIDEOS CRUD OPS =================

  //===================================================CREATE VIDEO SECTION=====================
  //Videos mutations
  const [ createVideo ] = useCreateVideoMutation()

  // Set Video useState


  //==========================Delete After Use=============
  //   Courseid,
  //   title,
  //   videoLink,
  //   q1, q1a1, q1a2, q1a3,
  //   q2, q2a1, q2a2, q2a3,
  //   q3, q3a1, q3a2, q3a3,
  //==========================Delete After Use=============

  const [ openVideoForm, setOpenVideoForm ] = useState(false)

  // state for new video
  const [ courseIdForVideos, setCourseIdForVideos ] = useState('')
  const [ videoTitle, setVideoTitle ] = useState('')
  const [ videoLink, setVideoLink ] = useState('')
  const [ q1, setQ1 ] = useState('')
  const [ q1a1, setQ1a1 ] = useState('')
  const [ q1a2, setQ1a2 ] = useState('')
  const [ q1a3, setQ1a3 ] = useState('')
  const [ q2, setQ2 ] = useState('')
  const [ q2a1, setQ2a1 ] = useState('')
  const [ q2a2, setQ2a2 ] = useState('')
  const [ q2a3, setQ2a3 ] = useState('')
  const [ q3, setQ3 ] = useState('')
  const [ q3a1, setQ3a1 ] = useState('')
  const [ q3a2, setQ3a2 ] = useState('')
  const [ q3a3, setQ3a3 ] = useState('')

  //stateHandlers for InputFields Components
  const videoTitleHandler = (e) =>
  {
    setVideoTitle(e.target.value)
  }

  const videoLinkHandler = (e) =>
  {
    setVideoLink(e.target.value)
  }

  //Question 1 handlers
  const q1Handler = (e) =>
  {
    setQ1(e.target.value)
  }

  const q1a1Handler = (e) =>
  {
    setQ1a1(e.target.value)
  }

  const q1a2Handler = (e) =>
  {
    setQ1a2(e.target.value)
  }

  const q1a3Handler = (e) =>
  {
    setQ1a3(e.target.value)
  }

  //Question 2 handlers
  const q2Handler = (e) =>
  {
    setQ2(e.target.value)
  }

  const q2a1Handler = (e) =>
  {
    setQ2a1(e.target.value)
  }

  const q2a2Handler = (e) =>
  {
    setQ2a2(e.target.value)
  }

  const q2a3Handler = (e) =>
  {
    setQ2a3(e.target.value)
  }

  //Question 3 handlers
  const q3Handler = (e) =>
  {
    setQ3(e.target.value)
  }

  const q3a1Handler = (e) =>
  {
    setQ3a1(e.target.value)
  }

  const q3a2Handler = (e) =>
  {
    setQ3a2(e.target.value)
  }

  const q3a3Handler = (e) =>
  {
    setQ3a3(e.target.value)
  }

  // =================================================== Video click handlers=======================
  // open new video form
  const openVideoFormHandler = (courseId, courseName) =>
  {
    setCourseIdForVideos(courseId)
    setCourseNameForVideos(courseName)
    setOpenVideoForm(true)
    setOpenEditVideoForm(false)
    setOpenTitle(false)
  }

  //close new video form
  const closeVideoFormHandler = () =>
  {
    setOpenVideoForm(false)
    setCourseIdForVideos('')
  }

  //reset all video form useStates
  const resetVideoFormData = () =>
  {
    setVideoTitle('')
    setVideoLink('')
    setQ1('')
    setQ1a1('')
    setQ1a2('')
    setQ1a3('')
    setQ2('')
    setQ2a1('')
    setQ2a2('')
    setQ2a3('')
    setQ3('')
    setQ3a1('')
    setQ3a2('')
    setQ3a3('')
  }

  //set all video form useStates
  const setVideoFormData = (vid) =>
  {
    setVideoTitle(vid.title)
    setVideoLink(vid.videoLink)
    setQ1(vid.questions.q1.text)
    setQ1a1(vid.questions.q1.answers.a1.text)
    setQ1a2(vid.questions.q1.answers.a2.text)
    setQ1a3(vid.questions.q1.answers.a3.text)
    setQ2(vid.questions.q2.text)
    setQ2a1(vid.questions.q2.answers.a1.text)
    setQ2a2(vid.questions.q2.answers.a2.text)
    setQ2a3(vid.questions.q2.answers.a3.text)
    setQ3(vid.questions.q3.text)
    setQ3a1(vid.questions.q3.answers.a1.text)
    setQ3a2(vid.questions.q3.answers.a2.text)
    setQ3a3(vid.questions.q3.answers.a3.text)
  }

  //Submit Add Video Handler
  const submitAddVideoHandler = async (e) =>
  {
    e.preventDefault()
    try
    {
      const res = await createVideo({
        courseId: courseIdForVideos,
        title: videoTitle,
        videoLink,
        //Question 1
        q1,
        q1a1,
        q1a2,
        q1a3,
        //Question 2
        q2,
        q2a1,
        q2a2,
        q2a3,
        //Question 3
        q3,
        q3a1,
        q3a2,
        q3a3,
      }).unwrap()
      resetVideoFormData()
      refetchAllCourses()
      toast.success('Video Created Successfully')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
      console.log(err)
    }
  }

  //========================================================UPDATE VIDEO SECTION==================
  const [ updateVideo ] = useUpdateVideoMutation()

  const [ openEditVideoForm, setOpenEditVideoForm ] = useState(false)
  const [ courseNameForVideos, setCourseNameForVideos ] = useState('')
  const [ videoId, setVideoId ] = useState('')

  const editVideoFormHandler = (vid, courseId, videoId) =>
  {
    setVideoFormData(vid)
    setOpenVideoForm(true)
    setOpenEditVideoForm(true)
    setOpenTitle(false)
    setCourseIdForVideos(courseId)
    setVideoId(videoId)
  }

  const closeEditVideoFormHandler = () =>
  {
    setOpenVideoForm(false)
    setOpenEditVideoForm(false)
    resetVideoFormData()
  }

  const submitEditVideoFormHandler = async (e) =>
  {
    e.preventDefault()
    try
    {
      await updateVideo(
        {
          courseId: courseIdForVideos,
          videoId: videoId,
          title: videoTitle,
          videoLink,
          //Question 1
          q1,
          q1a1,
          q1a2,
          q1a3,
          //Question 2
          q2,
          q2a1,
          q2a2,
          q2a3,
          //Question 3
          q3,
          q3a1,
          q3a2,
          q3a3,
        }
      ).unwrap()
      resetVideoFormData()
      setOpenEditVideoForm(false)
      setOpenVideoForm(false)
      refetchAllCourses()
      toast.success('Video Updated Successfully')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
      console.log(err)
    }
  }


  //==========================================================DELETE VIDEO SECTION==================
  const [ deleteVideo ] = useDeleteVideoMutation()

  const deleteVideoHandler = async (courseId, videoId) =>
  {
    try
    {
      await deleteVideo({ courseId, videoId }).unwrap()
      refetchAllCourses()
      toast.success('Video Deleted')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
    }
  }


  // ================================================= ALL DATA FOR COURSES CRUD OPS =================
  // useState data for Editing Courses
  const [ courseTitle, setCourseTitle ] = useState('')
  const [ openTitle, setOpenTitle ] = useState(false)
  const [ editCourseTitle, setEditCourseTitle ] = useState('')
  const [ editTitleId, setEditTitleId ] = useState('')

  //==================================================CREATING COURSE===============================
  const [ createCourse ] = useCreateCourseMutation()
  //Set State When Creating Course Title from form
  const courseTitleStateHandler = (e) =>
  {
    setCourseTitle(e.target.value)
  }

  //Handler for submitting form
  const submitFormHandler = async (e) =>
  {
    e.preventDefault()
    try
    {
      await createCourse({ title: courseTitle }).unwrap()
      setCourseTitle('')
      refetchAllCourses()
      toast.success('Course Created')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
      console.log(err)
    }
  }

  //==========================================================EDITING COURSE====================
  const [ updateCourse ] = useUpdateCourseMutation()
  //Open Course Form to edit title
  const openEditTitleForm = (title, id) =>
  {
    setEditCourseTitle(title)
    setEditTitleId(id)
    setOpenTitle(true)
    setOpenEditVideoForm(false)
    setOpenVideoForm(false)
  }

  //Edit Course Handler
  const editTitleStateHandler = (e) =>
  {
    setEditCourseTitle(e.target.value)
  }

  const closeEditForm = () =>
  {
    setOpenTitle(false)
  }

  const submitEditTitleHandler = async (e) =>
  {
    e.preventDefault()

    try
    {
      await updateCourse({ title: editCourseTitle, id: editTitleId }).unwrap()
      refetchAllCourses()
      setOpenTitle(false)
      toast.success('Updated Course Title Successfully')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
    }
  }

  //=====================================================DELETING COURSE=========================
  const [ deleteCourse ] = useDeleteCourseMutation()
  //DELETE Course
  const deleteCourseHandler = async (id) =>
  {
    try
    {
      await deleteCourse({ id }).unwrap()
      refetchAllCourses()
      toast.success('Course Deleted')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
    }
  }

  //===========================================================READING ALL COURSES======================
  // using the useGetAllCoursesQuery
  const {
    data: courses,
    isLoading: allCoursesLoading,
    isSuccess: allCoursesSuccess,
    isError: allCoursesIsError,
    error: allCoursesError,
    refetch: refetchAllCourses
  } = useGetAllCoursesQuery()

  let allCoursesContent
  if (allCoursesLoading)
  {
    allCoursesContent = <p>Loading...</p>
  } else if (allCoursesSuccess)
  {
    allCoursesContent =
      <>
        {
          courses.map(el =>
          (
            <div key={ el._id } className="accordian-item">
              <div className="accordian-title">
                <h1>{ el.title }</h1>
                <div className="accordian-icons">
                  <FaPenToSquare size={ 20 } style={ { color: 'var(--dark)' } } onClick={ () => openEditTitleForm(el.title, el._id) } />
                  < FaTrash size={ 20 } style={ { color: 'var(--main-red)' } } onClick={ () => deleteCourseHandler(el._id) } />
                </div>
              </div>
              <div className="accordian-content">
                {
                  el.videos.map(vid =>
                  (
                    <div key={ vid._id } className="content">
                      <h2>{ vid.title }</h2>
                      <div className="accordian-icons">
                        <FaPenToSquare size={ 20 } style={ { color: 'var(--dark)' } } onClick={ () => editVideoFormHandler(vid, el._id, vid._id) } />
                        < FaXmark size={ 20 } style={ { color: 'var(--main-red)' } } onClick={ () => deleteVideoHandler(el._id, vid._id) } />
                      </div>
                    </div>
                  ))
                }

                <div className="content add-video" onClick={ () => openVideoFormHandler(el._id, el.title) }>
                  <h2>Add Video</h2>
                  <div className="accordian-icons">
                    <FaPlus size={ 20 } />
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </>
  } else if (allCoursesIsError)
  {
    allCoursesContent = <p>{ allCoursesError }</p>
  }


  //============================================================COMPONENT RETURN======================
  return (
    <div className="AdminCoursesScreen">
      <div className="flex-between">
        <div className="courses-content">
          <div className="courses-title">
            <h1 className='heading'>Omni U <span>Courses</span></h1>
          </div>
          <div className="courses-accordian">
            { allCoursesContent }
          </div>
        </div>

        {
          openVideoForm ?
            <div className="card">
              <div className="card-header">
                <div className="profile-pic">
                  <p>OU</p>
                </div>
                <div className="user-name">

                  {
                    openEditVideoForm ?
                      <h4>Edit { courseNameForVideos } Video</h4>
                      :
                      <h4>Create { courseNameForVideos } Video</h4>
                  }

                </div>
              </div>
              <div className="card-body">

                {
                  openEditVideoForm ?
                    < Form className='card-form' onSubmit={ (e) => submitAddVideoHandler(e) } >
                      <div className="card-container">
                        <div className="form-group" style={ { marginTop: '0' } }>
                          <div className="title">
                            <h4>Video Title</h4>
                          </div>
                          <div className="content">
                            < InputField placeholder='Title' type='text' state={ videoTitle } onChangeHandler={ (e) => videoTitleHandler(e) } />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="title">
                            <h4>Video Link</h4>
                          </div>
                          <div className="content">
                            < InputField placeholder='URL' type='text' state={ videoLink } onChangeHandler={ (e) => videoLinkHandler(e) } />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="title">
                            <h4>Question 1</h4>
                          </div>
                          <div className="content">
                            < InputField placeholder='Question #1' type='text' state={ q1 } onChangeHandler={ (e) => q1Handler(e) } />

                            < InputField placeholder='Answer #1' type='text' state={ q1a1 } onChangeHandler={ (e) => q1a1Handler(e) } />
                            < InputField placeholder='Answer #2' type='text' state={ q1a2 } onChangeHandler={ (e) => q1a2Handler(e) } />
                            < InputField placeholder='Answer #3' type='text' state={ q1a3 } onChangeHandler={ (e) => q1a3Handler(e) } />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="title">
                            <h4>Question 2</h4>
                          </div>
                          <div className="content">
                            < InputField placeholder='Question #2' type='text' state={ q2 } onChangeHandler={ (e) => q2Handler(e) } />

                            < InputField placeholder='Answer #1' type='text' state={ q2a1 } onChangeHandler={ (e) => q2a1Handler(e) } />
                            < InputField placeholder='Answer #2' type='text' state={ q2a2 } onChangeHandler={ (e) => q2a2Handler(e) } />
                            < InputField placeholder='Answer #3' type='text' state={ q2a3 } onChangeHandler={ (e) => q2a3Handler(e) } />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="title">
                            <h4>Question 3</h4>
                          </div>
                          <div className="content">
                            < InputField placeholder='Question #3' type='text' state={ q3 } onChangeHandler={ (e) => q3Handler(e) } />

                            < InputField placeholder='Answer #1' type='text' state={ q3a1 } onChangeHandler={ (e) => q3a1Handler(e) } />
                            < InputField placeholder='Answer #2' type='text' state={ q3a2 } onChangeHandler={ (e) => q3a2Handler(e) } />
                            < InputField placeholder='Answer #3' type='text' state={ q3a3 } onChangeHandler={ (e) => q3a3Handler(e) } />
                          </div>
                        </div>
                      </div>
                      <div className="btn-group">
                        <button type='submit' className='btn-primary' onClick={ (e) => submitEditVideoFormHandler(e) }>Save Changes</button>
                        <a className='btn-primary' onClick={ closeEditVideoFormHandler }>Close</a>
                      </div>
                    </Form>

                    :

                    < Form className='card-form' onSubmit={ (e) => submitAddVideoHandler(e) } >
                      <div className="card-container">
                        <div className="form-group" style={ { marginTop: '0' } }>
                          <div className="title">
                            <h4>Video Title</h4>
                          </div>
                          <div className="content">
                            < InputField placeholder='Title' type='text' state={ videoTitle } onChangeHandler={ (e) => videoTitleHandler(e) } />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="title">
                            <h4>Video Link</h4>
                          </div>
                          <div className="content">
                            < InputField placeholder='URL' type='text' state={ videoLink } onChangeHandler={ (e) => videoLinkHandler(e) } />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="title">
                            <h4>Question 1</h4>
                          </div>
                          <div className="content">
                            < InputField placeholder='Question #1' type='text' state={ q1 } onChangeHandler={ (e) => q1Handler(e) } />

                            < InputField placeholder='Answer #1' type='text' state={ q1a1 } onChangeHandler={ (e) => q1a1Handler(e) } />
                            < InputField placeholder='Answer #2' type='text' state={ q1a2 } onChangeHandler={ (e) => q1a2Handler(e) } />
                            < InputField placeholder='Answer #3' type='text' state={ q1a3 } onChangeHandler={ (e) => q1a3Handler(e) } />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="title">
                            <h4>Question 2</h4>
                          </div>
                          <div className="content">
                            < InputField placeholder='Question #2' type='text' state={ q2 } onChangeHandler={ (e) => q2Handler(e) } />

                            < InputField placeholder='Answer #1' type='text' state={ q2a1 } onChangeHandler={ (e) => q2a1Handler(e) } />
                            < InputField placeholder='Answer #2' type='text' state={ q2a2 } onChangeHandler={ (e) => q2a2Handler(e) } />
                            < InputField placeholder='Answer #3' type='text' state={ q2a3 } onChangeHandler={ (e) => q2a3Handler(e) } />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="title">
                            <h4>Question 3</h4>
                          </div>
                          <div className="content">
                            < InputField placeholder='Question #3' type='text' state={ q3 } onChangeHandler={ (e) => q3Handler(e) } />

                            < InputField placeholder='Answer #1' type='text' state={ q3a1 } onChangeHandler={ (e) => q3a1Handler(e) } />
                            < InputField placeholder='Answer #2' type='text' state={ q3a2 } onChangeHandler={ (e) => q3a2Handler(e) } />
                            < InputField placeholder='Answer #3' type='text' state={ q3a3 } onChangeHandler={ (e) => q3a3Handler(e) } />
                          </div>
                        </div>
                      </div>
                      <div className="btn-group">
                        <button type='submit' className='btn-primary'>Add Video</button>
                        <a className='btn-primary' onClick={ closeVideoFormHandler }>Close</a>
                      </div>
                    </Form>
                }

              </div>
              <div className="card-footer">
                <div className="footer-group">
                  <h4 className="footer-title">
                    User Created On:
                  </h4>
                  <p className="footer-desc">
                    Date Goes Here
                  </p>
                </div>
                <div className="footer-group">
                  <h4 className="footer-title">
                    User Last Updated On:
                  </h4>
                  <p className="footer-desc">
                    Date Goes Here
                  </p>
                </div>
              </div>
            </div>

            :

            <div className="card">
              <div className="card-header">
                <div className="profile-pic">
                  <p>OU</p>
                </div>
                <div className="user-name">

                  {
                    openTitle ?
                      <h4>Edit Course Title</h4>
                      :
                      <h4>Create New Course</h4>
                  }

                </div>
              </div>
              <div className="card-body">


                {
                  openTitle ?
                    < Form className='card-form' onSubmit={ (e) => submitEditTitleHandler(e) } >
                      <div className="card-container">
                        <div className="title">
                          <h4>Edit Course Title</h4>
                        </div>
                        <div className="content">
                          < InputField type='text' state={ editCourseTitle } onChangeHandler={ (e) => editTitleStateHandler(e) } />
                        </div>
                      </div>
                      <div className="btn-group">
                        <button type='submit' className='btn-primary'>Save Changes</button>
                        <a className='btn-primary' onClick={ closeEditForm }>Close</a>
                      </div>
                    </Form>
                    :
                    < Form className='card-form' onSubmit={ (e) => submitFormHandler(e) } >
                      <div className="card-container">
                        <div className="title">
                          <h4>Course Title</h4>
                        </div>
                        <div className="content">
                          < InputField placeholder='Enter Course Title' type='text' state={ courseTitle } onChangeHandler={ (e) => courseTitleStateHandler(e) } />
                        </div>
                      </div>
                      <div className="btn-group">
                        <button type='submit' className='btn-primary'>Create Course</button>
                      </div>
                    </Form>
                }

              </div>
              <div className="card-footer">
                <div className="footer-group">
                  <h4 className="footer-title">
                    User Created On:
                  </h4>
                  <p className="footer-desc">
                    Date Goes Here
                  </p>
                </div>
                <div className="footer-group">
                  <h4 className="footer-title">
                    User Last Updated On:
                  </h4>
                  <p className="footer-desc">
                    Date Goes Here
                  </p>
                </div>
              </div>
            </div>
        }

      </div>
    </div>
  )
}

export { AdminCoursesScreen }