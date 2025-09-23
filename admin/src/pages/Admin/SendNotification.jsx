import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const SendNotification = () => {
  const [activeTab, setActiveTab] = useState('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [notificationText, setNotificationText] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [history, setHistory] = useState([]);
  const { getNotificationRecipients, sendAdminNotification, getAdminNotificationHistory } = useContext(AdminContext);

  useEffect(() => {
    const load = async () => {
      setSelectedIds([]);
      setSearchQuery('');
      const list = await getNotificationRecipients(activeTab);
      setRecipients(list);
      const h = await getAdminNotificationHistory();
      setHistory(h);
    };
    load();
  }, [activeTab]);

  const filteredRecipients = useMemo(() => {
    if (!searchQuery) return recipients;
    const q = searchQuery.toLowerCase();
    return recipients.filter(r => r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q));
  }, [recipients, searchQuery]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSendNotification = async () => {
    if (selectedIds.length === 0 || !notificationText.trim()) return;
    const ok = await sendAdminNotification({
      recipientType: activeTab === 'doctors' ? 'doctor' : 'user',
      recipientIds: selectedIds,
      message: notificationText.trim(),
    });
    if (ok) {
      setNotificationText('');
      setSelectedIds([]);
      const h = await getAdminNotificationHistory();
      setHistory(h);
    }
  };

  return (
    <div className="w-full min-h-[70vh] bg-gray-50 p-6">
      <div className="flex flex-col md:flex-row gap-6 w-full min-h-[70vh]">
        {/* Left: Send Notification */}
        <div className="flex-1 bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#037c6e]">Send Notification</h2>

          {/* Toggle */}
          <div className="flex space-x-4 mb-6">
            {['doctors', 'patients'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery('');
                  setSelectedIds([]);
                  setNotificationText('');
                }}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-[#037c6e] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Search {activeTab === 'doctors' ? 'Doctor' : 'Patient'}
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#037c6e]"
                placeholder={`Enter ${activeTab === 'doctors' ? 'doctor' : 'patient'} name`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Recipients list */}
          <div className="border rounded-md max-h-64 overflow-y-auto">
            {filteredRecipients.map(r => (
              <label key={r._id} className="flex items-center gap-3 p-2 border-b last:border-b-0">
                <input type="checkbox" checked={selectedIds.includes(r._id)} onChange={() => toggleSelect(r._id)} />
                <div className="flex items-center gap-3">
                  {r.image ? <img src={r.image} className="w-8 h-8 rounded-full" /> : <div className="w-8 h-8 rounded-full bg-gray-200" />}
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.email}</div>
                  </div>
                </div>
              </label>
            ))}
            {filteredRecipients.length === 0 && (
              <div className="p-3 text-sm text-gray-500">No recipients</div>
            )}
          </div>

          {/* Notification Input */}
          <div className="mt-4">
            <textarea
              rows="4"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#037c6e]"
              placeholder="Type your notification here..."
              value={notificationText}
              onChange={(e) => setNotificationText(e.target.value)}
            ></textarea>
            <button
              onClick={handleSendNotification}
              className="mt-3 px-4 py-2 bg-[#037c6e] text-white rounded-md hover:bg-[#02665d] transition"
            >
              Send Notification
            </button>
          </div>
        </div>

        {/* Right: Notification History */}
        <div className="flex-1 bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#037c6e]">Notification History</h2>

          {history.length === 0 ? (
            <p className="text-gray-500">No notifications sent yet.</p>
          ) : (
            <ul className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {history.map((item) => (
                <li key={item._id} className="border border-gray-200 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      To: <strong>{item.docId?.name || item.userId?.name}</strong>
                    </span>
                    <span className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-800">{item.message}</p>
                  {item.isRead ? (
                    <span className="mt-2 inline-block text-xs text-green-600">Seen</span>
                  ) : (
                    <span className="mt-2 inline-block text-xs text-orange-600">Unseen</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendNotification;













// // react code - UPDATED
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Define your API URL once
// const API_URL = 'http://localhost:4000/api';

// const SendNotification = () => {
//   const [activeTab, setActiveTab] = useState('doctors');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null); // Will store the full user object
//   const [notificationText, setNotificationText] = useState('');
//   const [notificationHistory, setNotificationHistory] = useState([]);
  
//   const [users, setUsers] = useState([]); // A single state to hold doctors or patients
//   const [loading, setLoading] = useState(false);

//   // Fetch users whenever the activeTab changes
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setSelectedUser(null); // Clear selection on tab change
//       setSearchQuery('');
//       try {
//         const response = await axios.get(`${API_URL}/users/${activeTab}`);
//         if (response.data.success) {
//           setUsers(response.data.data);
//         }
//       } catch (error) {
//         console.error(`Failed to fetch ${activeTab}:`, error);
//         setUsers([]); // Clear users on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [activeTab]); // This effect runs when `activeTab` changes

//   const handleSendNotification = async () => {
//     if (!selectedUser || !notificationText.trim()) {
//       alert('Please select a recipient and write a message.');
//       return;
//     }

//     try {
//       const response = await axios.post(`${API_URL}/notify`, {
//         recipientId: selectedUser._id,
//         recipientRole: activeTab,
//         message: notificationText,
//       });

//       if (response.data.success) {
//         // Add to local history
//         const newNotification = {
//           id: Date.now(),
//           recipient: selectedUser.name,
//           type: activeTab,
//           message: notificationText,
//           timestamp: new Date().toLocaleString(),
//         };
//         setNotificationHistory([newNotification, ...notificationHistory]);
        
//         // Reset form
//         setSelectedUser(null);
//         setNotificationText('');
//         setSearchQuery('');
//         alert('Notification sent successfully!');
//       }
//     } catch (error) {
//       console.error('Failed to send notification:', error);
//       alert('Error sending notification.');
//     }
//   };

//   // Filter users based on search query for display
//   const filteredUsers = searchQuery
//     ? users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     : [];

//   return (
//     <div className="w-full min-h-[70vh] bg-gray-50 p-6">
//       <div className="flex flex-col md:flex-row gap-6 w-full min-h-[70vh]">
//         {/* Left: Send Notification */}
//         <div className="flex-1 bg-white shadow-md rounded-md p-6">
//           <h2 className="text-2xl font-bold mb-4 text-[#037c6e]">Send Notification</h2>

//           {/* Toggle */}
//           <div className="flex space-x-4 mb-6">
//             {['doctors', 'patients'].map(tab => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
//                   activeTab === tab
//                     ? 'bg-[#037c6e] text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Search and User Selection */}
//           <div className="mb-4">
//             <label className="block mb-1 font-medium text-gray-700">
//               Search {activeTab === 'doctors' ? 'Doctor' : 'Patient'}
//             </label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#037c6e]"
//               placeholder={`Enter ${activeTab === 'doctors' ? 'doctor' : 'patient'} name...`}
//               value={searchQuery}
//               onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                   setSelectedUser(null); // Clear selected user while typing
//               }}
//             />
//             {/* Search results dropdown */}
//             {filteredUsers.length > 0 && !selectedUser && (
//               <div className="border border-gray-200 rounded-md mt-1 max-h-48 overflow-y-auto">
//                 {filteredUsers.map(user => (
//                   <div
//                     key={user._id}
//                     className="p-2 cursor-pointer hover:bg-gray-100"
//                     onClick={() => {
//                       setSelectedUser(user);
//                       setSearchQuery(user.name); // Populate input with selected name
//                     }}
//                   >
//                     {user.name} ({user.email})
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Notification Input */}
//           {selectedUser && (
//             <div className="mt-4">
//               <p className="mb-2 text-sm text-gray-600">
//                 Selected {activeTab === 'doctors' ? 'Doctor' : 'Patient'}: <strong>{selectedUser.name}</strong>
//               </p>
//               <textarea
//                 rows="4"
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#037c6e]"
//                 placeholder="Type your notification here..."
//                 value={notificationText}
//                 onChange={(e) => setNotificationText(e.target.value)}
//               ></textarea>
//               <button
//                 onClick={handleSendNotification}
//                 className="mt-3 px-4 py-2 bg-[#037c6e] text-white rounded-md hover:bg-[#02665d] transition"
//               >
//                 Send Notification
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Right: Notification History */}
//         <div className="flex-1 bg-white shadow-md rounded-md p-6">
//           <h2 className="text-2xl font-bold mb-4 text-[#037c6e]">Notification History</h2>
//           {notificationHistory.length === 0 ? (
//             <p className="text-gray-500">No notifications sent yet.</p>
//           ) : (
//             <ul className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
//               {notificationHistory.map((item) => (
//                 <li key={item.id} className="border border-gray-200 p-4 rounded-md">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm text-gray-600">
//                       To {item.type === 'doctors' ? 'Doctor' : 'Patient'}: <strong>{item.recipient}</strong>
//                     </span>
//                     <span className="text-xs text-gray-400">{item.timestamp}</span>
//                   </div>
//                   <p className="text-gray-800">{item.message}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendNotification;