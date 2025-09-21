// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext'

// const AllApointments = () => {
//   const { aToken, appointments, getAllAppointments } = useContext(AdminContext)

// useEffect(() => {
//   if (aToken) {
//     getAllAppointments()
//   }
// }, [aToken])

//   return (
//     <div className="w-full max-w-6xl m-5">
//   <p className="mb-3 text-lg font-medium">All Appointments</p>

//   <div className="text-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll" >

//     <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b' style={{ backgroundColor: '#037c6e' }}>
//       <p>#</p>
//       <p>Patient</p>
//       <p>Age</p>
//       <p>Date & Time</p>
//       <p>Doctor</p>
//       <p>Fees</p>
//       <p>Actions</p>
//     </div>

//     {appointments.map((item , index) => (
//     <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-500' key={index}>
// <p>{index+1}</p>
// <div>
//   <img src={item?.userData?.image} alt="" /><p>{item?.userData?.name}</p>
// </div>
//       </div>
//     ))}

//   </div>
// </div>

//   )
// }

// export default AllApointments



//----------------- working code ------------------


// import React, { useContext, useEffect } from 'react';
// import { AdminContext } from '../../context/AdminContext';
// import { MdCancel } from "react-icons/md";

// // Utility function to calculate age from dob
// const calculateAge = (dob) => {
//   if (!dob) return 'N/A';

//   const birthDate = new Date(dob);
//   const today = new Date();

//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();

//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }

//   return age;
// };

// const AllAppointments = () => {
//   const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);

//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments();
//     }
//   }, [aToken]);

//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">All Appointments</p>

//       <div className="text-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">

//         {/* Table Head */}
//         <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b' style={{ backgroundColor: '#037c6e' }}>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {/* Appointments List */}
//         {appointments.map((item, index) => (
//           <div
//             key={index}
//             className="grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-cols-1 gap-3 items-center text-gray-800 py-3 px-6 border-b hover:bg-gray-50"
//           >
//             {/* Index */}
//             <p className="font-semibold">{index + 1}</p>

//             {/* Patient */}
//             <div className="flex items-center gap-2">
//               <img
//                 src={item?.userdata?.image}
//                 alt="Patient"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//               <p>{item?.userdata?.name || 'N/A'}</p>
//             </div>

//             {/* Age (calculated from DOB) */}
//             <p>{calculateAge(item?.userdata?.dob)}</p>

//             {/* Date & Time */}
//             <p>{item?.slotDate} @ {item?.slotTime}</p>

//             {/* Doctor */}
//             <div className="flex items-center gap-2">
//               <img
//                 src={item?.docData?.image}
//                 alt="Doctor"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//               <p>Dr.</p> <p>{item?.docData?.name || 'N/A'}</p>
//             </div>

//             {/* Fees */}
//             <p>${item?.docData?.fees || 0}</p>

//             {/* Status */}
//             <p>
//               {/* {item.cancelled
//                 ? <span className="text-red-500">Cancelled</span>
//                 : item.isCompleted
//                   ? <span className="text-green-600">Completed</span>
//                   : <span className="text-yellow-500">Upcoming</span>} */}
//               {
//                 item.cancelled
//                   ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                 :  //  <img
//                   //   onClick={() => cancelAppointment(item._id)}
//                   //   className='w-10 cursor-pointer'
//                   //   src={assets.cancel_icon}
//                   //   alt="Cancel"
//                   // />
//                   <MdCancel  onClick={() => cancelAppointment(item._id)}
//                      className='w-5 h-5 cursor-pointer text-red-700' />
//               }

//             </p>
//           </div>
//         ))}

//         {/* No Appointments Fallback */}
//         {appointments.length === 0 && (
//           <div className="text-center text-gray-400 py-10">
//             No appointments found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;


// ----------------------------------------------




import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { MdCancel } from "react-icons/md";

// Utility function to calculate age from dob
const calculateAge = (dob) => {
  if (!dob) return 'N/A';

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">📋 All Appointments</h2>

      <div className="bg-white rounded-lg shadow-lg text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">

        {/* Table Head */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1fr] py-3 px-6 border-b bg-teal-600 text-white font-medium text-center rounded-t-lg">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments List */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid sm:grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1fr] grid-cols-1 gap-4 sm:gap-2 items-center text-gray-700 py-4 px-6 border-b last:border-none hover:bg-gray-50 transition"
          >
            {/* Index */}
            <p className="text-center font-semibold">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-3">
              <img
                src={item?.userdata?.image}
                alt="Patient"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-medium">{item?.userdata?.name || 'N/A'}</p>
            </div>

            {/* Age */}
            <p className="text-center">{calculateAge(item?.userdata?.dob)}</p>

            {/* Date & Time */}
            <p className="text-center text-sm font-medium">
              {item?.slotDate} <br />
              <span className="text-gray-500">{item?.slotTime}</span>
            </p>

            {/* Doctor */}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <img
                src={item?.docData?.image}
                alt="Doctor"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-medium">Dr. {item?.docData?.name || 'N/A'}</p>
            </div>

            {/* Fees */}
            <p className="text-center font-semibold text-gray-900">
              ${item?.docData?.fees || 0}
            </p>

            {/* Status / Cancel */}
            <div className="flex justify-center">
              {item.cancelled ? (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                  Cancelled
                </span>
              ) : (
                <MdCancel
                  onClick={() => cancelAppointment(item._id)}
                  className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-800 transition"
                />
              )}
            </div>
          </div>
        ))}

        {/* No Appointments Fallback */}
        {appointments.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;





