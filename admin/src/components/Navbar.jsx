// import React, { useContext } from 'react'
// import { assets } from '../assets_admin/assets'
// import { AdminContext } from '../context/AdminContext'
// import {useNavigate} from 'react-router-dom'

// const Navbar = () => {

// const { aToken, setAToken } = useContext(AdminContext)
// const navigate = useNavigate()

// const logout = () => {
//   navigate('/')
//   aToken && setAToken('')
//   aToken && localStorage.removeItem('aToken')
// }

//   return (
//     <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-[#037c6e] bg-white">


//       <div className='flex items-center gap-2 text-xs'>
//         <img
//           className='w-36 sm:w-40 cursor-pointer'
//           src={assets.logo}
//           alt=""
//         />
//         <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
//           {aToken ? 'Admin' : 'Doctor'}
//         </p>
//       </div>

//       <button onClick={logout} className='bg-[#037c6e] text-white text-sm px-10 py-2 rounded-full cursor-pointer'>
//         Logout
//       </button>

//     </div>
//   )
// }

// export default Navbar



import React, { useContext, useState } from 'react'
import { assets } from '../assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ onMobileMenuToggle }) => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    // Clear Admin token
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }

    // Clear Doctor token
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }

    // Redirect back to login
    navigate('/')
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-[#037c6e] bg-white shadow-sm">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <img
            className="w-36 sm:w-40 cursor-pointer"
            src={assets.logo}
            alt="Logo"
            onClick={() => navigate('/')}
          />
          <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
            {aToken ? 'Admin' : dToken ? 'Doctor' : 'Guest'}
          </p>
        </div>
      </div>

      <button
        onClick={logout}
        className="bg-[#037c6e] text-white text-sm px-6 sm:px-10 py-2 rounded-full cursor-pointer hover:bg-[#026157] transition-colors"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
