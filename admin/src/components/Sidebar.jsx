// import React, { useContext } from 'react'
// import { assets } from '../assets_admin/assets'
// import { NavLink } from 'react-router-dom'
// import { AdminContext } from '../context/AdminContext'

// const Sidebar = () => {
//     const { aToken } = useContext(AdminContext)

//     return (
//         <div className="min-h-screen bg-[#037c6e] border-r border-[#a3eed2ff]">
//             {
//                 aToken && (
//                     <ul className="text-[#515151] mt-5"
//                     >
//                         <NavLink
//                             to={'/admin-dashboard'}
//                             className={({ isActive }) =>
//                                 `text-white flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f0fbf7ff] border-r-4 border-[#037c6e] text-zinc-700' : ''
//                                 }`
//                             }
//                         >
//                             <img className='text-white' src={assets.home} alt="" />
//                             <p>Dashboard</p>
//                         </NavLink>


//                         <NavLink to={'/all-apointments'} className={({ isActive }) =>
//                             `text-white flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f0fbf7ff] border-r-4 border-[#037c6e] text-zinc-700' : ''
//                             }`
//                         }>
//                             <img src={assets.appointment} alt="" />
//                             <p>Appointments</p>
//                         </NavLink>

//                         <NavLink to={'/add-doctor'} className={({ isActive }) =>
//                             `text-white flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f0fbf7ff] border-r-4 border-[#037c6e] text-zinc-700' : ''
//                             }`
//                         }>
//                             <img src={assets.add} alt="" />
//                             <p>Add Doctor</p>
//                         </NavLink>

//                         <NavLink to={'/doctor-list'} className={({ isActive }) =>
//                             `text-white flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f0fbf7ff] border-r-4 border-[#037c6e] text-zinc-700' : ''
//                             }`
//                         }>
//                             <img src={assets.people} alt="" />
//                             <p>Doctors List</p>
//                         </NavLink>
//                     </ul>
//                 )
//             }
//         </div>
//     )

// }

// export default Sidebar


import React, { useContext } from 'react';
import { assets } from '../assets_admin/assets';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-[#01302b] border-r border-[#a3eed2ff]">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `text-white flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? 'bg-[#f0fbf7ff] border-r-4 border-[#037c6e] text-zinc-700'
                  : ''
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? assets.home_icon : assets.home} alt="Dashboard" />
                <p>Dashboard</p>
              </>
            )}
          </NavLink>

          <NavLink
            to="/all-apointments"
            className={({ isActive }) =>
              `text-white flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? 'bg-[#f0fbf7ff] border-r-4 border-[#037c6e] text-zinc-700'
                  : ''
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? assets.appointment_icon : assets.appointment} alt="Appointments" />
                <p>Appointments</p>
              </>
            )}
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `text-white flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? 'bg-[#f0fbf7ff] border-r-4 border-[#037c6e] text-zinc-700'
                  : ''
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? assets.add_icon : assets.add} alt="Add Doctor" />
                <p>Add Doctor</p>
              </>
            )}
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `text-white flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? 'bg-[#f0fbf7ff] border-r-4 border-[#037c6e] text-zinc-700'
                  : ''
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? assets.people_icon : assets.people} alt="Doctors List" />
                <p>Doctors List</p>
              </>
            )}
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
