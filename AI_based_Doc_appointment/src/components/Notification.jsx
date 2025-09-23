import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const Notification = () => {
  const { backendUrl, token } = useContext(AppContext)
  const [items, setItems] = useState([])

  const load = async () => {
    if (!token) return
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/notification/inbox`, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) setItems(data.notifications)
    } catch (e) {
      // silent
    }
  }

  const markRead = async (id) => {
    try {
      await axios.post(`${backendUrl}/api/user/notification/mark-read`, { notificationId: id }, { headers: { Authorization: `Bearer ${token}` } })
      setItems(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n))
      // Optionally refresh unread badge
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new Event('refresh-unread'))
      }
    } catch (e) {}
  }

  useEffect(() => { load() }, [token])

  return (
    <div className="bg-white rounded-md p-4 shadow">
      <h3 className="text-lg font-semibold mb-3">Notifications</h3>
      {items.length === 0 ? (
        <div className="text-sm text-gray-500">No notifications</div>
      ) : (
        <ul className="space-y-3">
          {items.map(n => (
            <li key={n._id} className="border rounded p-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{n.sentBy === 'doctor' ? "Doctor's Notification" : 'Admin Notification'}{n.docId?.name ? ` • ${n.docId.name}` : ''}</span>
                <span className="text-xs text-gray-400">{new Date(n.timestamp).toLocaleString()}</span>
              </div>
              <div className="mt-1 text-gray-800">{n.message}</div>
              {!n.isRead && (
                <button onClick={() => markRead(n._id)} className="mt-2 text-xs px-2 py-1 rounded bg-[#037c6e] text-white">Mark as read</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Notification