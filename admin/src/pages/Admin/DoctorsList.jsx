// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext.jsx'

// const DoctorsList = () => {
//   const { doctors, aToken, getAllDoctors } = useContext(AdminContext)

//   useEffect(() => {
//     if (aToken) {
//       getAllDoctors()
//     }
//   }, [aToken])

// return (
//   <div className='m-5 max-h-[90vh] overflow-y-scroll'>
//     <h1 className='text-lg font-medium'>All Doctors</h1>
//     <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//       {
//         doctors.map((item, index) => (
//           <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
//             <img className='bg-[#e3fcf3] group-hover:bg-[#7fe7c1ff] transition-all duration-500' src={item.image} alt="" />
//             <div className='p-4'>
//               <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
//               <p className='text-zinc-600 text-sm'>{item.speciality}</p>
//               <div className='mt-2 flex items-center gap-1 text-sm'>
//                 <input type="checkbox" checked={item.available} />
//                 <p>Available</p>
//               </div>
//             </div>
//           </div>
//         ))
//       }
//     </div>
//   </div>
// )

// }

// export default DoctorsList
     








// // import React, { useContext, useEffect } from 'react'
// // import { AdminContext } from '../../context/AdminContext.jsx'

// // const DoctorsList = () => {
// //   const { doctors, aToken, getAllDoctors } = useContext(AdminContext)

// //   useEffect(() => {
// //     if (aToken) {
// //       getAllDoctors()
// //     }
// //   }, [aToken])

// //   return (
// //     <div className="m-5 max-h-[90vh] overflow-y-scroll">
// //       <h1 className="text-lg font-medium mb-5">All Doctors</h1>
// //       <div className="w-full flex flex-wrap gap-6">
// //         {doctors.map((item, index) => (
// //           <div
// //             key={index}
// //             className="border border-gray-300 rounded-xl p-6 w-56 text-center shadow-sm hover:shadow-md transition-all duration-300 bg-white"
// //           >
// //             {/* Doctor Image */}
// //             <img
// //               src={item.image}
// //               alt={item.name}
// //               className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
// //             />

// //             {/* Availability */}
// //             <div className="flex items-center justify-center gap-2 mb-2">
// //               <span
// //                 className={`h-3 w-3 rounded-full ${
// //                   item.available ? 'bg-green-500' : 'bg-red-500'
// //                 }`}
// //               ></span>
// //               <span
// //                 className={`text-sm font-medium ${
// //                   item.available ? 'text-green-600' : 'text-red-600'
// //                 }`}
// //               >
// //                 {item.available ? 'Available' : 'Unavailable'}
// //               </span>
// //             </div>

// //             {/* Doctor Details */}
// //             <p className="font-semibold text-lg text-gray-800">{item.name}</p>
// //             <p className="text-gray-500 text-sm">{item.speciality}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // export default DoctorsList


// // #7fe7c1ff
//bg-[#e3fcf3]










// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext.jsx'

// const DoctorsList = () => {
//   const { doctors, aToken, getAllDoctors , changeAvailability} = useContext(AdminContext)

//   useEffect(() => {
//     if (aToken) {
//       getAllDoctors()
//     }
//   }, [aToken])

//   return (
//     <div className="m-5 max-h-[90vh] overflow-y-scroll">
//       <h1 className="text-lg font-medium mb-5">All Doctors</h1>
//       <div className="w-full flex flex-wrap gap-6 group cursor-pointer">
//         {doctors.map((item, index) => (
//           <div
//             key={index}
//             className="rounded-xl w-56 text-center bg-white overflow-hidden"
//             style={{ border: '2px solid rgb(47, 181, 165)' }}
//           >
//             {/* Doctor Image */}
//             <div className="flex justify-center mt-4">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 rounded-full object-cover group-hover:bg-[#7fe7c1ff] bg-[#e3fcf3] transition-all duration-500"
//               />
//             </div>

//             {/* Doctor Info */}
//             <div className="p-4">
//               {/* Availability with checkbox (unchanged) */}
//               <div className="mt-2 flex items-center justify-center gap-2 text-sm mb-2">
//                 <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available}  />
//                 <p>Availability</p>
//               </div>

//               {/* Doctor Name & Specialty */}
//               <p className="font-semibold text-lg text-gray-800">{item.name}</p>
//               <p className="text-gray-500 text-sm">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default DoctorsList




import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto w-full">
      <h1 className="text-lg font-medium mb-5">All Doctors</h1>

      <div className="w-full overflow-x-auto rounded-md border border-[#2fb5a5]/40">
        <table className="w-full min-w-full divide-y divide-gray-200 text-sm">
          <thead  style={{ backgroundColor: '#037c6e' }} className="text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Image</th>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Speciality</th>
              <th className="px-6 py-3 text-center font-semibold">Availability</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((item, index) => (
              <tr key={index} className="hover:bg-[#e3fcf3]/60 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#2fb5a5]/50 bg-[#e3fcf3]"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                <td className="px-6 py-4 text-gray-500">{item.speciality}</td>
                <td className="px-6 py-4 text-center">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                      className="form-checkbox h-4 w-4 text-[#2fb5a5] focus:ring-[#2fb5a5]"
                    />
                    <span className="text-gray-700">Available</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DoctorsList
