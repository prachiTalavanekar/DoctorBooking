// import React, { useContext } from 'react'
// import { AppContext } from '../context/AppContext'
// import { useState } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { useEffect } from 'react'

// const MyAppointments = () => {

//   const { backendUrl, token } = useContext(AppContext)

//   const [appointments, setAppointments] = useState([])

//   const getUserAppointments = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (data.success) {
//         setAppointments(data.appointments.reverse())
//         console.log(data.appointments)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     if (token) {
//       getUserAppointments();
//     }
//   }, [token]);


//   return (
//     <div>
//       <p className='pb-3 mt-12 font-medium text-[#037c6e] border-b'>My Appointments</p>
//       <div>
//         {appointments.map((item, index) => {
//           return <div className='grid gird-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2  border-b border-gray-300' key={index}>
//             <div>
//               <img className='w-32 bg-[#e3fcf3]' src={item.docData.image} alt="" />
//             </div>
//             <div className='flex-1 text-zinc-600'>
//               <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
//               <p>{item.docData.speciality}</p>
//               <p className='text-zinc-700 font-medium mt-1'>Address:</p>
//               <p className='text-xs'>{item.docData.address.line1}</p>
//               <p className='text-xs'>{item.docData.address.line2}</p>
//               <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium mb-4'>Date & Time:</span> {item.slotDate} | {item.slotTime}</p>
//             </div>
//             <div>

//             </div>
//             <div className='flex flex-col gap-2 justify-end'>
//               <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#037c6e] hover:text-white transition-all duration-300'>
//                 Pay Online
//               </button >
//               <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-600 hover:text-white transition-all duration-300'>
//                 Cancel appointment
//               </button>
//             </div>
//           </div>
//         })}
//       </div>
//     </div>
//   )
// }

// export default MyAppointments

// // color: #037c6e
// //  backgroundColor: '#e3fcf3' 








import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token])

  return (
    <div className="w-full mt-10">
      <p className="pb-3 text-xl font-semibold text-[#037c6e] border-b border-[#037c6e]/30">
        My Appointments
      </p>

      {/* Responsive container */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#e3fcf3] text-[#037c6e]">
            <tr>
              <th className="text-left px-3 py-3 border-b">Doctor</th>
              <th className="text-left px-3 py-3 border-b">Speciality</th>
              <th className="text-left px-3 py-3 border-b">Address</th>
              <th className="text-left px-3 py-3 border-b">Date & Time</th>
              <th className="text-center px-3 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {/* Doctor */}
                <td className="px-3 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <img
                      src={item.docData.image}
                      alt={item.docData.name}
                      className="w-16 h-16 object-cover rounded bg-[#e3fcf3] mx-auto sm:mx-0"
                    />
                    <p className="mt-2 sm:mt-0 font-semibold text-neutral-800 text-center sm:text-left">
                      {item.docData.name}
                    </p>
                  </div>
                </td>

                {/* Speciality */}
                <td className="px-3 py-4 text-sm">{item.docData.speciality}</td>

                {/* Address */}
                <td className="px-3 py-4 text-xs">
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                </td>

                {/* Date & Time */}
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {item.slotDate} | {item.slotTime}
                </td>

                {/* Actions */}
                <td className="px-3 py-4 text-center">
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <button className="w-full sm:w-auto text-sm font-medium text-[#037c6e] text-center px-4 py-2 border border-[#037c6e] rounded hover:bg-[#037c6e] hover:text-white transition-colors duration-300">
                      Pay Online
                    </button>
                    <button className="w-full sm:w-auto text-sm font-medium text-red-600 text-center px-4 py-2 border border-red-300 rounded hover:bg-red-600 hover:text-white transition-colors duration-300">
                      Cancel appointment
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {appointments.length === 0 && (
              <tr>
                <td colSpan="5" className="px-3 py-6 text-center text-gray-500">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyAppointments
