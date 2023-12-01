import '../css/HomePage.css'

const HomePage = () =>
{
	return (
		<div className='HomePage'>
			<div className="page-heading">
				<h1>Welcome To Omni University!</h1>
				<h3>Where Learning Is Just A Click Away!</h3>
			</div>
			<div className="main-img">
				<img src="/Omni U Header.png" alt="Guy ordering coffee and a luxury coffee shop and restaurant | Omni University" />
			</div>
			<div className="platform-description">
				<div className="pg">
					<h2>Welcome to Omni University,</h2>
					<p>your premier online training destination designed to enhance your professional skills and knowledge. Our platform is tailored to provide an engaging and comprehensive learning experience, ensuring that you have access to a wide range of courses specifically crafted to meet your training needs. Whether you're here to develop new skills or to advance in your career, Omni University is committed to supporting you on your learning journey.</p>
				</div>

				<div className="pg">
					<h3>Navigating the Platform</h3>
					<p>To begin your learning experience, simply log in with your Omni U credentials. Click the 'Sign In' button located in the top right corner of the header. Once logged in, accessing your courses is straightforward and user-friendly.</p>
				</div>

				<div className="pg">
					<h3>Accessing Courses:</h3>
					<p>You can navigate to your courses by selecting the 'Courses' button on the navigation bar.
						Alternatively, click on the 'Profile' icon and choose the courses you need to complete.
						Your personalized dashboard also offers direct access to all your courses and required learning materials.
						Course Layout and Progress Tracking:</p>

					<p>Inside each course, you'll find a list of videos and learning materials.
						Completed videos are marked with a green checkmark, allowing you to easily track your progress.
						Once you complete all videos in a course, a green checkmark will appear next to the course name, indicating your accomplishment.</p>
				</div>

				<div className="pg">
					<h3>Utilizing the Dashboard:</h3>
					<p>Your dashboard is a central hub for your learning journey.
						Here, you'll find an organized display of all courses and videos that you need to complete, along with your progress updates.
						Feel free to explore the platform, and if there's anything specific you need help with, our support team is always ready to assist you.</p>
				</div>

				<div className="pg">
					<h3>Thank You and Good Luck</h3>
					<p>Thank you for choosing Omni University as your partner in learning and development. We are excited to be a part of your educational journey and are committed to providing a rewarding and enriching experience. Good luck, and here's to your success and growth with Omni University!</p>
				</div>
			</div>
		</div>
	)
}

export { HomePage }