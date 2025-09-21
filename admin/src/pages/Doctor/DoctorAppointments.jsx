




// import React, { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { MdCancel } from "react-icons/md";
// import { FaCheckCircle } from "react-icons/fa";
// import assets from '../../assets_admin/assets.js'




// const DoctorAppointments = () => {
//   const { appointments, getAppointments, dToken } = useContext(DoctorContext);

//   useEffect(() => {
//     if (dToken) getAppointments();
//   }, [dToken]);


//   const calculateAge = (dob) => {
//     if (!dob) return 'N/A';

//     const birthDate = new Date(dob);
//     const today = new Date();

//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();

//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }

//     return age;
//   };

//   return (
//     <div className="w-full max-w-6xl m-5">

//       <p className="mb-3 text-lg font-medium">All Appointments</p>
//       <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
//         <div className="text-white max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b" style={{ backgroundColor: '#037c6e' }}>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {
//           appointments.map((item, index) => (
//             <div key={index}>
//               <p>{index + 1}</p>
//               <div>
//                 <img src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
//               </div>
//               <div>
//                 <p>
//                   {item.payment ? 'Online' : 'Cash'}
//                 </p>
//               </div>
//               <p>
//                 {calculateAge(item?.userData?.dob)}
//                 </p>
//                <p className="text-center text-sm font-medium">
//               {item?.slotDate} <br />
//               <span className="text-gray-500">{item?.slotTime}</span>
//             </p>
//                 <p className="text-center font-semibold text-gray-900">
//               ${item?.docData?.fees || 0}
//             </p>
//             <div>
//              <MdCancel />
//              <FaCheckCircle />

//             </div>
//             </div>
//           ))
//         }
//       </div>

//     </div>
//   )
// };

// export default DoctorAppointments;




// frontend/src/components/DoctorAppointments.jsx

// import React, { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { MdCancel } from "react-icons/md";
// import { FaCheckCircle } from "react-icons/fa";
// // import assets if you need (e.g., placeholder images) e.g.:
// // import assets from '../../assets_admin/assets.js';

// const DoctorAppointments = () => {
//   const { appointments, getAppointments, dToken } = useContext(DoctorContext);

//   useEffect(() => {
//     if (dToken) {
//       getAppointments();
//     }
//   }, [dToken, getAppointments]);

//   const calculateAge = (dob) => {
//     if (!dob) return "N/A";
//     const birthDate = new Date(dob);
//     const today = new Date();

//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();

//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }

//     return age;
//   };

//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">All Appointments</p>
//       <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
//         <div
//           className="text-white max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b"
//           style={{ backgroundColor: '#037c6e' }}
//         >
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {appointments && appointments.length > 0 ? (
//           appointments.map((item, index) => (
//             <div
//               key={item._id || index}
//               className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center py-3 px-6 border-b last:border-none"
//             >
//               <p>{index + 1}</p>
//               <div className="flex items-center gap-3">
//                 <img
//                   src={item.userData?.image || "https://via.placeholder.com/40"}
//                   alt={item.userData?.name || "Patient"}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <p>{item.userData?.name || "Unknown"}</p>
//               </div>
//               <div className="text-center">
//                 <p className={item.payment ? "text-green-600" : "text-gray-600"}>
//                   {item.payment ? "Online" : "Cash"}
//                 </p>
//               </div>
//               <div className="text-center">
//                 {calculateAge(item.userData?.dob)}
//               </div>
//               <div className="text-center text-sm font-medium">
//                 {item.slotDate
//                   ? new Date(item.slotDate).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "short",
//                       year: "numeric",
//                     })
//                   : "N/A"}{" "}
//                 <br />
//                 <span className="text-gray-500">
//                   {item.slotTime || "--:--"}
//                 </span>
//               </div>
//               <div className="text-center font-semibold text-gray-900">
//                 ${item.docData?.fees ?? 0}
//               </div>
//               <div className="flex justify-center gap-3">
//                 <MdCancel className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-800 transition" />
//                 <FaCheckCircle className="w-6 h-6 cursor-pointer text-green-600 hover:text-green-800 transition" />
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-400 py-12">
//             No appointments found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;










// frontend/src/components/DoctorAppointments.jsx

// frontend/src/components/DoctorAppointments.jsx

import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const DoctorAppointments = () => {
  const { appointments, getAppointments, dToken, completeAppointment, cancelAppointment } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken, getAppointments]);

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto">
        {/* Header */}
        <div
          className="grid grid-cols-[40px_1.5fr_1fr_1fr_2fr_1fr_1fr] items-center gap-2 py-3 px-6 text-white font-medium"
          style={{ backgroundColor: "#037c6e" }}
        >
          <p className="text-center">#</p>
          <p>Patient</p>
          <p className="text-center">Payment</p>
          <p className="text-center">Age</p>
          <p className="text-center">Date & Time</p>
          <p className="text-center">Fees</p>
          <p className="text-center">Action</p>
        </div>

        {/* Rows */}
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => {
            const user = item.userdata || {};
            const doc = item.docData || {};

            return (
              <div
                key={item._id || index}
                className="grid grid-cols-[40px_1.5fr_1fr_1fr_2fr_1fr_1fr] items-center gap-2 py-3 px-6 border-b last:border-none"
              >
                <p className="text-center">{index + 1}</p>

                {/* Patient */}
                <div className="flex items-center gap-3">
                  <img
                    src={user.image || "https://via.placeholder.com/40"}
                    alt={user.name || "Patient"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{user.name || "Unknown"}</span>
                </div>

                {/* Payment */}
                <p className={`text-center ${item.payment ? "text-green-600" : "text-gray-600"}`}>
                  {item.payment ? "Online" : "Cash"}
                </p>

                {/* Age */}
                <p className="text-center">{calculateAge(user.dob)}</p>

                {/* Date & Time */}
                <div className="text-center leading-tight text-sm">
                  <span className="font-medium">
                    {item.slotDate
                      ? new Date(item.slotDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      : "N/A"}
                  </span>
                  <br />
                  <span className="text-gray-500">{item.slotTime || "--:--"}</span>
                </div>

                {/* Fees */}
                <p className="text-center font-semibold text-gray-900">
                  ${doc.fees ?? 0}
                </p>
                {/* {
                 item.cancelled
                 ? <p>Cancelled</p>
                 : item.isCompleted
                 ? <p>Completed</p>
                 : 
                <div className="flex justify-center gap-2">
                  <MdCancel onClick={() => cancelAppointment(item._id)} className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-800" />
                  <FaCheckCircle onClick={() => completeAppointment(item._id)} className="w-5 h-5 cursor-pointer text-green-600 hover:text-green-800" />
                </div>
                } */}


                {
                  item.cancelled ? (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      Completed
                    </span>
                  ) : (
                    <div className="flex justify-center gap-3">
                      <MdCancel
                        onClick={() => cancelAppointment(item._id)}
                        className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-800 transition-transform transform hover:scale-110"
                      />
                      <FaCheckCircle
                        onClick={() => completeAppointment(item._id)}
                        className="w-6 h-6 cursor-pointer text-green-600 hover:text-green-800 transition-transform transform hover:scale-110"
                      />
                    </div>
                  )
                }


              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-400 py-12">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
