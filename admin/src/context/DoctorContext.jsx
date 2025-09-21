import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // const getAppointments = async () => {
  //     try {
  //         const { data } = await axios.get(
  //             backendUrl + '/api/doctor/doctor-appointment',
  //             { headers: { Authorization: `Bearer ${dToken}` } }
  //         );

  //         if (data.success) {
  //             setAppointments(data.appointments.reverse())
  //             console.log(data.doctors);
  //         } else {
  //             toast.error(data.message);
  //         }

  //     } catch (error) {
  //         toast.error(error.message);
  //     }
  // };


  const getAppointments = async () => {
    if (!dToken) {
      toast.error("Not authenticated");
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/doctor/doctor-appointment`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      const data = response.data;
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("getAppointments error:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Failed to fetch appointments"
      );
    }
  };


  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/complete-appointment',
        { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } }
      )

      if (data.success) {
        toast.success(data.message)
        getAppointments()
        getDashboardData() // Refresh dashboard data
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/cancel-appointment',
        { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } }
      )

      if (data.success) {
        toast.success(data.message)
        getAppointments()
        getDashboardData() // Refresh dashboard data
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getDashboardData = async () => {
    if (!dToken) {
      toast.error("Not authenticated");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      const data = response.data;
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("getDashboardData error:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Failed to fetch dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  const getDoctorProfile = async () => {
    if (!dToken) {
      toast.error("Not authenticated");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      const data = response.data;
      if (data.success) {
        setDoctorProfile(data.doctor);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("getDoctorProfile error:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Failed to fetch profile data"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateDoctorProfile = async (profileData) => {
    if (!dToken) {
      toast.error("Not authenticated");
      return false;
    }

    try {
      setLoading(true);
      const response = await axios.put(`${backendUrl}/api/doctor/profile`, profileData, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      const data = response.data;
      if (data.success) {
        setDoctorProfile(data.doctor);
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      console.error("updateDoctorProfile error:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Failed to update profile"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };


  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashboardData,
    setDashboardData,
    getDashboardData,
    doctorProfile,
    setDoctorProfile,
    getDoctorProfile,
    updateDoctorProfile,
    loading
  }


  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider