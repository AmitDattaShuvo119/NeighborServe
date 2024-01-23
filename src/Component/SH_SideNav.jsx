import React from 'react';
import p from '../assets/user2.png';
// import home from '../assets/home.png';
// import user from '../assets/user.png';
import Dashboard from '../Component/Dashboard/Dashboard';
import { Link } from 'react-router-dom';

const SH_SideNav = () => {
  return (
    <div className='my-20 h-96'>
      <div className='self-center'>

        <ul className="menu bg-base-200 w-56 rounded-box">
          <li className='flex flex-col items-center'>
            <a>
              <img className="h-20 w-20 rounded-full" src={p} alt="User" />
            </a>
            <span className='text-primary mt-2'>Abdul Karim</span>
          </li>

          <Link to='/dashboard' className='mx-12 mt-10 '>
          <button className='hover:bg-primary hover:text-white flex items-center !bg-primary rounded-md'>
             {/* <img src={home} alt="" className='s-3 w-4' /> */}
              <strong>Dashboard</strong>
                    </button>
          </Link>
          <Link to='/Verify' className='mx-12 mt-8 '>
          <button className='hover:bg-primary hover:text-white flex items-center !bg-primary rounded-md'>
              {/* <img src={user} alt="" className='s-3 w-4' /> */}
              <strong>User Verify</strong>
            </button>
          </Link>
          <Link to='/Service' className='mx-12 mt-8 text-md  '>
          <button className='hover:bg-primary hover:text-white flex items-center !bg-primary rounded-md'>
              {/* <img src={home} alt="" className='s-3 w-4' /> */}
              <strong>Task History</strong>
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default SH_SideNav;
