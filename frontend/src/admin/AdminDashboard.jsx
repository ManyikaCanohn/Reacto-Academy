
import { Link } from 'react-router-dom';
import { FaCog, FaUsers, FaBookOpen, FaChartBar, FaFacebook, FaLinkedinIn, FaGithub, FaWhatsapp, FaTachometerAlt, FaBars, FaDeskpro} from 'react-icons/fa';
import AdminWelcome from './adminComponents/AdminWelcome';
import AdminQuickStats from './adminComponents/AdminQuickStats';
import AdminManagement from './adminComponents/AdminManagement';
import AdminLecture from './adminComponents/AdminLecture';
import AdminLearningNotes from './adminComponents/AdminLearningNotes';

const AdminDashboard = () => {

    return ( 
        
        <>
            <nav style={{ backgroundColor: ' #06053d' }} className="container-fluid fixed-top navbar navbar-expand-lg">
                        <div className='container justify-content-between align-items-center d-flex col'>
                            <div className="d-flex align-items-center gap-2">
                                <FaDeskpro color='#39FF14' size={40} />
                                <p href="#" style={{ color: '#39FF14' }} className="navbar-brand lead fs-4"> Reacto Academy </p>
                            </div>
                            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarItems'>
                                <span className="navbar-toggler-icon text-white">
                                    <FaBars size={30} />
                                </span>
                            </button>
                        </div>

                        <div className="collapse navbar-collapse" id='navbarItems' >
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link to="#" className="nav-link me-4" style={{ color: ' #06053d' }}>
                                        <FaTachometerAlt size={30} title=' Dashboard' className=''  style={{ color: '  #39FF14' }} />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link me-4" style={{ color: ' #06053d' }}>
                                        <FaUsers size={30} title='Manage Users' className='' style={{ color: '  #39FF14' }} /> 
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link me-4" style={{ color: ' #06053d' }}>
                                        <FaBookOpen size={30} title=' Courses' className='' style={{ color: '  #39FF14' }} />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link me-4" style={{ color: ' #06053d' }}>
                                        <FaChartBar size={30} title='View Report' className='' style={{ color: '  #39FF14' }} /> 
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link me-5" style={{ color: ' #06053d' }}>
                                        <FaCog size={30} title='Settings' className='' style={{ color: '  #39FF14' }} /> 
                                    </Link>
                                </li>
                            </ul>
                        </div>
            </nav>

            <section>
                <AdminWelcome />
            </section>

            {/* QuickStat */}

            <section>
                <AdminQuickStats />
            </section>

            {/* Admin Management */}
            <section>
                <AdminManagement />
            </section>

            {/* Lecture Management */}
            <section>
                <AdminLecture />
            </section>
            
            <footer style={{ backgroundColor: ' #06053d' }} className="container-fluid align-items-center d-flex justify-content-center row text-light">
                <div className="justify-content-center p-5 d-flex flex-column flex-lg-row">
                    <div className="col-12 col-md-3">
                        <code style={{ color: '  #39FF14' }}  className='lead'> Reacto College</code>
                        <p className="mb-2 text-white">  Chelstone Kamanga, </p>
                        <p className='mb-2 text-white'> Lusaka, Zambia. </p>
                        <p className="mb-2 text-white">  info@reactocollege.co.edu </p>
                        <p className='text-white'>  +260 774 835 79 </p>
                    </div>

                    <div className="col-12 col-md-3">
                        <code style={{ color: '  #39FF14' }}  className='lead'> Quick links </code>
                        <ul className="list-unstyled">
                            <li className='mb-2'> <a href="#" className='text-decoration-none text-white'> Privacy policy </a> </li>
                            <li className='mb-2'> <a href="#" className='text-decoration-none text-white'> Terms and Conditions </a> </li>
                            <li> <a href="#" className='text-decoration-none text-white'> Support </a> </li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-3">
                        <code style={{ color: '  #39FF14' }}  className="lead"> System Info </code>
                        <p className="mb-2 text-white"> Version: v1 . 0 . 0 </p>
                        <p className="mb-2 text-white"> Last updated: July 7th, 2025 </p>
                        <p className="mb-2 text-white"> Logged In as: Administrator </p>
                        <p className='text-white'> Developed By: Manyika Munyinda </p>
                    </div>

                    <div className="col-12 col-md-3 ">
                        <code style={{ color: '  #39FF14' }}  className="lead"> Social Links </code>
                        <div className="d-flex row gap-1"> 
                            <a href="#" className='text-white text-decoration-none mb-2'> <FaLinkedinIn size={20} /> LinkedIn </a>
                            <a href="#" className='text-white text-decoration-none mb-2'> <FaWhatsapp size={20} /> WhatsApp </a>
                            <a href="#" className='text-white text-decoration-none mb-2'> <FaGithub size={20} /> GitHub </a>
                            <a href="#" className='text-white text-decoration-none mb-2'> <FaFacebook size={20} /> Facebook </a>
                        </div>
                        <div className="form-check form-switch">
                            <span> Dark mode </span>
                            <input type="checkbox" id='darkModeToggle' className="form-check-input" />
                        </div>
                    </div>
                </div>
                <p className="text-center"> &copy;2025 Reacto College. All rights reserved. </p>
                
            </footer>
        </>
    ); 
}

export default AdminDashboard