import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing(props) {
    

   return (
        <div className="landing">
            <p>Artisan.</p>
            <h2>A gig platform for skilled tradespeople</h2>
            <h3>I'm looking for...</h3>
            <div className="landingbuttons">
                <Link to='/contractors'>Contractors</Link>
                <Link to='/jobs'>Jobs</Link>
            </div>
            
            <div className='features'>
                <h1 className='features-heading'>features</h1>
                <p className='feature-section'>Find and engage services quickly and easily.</p>
                <div className='publish-job'>
                    <video  width='480' height='400' controls >
                        <source src='../assets/videos/publish_job.mp4' type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                    <div className='feature-content'>
                        <h2>Publish a job, let contractors find you.</h2>
                        <p> 
                            Pick a service that best describes your job, define your requirments and budget, 
                            hit Send. That's it!
                        </p>
                    </div>   
                </div>
                <div className='publish-job' id='bkcontractor-service'>
                    <video  width='480' height='400' controls >
                        <source src='../assets/videos/book_contractor_service.mp4' type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                    <div className='feature-content'>
                        <h2>Find a contractor, engage their services.</h2>
                        <p> 
                            Offers sent directly to contractors from their profile page won't
                            be shown to anyone else. Once again, define your requirments and budget, 
                            hit Send. That's it!
                        </p>
                    </div>   
                </div>
                <p className='feature-section'>Choose which projects you want to work on.</p>
                <div className='publish-job'>
                    <video  width='480' height='400' controls >
                        <source src='../assets/videos/accept_reject_bookings.mp4' type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                    <div className='feature-content'>
                        <h2>Accept or reject direct offers.</h2>
                        <p>Contractors can accept or reject direct offers with one click!</p>
                        <p>Or go to the jobs page and claim a job.</p>

                    </div>   
                </div>
                <p>Find these and many other features in the app.</p>
            </div>
            <div className='about-container'>
                <p>About Us</p>
                <div className='about-section'>
                    <div>

                        <div className='about-me'>
                            <p>Albert Irura</p>
                            <small>Built the React App</small>
                            <p>
                                <a href="https://www.linkedin.com/in/albertmathenge/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin-square"></i></a> 
                                <a href="https://twitter.com/awol_cat" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                                <a href="https://github.com/awolcat" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                            </p>
                        </div>
                    </div>
                    <div>

                        <div className='about-me'>
                            <p>Habeeb Dindi</p>
                            <small>Built the Flask App</small>
                            <p>
                                <a href="https://www.linkedin.com/in/habeeb-dindi-703b03129/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin-square"></i></a>
                                <a href="https://twitter.com/habeebulla_h" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                                <a href="https://github.com/habeebdindi" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}