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
    <div className="m-5 max-w-full overflow-x-auto">
      <h1 className="text-xl font-semibold mb-6">All Users</h1>
      <div className="overflow-y-scroll">
        <table className="min-w-full border border-gray-300 text-sm rounded overflow-hidden">
          <thead>
            <tr style={{ backgroundColor: '#037c6e' }} className="text-white">
              <th className="p-3 text-left border border-gray-300">Name</th>
              <th className="p-3 text-left border border-gray-300">Email</th>
              <th className="p-3 text-left border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-5">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">{user.name}</td>
                  <td className="p-3 border border-gray-300">{user.email}</td>
                  <td className="p-3 border border-gray-300">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => deleteUser(user._id)}
                    >
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
