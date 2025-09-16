import React, { useState } from 'react';

const SendNotification = () => {
  const [activeTab, setActiveTab] = useState('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [notificationText, setNotificationText] = useState('');
  const [notificationHistory, setNotificationHistory] = useState([]);

  const dummyDoctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Lee'];
  const dummyPatients = ['John Doe', 'Jane Smith', 'Alice Johnson'];

  const handleSearch = () => {
    const list = activeTab === 'doctors' ? dummyDoctors : dummyPatients;
    const found = list.find(name => name.toLowerCase().includes(searchQuery.toLowerCase()));
    setSelectedUser(found || null);
  };

  const handleSendNotification = () => {
    if (selectedUser && notificationText.trim()) {
      const newNotification = {
        id: Date.now(),
        recipient: selectedUser,
        type: activeTab,
        message: notificationText,
        timestamp: new Date().toLocaleString(),
      };

      setNotificationHistory([newNotification, ...notificationHistory]);
      setSearchQuery('');
      setSelectedUser(null);
      setNotificationText('');
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
                  setSelectedUser(null);
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
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-[#037c6e] text-white rounded-md hover:bg-[#02665d] transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* Notification Input */}
          {selectedUser && (
            <div className="mt-4">
              <p className="mb-2 text-sm text-gray-600">
                Selected {activeTab === 'doctors' ? 'Doctor' : 'Patient'}: <strong>{selectedUser}</strong>
              </p>
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
          )}
        </div>

        {/* Right: Notification History */}
        <div className="flex-1 bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#037c6e]">Notification History</h2>

          {notificationHistory.length === 0 ? (
            <p className="text-gray-500">No notifications sent yet.</p>
          ) : (
            <ul className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {notificationHistory.map((item) => (
                <li key={item.id} className="border border-gray-200 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      {item.type === 'doctors' ? 'Doctor' : 'Patient'}: <strong>{item.recipient}</strong>
                    </span>
                    <span className="text-xs text-gray-400">{item.timestamp}</span>
                  </div>
                  <p className="text-gray-800">{item.message}</p>
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
