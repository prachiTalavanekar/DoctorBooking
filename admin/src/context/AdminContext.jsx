// import { createContext } from "react";

// export const AdminContext = createContext()

// const AdminContextProvider = (props) =>{
//     const [aToken, setAToken] = useState('');
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;


// const value = {
//   aToken, setAToken,
//   backendUrl,
// }



//     return (
//         <AdminContext.Provider value={value}>
//             {props.children}
//         </AdminContext.Provider>
//     )
// }

// export default AdminContextProvider


import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
  const [doctors, setDoctors] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
   try {
    const { data } = await axios.get(
      backendUrl + '/api/admin/all-doctors',
      { headers: { Authorization: `Bearer ${aToken}` } }
    
    );
    console.log("Auth header:", `Bearer ${aToken}`);

    if (data.success) {
      setDoctors(data.doctors);
      console.log(data.doctors);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }

  }


 const changeAvailability = async (docId) => {
  try {
    const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, { headers: { Authorization: `Bearer ${aToken}` } })
    if(data.success){
      toast.success(data.message)
      await  getAllDoctors();
    } else{
      toast.error(data.message);
    }
  } catch (error) {
     toast.error(error.message);
  }
 }



 const getAllUsers = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/all-users`, {
      headers: { Authorization: `Bearer ${aToken}` }
    });
    return data?.users || [];
  } catch (error) {
    toast.error("Failed to fetch users");
    return [];
  }
};

const deleteUser = async (userId) => {
  try {
    const { data } = await axios.delete(`${backendUrl}/api/admin/delete-user/${userId}`, {
      headers: { Authorization: `Bearer ${aToken}` }
    });
    return data;
  } catch (error) {
    toast.error("Delete failed");
    return { success: false };
  }
};




const getUserCount = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/stats/users`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });
    return data?.count || 0;
  } catch (error) {
    toast.error("Failed to fetch user count");
    return 0;
  }
};

const getDoctorCount = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/stats/doctors`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });
    return data?.count || 0;
  } catch (error) {
    toast.error("Failed to fetch doctor count");
    return 0;
  }
};

const getAppointmentsCount = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/stats/appointments`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });
    return data?.count || 0;
  } catch (error) {
    toast.error("Failed to fetch appointments count");
    return 0;
  }
};


// const getAllUsersWithAppointments = async () => {
//   try {
//     const { data } = await axios.get(`${backendUrl}/api/admin/all-users-with-appointments`, {
//       headers: { Authorization: `Bearer ${aToken}` }
//     });
//     return data?.users || [];
//   } catch (error) {
//     toast.error("Failed to fetch users with appointment counts");
//     return [];
//   }
// };



  const value = {
    aToken,
    setAToken,
    backendUrl,
    getAllDoctors, changeAvailability,
    deleteUser,
    getAllUsers,
    getDoctorCount,
    getUserCount,
    getAppointmentsCount,
  

  };

  return (
   <AdminContext.Provider value={{backendUrl, setAToken, doctors, aToken, getAllDoctors, changeAvailability ,deleteUser,getAllUsers,getDoctorCount,getUserCount,getAppointmentsCount}}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
