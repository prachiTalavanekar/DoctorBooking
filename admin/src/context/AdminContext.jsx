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


  const value = {
    aToken,
    setAToken,
    backendUrl,
    getAllDoctors, changeAvailability,

  };

  return (
   <AdminContext.Provider value={{backendUrl, setAToken, doctors, aToken, getAllDoctors, changeAvailability }}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
