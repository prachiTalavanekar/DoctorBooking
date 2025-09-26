// import React, { useContext, useEffect, useState } from 'react';
// import { AdminContext } from '../../context/AdminContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AllUsers = () => {
//   const { aToken, backendUrl } = useContext(AdminContext);
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/admin/all-users`, {
//         headers: { Authorization: `Bearer ${aToken}` },
//       });
//       if (data.success) {
//         setUsers(data.users);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const deleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       const { data } = await axios.delete(`${backendUrl}/api/admin/delete-user/${userId}`, {
//         headers: { Authorization: `Bearer ${aToken}` },
//       });
//       if (data.success) {
//         toast.success("User deleted");
//         fetchUsers(); // Refresh list
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="m-6 w-full">
//       <h1 className="text-xl font-semibold mb-6">All Users</h1>
//       <div className="overflow-y-scroll">
//         <table className="min-w-full border border-gray-300 text-sm rounded overflow-hidden">
//           <thead>
//             <tr style={{ backgroundColor: '#037c6e' }} className="text-white">
//               <th className="p-3 text-left border border-gray-300">Name</th>
//               <th className="p-3 text-left border border-gray-300">Email</th>
//               <th className="p-3 text-left border border-gray-300">Total Appointments</th>
//               <th className="p-3 text-left border border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center py-5">
//                   No users found.
//                 </td>
//               </tr>
//             ) : (
//               users.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="p-3 border border-gray-300">{user.name}</td>
//                   <td className="p-3 border border-gray-300">{user.email}</td>
//                   <td className="p-3 border border-gray-300">
//                     {user.appointments?.length || 0}
//                   </td>
//                   <td className="p-3 border border-gray-300">
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                       onClick={() => deleteUser(user._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllUsers;




import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllUsers = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-users`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const { data } = await axios.delete(`${backendUrl}/api/admin/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if (data.success) {
        toast.success("User deleted");
        fetchUsers(); // Refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="m-5 max-w-full">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span className="align-middle">👥</span> All Users
        </h1>
        <span className="text-sm text-gray-500">Total: <span className="font-medium text-gray-700">{users.length}</span></span>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-md">
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #037c6e 0%, #2fb5a5 100%)' }}></div>
        <table className="w-full min-w-[700px] text-sm">
          <thead className="text-white sticky top-0 z-10 shadow" style={{ backgroundColor: '#037c6e' }}>
            <tr>
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide text-xs">User</th>
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wide text-xs">Email</th>
              <th className="px-6 py-3 text-center font-semibold uppercase tracking-wide text-xs">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-10 text-gray-400">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="even:bg-gray-50/60 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    <div className="flex items-center gap-3">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt={user?.name || 'User'}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white border border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200"></div>
                      )}
                      <span className="truncate">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm transition"
                      onClick={() => deleteUser(user._id)}
                      title="Delete user"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-1 0v12a2 2 0 01-2 2H9a2 2 0 01-2-2V7h10z" />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
