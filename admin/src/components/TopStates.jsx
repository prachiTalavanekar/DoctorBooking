import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const TopStats = () => {
  const { getUserCount, getDoctorCount } = useContext(AdminContext);
  const [userCount, setUserCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const users = await getUserCount();
      const doctors = await getDoctorCount();
      setUserCount(users);
      setDoctorCount(doctors);
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-6 min-h-[30vh]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="👤" title="Total Users" value={userCount} />
        <StatCard icon="🧑‍⚕️" title="Total Doctors" value={doctorCount} />
        <StatCard icon="📅" title="Total Appointments" value="320" />
        <StatCard icon="🟢" title="Upcoming Appointments Today" />
        <StatCard icon="❌" title="Cancelled / Missed Appointments" />
        <StatCard icon="⏱️" title="Pending Doctor Approvals" />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      {value !== undefined && (
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      )}
    </div>
  </div>
);

export default TopStats;
