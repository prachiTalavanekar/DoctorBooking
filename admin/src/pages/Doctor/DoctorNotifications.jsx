import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorNotifications = () => {
  const { getNotificationRecipients, sendDoctorNotification, getDoctorInbox, markDoctorNotificationRead, getDoctorSent } = useContext(DoctorContext)
  const [recipients, setRecipients] = useState([])
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [message, setMessage] = useState('')
  const [inbox, setInbox] = useState([])
  const [sent, setSent] = useState([])

  const load = async () => {
    const r = await getNotificationRecipients()
    setRecipients(r)
    const [i, s] = await Promise.all([getDoctorInbox(), getDoctorSent()])
    setInbox(i)
    setSent(s)
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    if (!search) return recipients
    const q = search.toLowerCase()
    return recipients.filter(r => r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q))
  }, [recipients, search])

  const toggle = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const send = async () => {
    if (!message.trim() || selectedIds.length === 0) return
    const ok = await sendDoctorNotification({ userIds: selectedIds, message: message.trim() })
    if (ok) {
      setMessage('')
      setSelectedIds([])
      const [i, s] = await Promise.all([getDoctorInbox(), getDoctorSent()])
      setInbox(i)
      setSent(s)
    }
  }

  const markRead = async (id) => {
    const ok = await markDoctorNotificationRead(id)
    if (ok) setInbox(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n))
  }

  return (
    <div className="w-full min-h-[70vh] bg-gray-50 p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-md shadow p-4">
          <h2 className="text-xl font-semibold text-[#037c6e] mb-3">Notify Your Patients</h2>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients" className="w-full border rounded px-3 py-2 mb-3" />
          <div className="border rounded max-h-60 overflow-y-auto">
            {filtered.map(u => (
              <label key={u._id} className="flex items-center gap-3 p-2 border-b last:border-b-0">
                <input type="checkbox" checked={selectedIds.includes(u._id)} onChange={() => toggle(u._id)} />
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-gray-500">{u.email}</div>
                </div>
              </label>
            ))}
            {filtered.length === 0 && <div className="p-3 text-sm text-gray-500">No patients</div>}
          </div>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} className="w-full border rounded px-3 py-2 mt-3" placeholder="Type your message" />
          <button onClick={send} className="mt-3 px-4 py-2 bg-[#037c6e] text-white rounded">Send</button>
        </div>

        <div className="bg-white rounded-md shadow p-4">
          <h2 className="text-xl font-semibold text-[#037c6e] mb-3">Inbox</h2>
          {inbox.length === 0 ? (
            <div className="text-sm text-gray-500">No notifications</div>
          ) : (
            <ul className="space-y-3 max-h-[70vh] overflow-y-auto">
              {inbox.map(n => (
                <li key={n._id} className="border rounded p-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>From: {n.sentBy === 'admin' ? 'Admin' : n.userId?.name || 'System'}</span>
                    <span className="text-xs text-gray-400">{new Date(n.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="mt-1">{n.message}</div>
                  {!n.isRead && <button onClick={() => markRead(n._id)} className="mt-2 text-xs px-2 py-1 rounded bg-[#037c6e] text-white">Mark as read</button>}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-md shadow p-4">
          <h2 className="text-xl font-semibold text-[#037c6e] mb-3">Sent</h2>
          {sent.length === 0 ? (
            <div className="text-sm text-gray-500">No sent notifications</div>
          ) : (
            <ul className="space-y-3 max-h-[70vh] overflow-y-auto">
              {sent.map(n => (
                <li key={n._id} className="border rounded p-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>To: {n.userId?.name || 'Patient'}</span>
                    <span className="text-xs text-gray-400">{new Date(n.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="mt-1">{n.message}</div>
                  <div className="mt-2 text-xs">
                    Status: <span className={n.isRead ? 'text-green-700' : 'text-gray-600'}>{n.isRead ? 'Read' : 'Unread'}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorNotifications



