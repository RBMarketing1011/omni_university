import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaPlus, FaCircleXmark } from 'react-icons/fa6'

import { Accordian } from '../components/Accordian'
import { SelectField } from '../components/SelectField'

import
{
  useUpdateUserMutation,
  useUpdateUserVideosMutation,
  useUpdateUserCoursesMutation
} from '../../slices/usersApiSlice'

import { useGetAllCoursesQuery } from '../../slices/coursesApiSlice'

import { setCredentials } from '../../slices/authSlice'

import '../css/CoursesScreen.css'

const CoursesScreen = () =>
{
  //================================GET USER INFO FROM STATE.AUTH=======================

  const { userInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  //================================== RESET FORM FUNC()===============================
  const resetForm = () =>
  {
    document.querySelector('form').reset()
  }

  //================================ VIDEO STATE MANAGEMENT ==============================
  const [ course, setCourse ] = useState('Sample Course')
  const [ videoId, setVideoId ] = useState('')
  const [ vidTitle, setVidTitle ] = useState('Sample Title')
  const [ video, setVideo ] = useState('https://www.youtube.com/embed/vSgV7r_hOfM')
  const [ q1, setQ1 ] = useState('Q1')
  const [ q1Answers, setQ1Answers ] = useState([ 'q1a1', 'q1a2', 'q1a3' ])
  const [ q1CorrectAnswer, setQ1CorrectAnswer ] = useState('Q1 Correct Answer')
  const [ q2, setQ2 ] = useState('Q2')
  const [ q2Answers, setQ2Answers ] = useState([ 'q1a1', 'q1a2', 'q1a3' ])
  const [ q2CorrectAnswer, setQ2CorrectAnswer ] = useState('Q2 Correct Answer')
  const [ q3, setQ3 ] = useState('Q3')
  const [ q3Answers, setQ3Answers ] = useState([ 'q1a1', 'q1a2', 'q1a3' ])
  const [ q3CorrectAnswer, setQ3CorrectAnswer ] = useState('Q3 Correct Answer')

  const videoHandler = (vid, course) =>
  {
    setCourse(course)
    setVideoId(vid._id)
    setVidTitle(vid.title)
    setVideo(vid.videoLink)
    setQ1(vid.questions.q1.text)
    setQ1Answers(() =>
      [
        vid.questions.q1.answers.a1.text,
        vid.questions.q1.answers.a2.text,
        vid.questions.q1.answers.a3.text
      ]
    )
    setQ1CorrectAnswer(vid.questions.q1.answers.correctAnswer)
    setQ2(vid.questions.q2.text)
    setQ2Answers(() =>
      [
        vid.questions.q2.answers.a1.text,
        vid.questions.q2.answers.a2.text,
        vid.questions.q2.answers.a3.text
      ]
    )
    setQ2CorrectAnswer(vid.questions.q2.answers.correctAnswer)
    setQ3(vid.questions.q3.text)
    setQ3Answers(() =>
      [
        vid.questions.q3.answers.a1.text,
        vid.questions.q3.answers.a2.text,
        vid.questions.q3.answers.a3.text
      ]
    )
    setQ3CorrectAnswer(vid.questions.q3.answers.correctAnswer)

    setQ1SubmittedAnswer('')
    setQ2SubmittedAnswer('')
    setQ3SubmittedAnswer('')
  }

  //=================================FORM SUBMISSION AND ANSWERS STATE ===============================

  const [ updateVideos ] = useUpdateUserVideosMutation()

  const [ q1SubmittedAnswer, setQ1SubmittedAnswer ] = useState('')
  const [ q2SubmittedAnswer, setQ2SubmittedAnswer ] = useState('')
  const [ q3SubmittedAnswer, setQ3SubmittedAnswer ] = useState('')

  const q1AnswerStateHandler = (e) =>
  {
    setQ1SubmittedAnswer(e.target.value)
  }

  const q2AnswerStateHandler = (e) =>
  {
    setQ2SubmittedAnswer(e.target.value)
  }

  const q3AnswerStateHandler = (e) =>
  {
    setQ3SubmittedAnswer(e.target.value)
  }

  // =============Algorithm to check if course completed or not=========================
  const [ updateCourses ] = useUpdateUserCoursesMutation()

  const isCourseCompleteHandler = async (arr, target, allCoursesCompleted, course) =>
  {

    if (target.every(value => arr.includes(value)))
    {
      if (!allCoursesCompleted.includes(course._id))
      {
        try
        {
          const res = await updateCourses({ courseId: course._id, id: userInfo._id }).unwrap()
          dispatch(setCredentials(res))
          toast.success(course.title + ' Course Completed')
        } catch (err)
        {
          toast.error(err?.data?.message || err.error)
        }
      }
    }
  }

  // SUBMIT FORM AND ADD ID OF VIDEO TO 'VIDEOSCOMPLETE' IF CORRECT ANSWERS GIVEN
  const submitFormHandler = async (e) =>
  {
    e.preventDefault()

    if (
      q1SubmittedAnswer === q1CorrectAnswer &&
      q2SubmittedAnswer === q2CorrectAnswer &&
      q3SubmittedAnswer === q3CorrectAnswer
    )
    {
      if (userInfo.omniUProgress.videosComplete.includes(videoId))
      {
        toast.warning('You Have Already Passed This Video')
        resetForm()
      } else
      {
        try
        {
          const res = await updateVideos({
            id: userInfo._id,
            videoId
          }).unwrap()
          dispatch(setCredentials(res))
          resetForm()
          toast.success('Congrats, You Passed')

          //Refetch Courses To Update
          coursesRefetch()

          //Rerun checkIfOmniUCompleted
          setRunCompleted(false)

          //CHECK IF COURSE COMPLETED
          let videos = []

          courses.map(course => (
            course.videos.map(vid => videos.push(vid._id)),
            isCourseCompleteHandler(res.omniUProgress.videosComplete, videos, res.omniUProgress.coursesComplete, course),
            videos = []
          ))

        } catch (err)
        {
          toast.error(err?.data?.message || err.error)
        }
      }
    } else
    {
      toast.error('Sorry You Failed')
      resetForm()
    }
  }


  //======================GET ALL COURSES AND COURSE VIDEOS================================
  let coursesContent
  let allCourses = []
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch: coursesRefetch
  } = useGetAllCoursesQuery()

  if (isLoading)
  {
    coursesContent = <p>Loading...</p>
  } else if (isSuccess)
  {
    //==========================================================================================
    courses.map(course => allCourses.push(course._id))
    // coursesContent returned from query
    coursesContent =
      (
        <div className="group-container">
          <div className="container-title">
            <p>OU</p>
            <h1>Courses</h1>
          </div>

          {
            courses.map(course => (
              <Accordian
                key={ course._id }
                content={ course }
                func={ videoHandler }
              />
            ))
          }

        </div>
      )
  } else if (isError)
  {
    coursesContent = <p>{ error }</p>
  }

  //initiate useUpdateUserMutation
  const [ updateUser ] = useUpdateUserMutation()
  const [ runCompleted, setRunCompleted ] = useState(false)

  const omniUCompleted = async () =>
  {
    try
    {
      const res = await updateUser({
        id: userInfo._id,
        firstName: userInfo.name.firstName,
        lastName: userInfo.name.lastName,
        completedOU: true
      }).unwrap()
      dispatch(setCredentials({ ...res }))
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
    }
  }

  const omniUNotCompleted = async () =>
  {
    try
    {
      const res = await updateUser({
        id: userInfo._id,
        firstName: userInfo.name.firstName,
        lastName: userInfo.name.lastName,
        completedOU: false
      }).unwrap()
      dispatch(setCredentials({ ...res }))
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
    }
  }

  useEffect(() =>
  {
    if (allCourses.length === userInfo.omniUProgress.coursesComplete.length && !runCompleted)
    {
      omniUCompleted()
      setRunCompleted(true)
    } else if (allCourses.length !== userInfo.omniUProgress.coursesComplete.length && !runCompleted)
    {
      omniUNotCompleted()
      setRunCompleted(true)
    }
    // Adding runCompleted to the dependencies array ensures that the effect doesn't re-run when it's set to true
  }, [ allCourses.length, userInfo.omniUProgress.coursesComplete.length, runCompleted ])

  return (
    <div className='CoursesScreen'>
      <div className="courses">
        { coursesContent }
      </div>
      <div className="videos">
        <div className="group-container">
          <div className="container-title vid-title">
            <h1>{ course } - <span>{ vidTitle }</span></h1>
          </div>
          <div className="container-video">
            <iframe src={ `${ video }?modestbranding=1&rel=0&showinfo=1` } title="YouTube video player" frameBorder="0"></iframe>
          </div>
          <div className="card-body">
            <Form className='card-form' onSubmit={ (e) => submitFormHandler(e) }>
              <div className="card-container">
                <div className="form-group">
                  <div className="title">
                    <h4><span>Take the quiz for</span> { vidTitle } </h4>
                  </div>
                </div>
                <div className="form-group">
                  <div className="title">
                    <h4>{ q1 }</h4>
                  </div>
                  <div className="content">
                    <SelectField
                      className='select'
                      stateHandler={ (e) => q1AnswerStateHandler(e) }
                      options={ q1Answers }
                      disabled=''
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="title">
                    <h4>{ q2 }</h4>
                  </div>
                  <div className="content">
                    <SelectField
                      stateHandler={ (e) => q2AnswerStateHandler(e) }
                      options={ q2Answers }
                      disabled=''
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="title">
                    <h4>{ q3 }</h4>
                  </div>
                  <div className="content">
                    <SelectField
                      stateHandler={ (e) => q3AnswerStateHandler(e) }
                      options={ q3Answers }
                      disabled=''
                    />
                  </div>
                </div>
              </div>
              <div className="btn-group">
                <button type='submit' className='btn-primary'>Submit</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CoursesScreen }