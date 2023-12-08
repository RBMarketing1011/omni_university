import '../css/HomeScreen.css'

const HomeScreen = () =>
{
  return (
    <div className='HomeScreen'>
      <div className="text-center">
        <h3 className='subheading'>Welcome to</h3>
        <h1 className="heading">
          Omni<span>University</span>
        </h1>
        <h3 className="heading-desc">
          Where learning is just a click away!
        </h3>
      </div>

      <div className="img">
        <img src="/OmniHeader.png" alt="Omni University Header Image" />
      </div>
      <p className="desc">
        Welcome to Omni University, where we empower your professional growth with our comprehensive online training platform. Our courses are designed to enhance your skills and knowledge, making learning both accessible and enjoyable. Whether you're aiming to advance in your current role or explore new career opportunities, Omni University is here to support your journey every step of the way.
      </p>

      <div className="ou-directions">
        <h2 className="heading2">
          Navigating the Platform
        </h2>
        <h3 className="subheading">
          Main Navigation (Header)
        </h3>

        <p className="desc">
          After logging in with your Omni U credentials, you have several options in the main navigation bar located in the header:
        </p>

        <ul className="desc">
          <li>
            <span>Instructions:</span> Find detailed guidelines on how to use the platform effectively.
          </li>
          <li>
            <span>Dashboard:</span> Access your personal dashboard to view your progress and upcoming courses.
          </li>
          <li>
            <span>Courses:</span> Browse and select courses that align with your learning objectives.
          </li>
          <li>
            <span>Logout:</span> Securely log out of the platform when you're done.
          </li>
        </ul>

        <h3 className="subheading">
          Sidebar Navigation
        </h3>
        <p className="desc">
          The sidebar offers a user-friendly and intuitive way to navigate through various features of the platform:
        </p>

        <ul className="desc">
          <li>
            <span>Home:</span> Return to the homepage at any time for updates and announcements.</li>
          <li>
            <span>Dashboard:</span> Quickly access your dashboard to monitor your learning progress.</li>
          <li>
            <span>Courses:</span> Explore the range of courses available and continue your learning journey.</li>
          <li>
            <span>Edit Profile (User Info tab with person icon):</span> Update your personal information and preferences.</li>
          <li>
            <span>View Profile (Profile tab with user inside circle icon):</span> Review your profile details and achievements.</li>
          <li>
            <span>Logout:</span> Log out of your account for security when your session is complete.</li>
        </ul>

        <h2 className="heading2">
          Course Layout and Progress Tracking
        </h2>
        <p className="desc">
          In each course, you will find a structured list of videos and materials:
        </p>

        <p className="desc">
          Videos you've completed will be marked with a green checkmark, making it easy to track your progress.
          When all videos in a course are completed, a green checkmark will appear beside the course name in your course list.
        </p>

        <h2 className="heading2">
          Utilizing the Dashboard
        </h2>

        <p className="desc">
          Your dashboard is the control center for your learning:
        </p>
        <p className="desc">
          Here, you'll find an overview of your courses, progress indicators, and access to learning materials.
          It's your go-to place to manage and track your educational journey.
        </p>

        <h2 className="heading2">
          Thank You and Best Wishes

        </h2>

        <p className="desc">
          Thank you for choosing Omni University for your professional development. We are thrilled to support you in achieving your learning goals. Explore, learn, and grow with us. Good luck, and we're excited to see where your learning journey takes you!
        </p>
      </div>
    </div>
  )
}

export { HomeScreen }