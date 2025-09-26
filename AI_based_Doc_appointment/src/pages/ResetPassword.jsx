import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext)
  const q = useQuery()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const email = q.get('email') || ''
  const token = q.get('token') || ''

  useEffect(() => {
    if (!email || !token) {
      toast.error('Invalid reset link')
      navigate('/login')
    }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (password !== confirm) return toast.error('Passwords do not match')
    try {
      setLoading(true)
      const { data } = await axios.post(backendUrl + '/api/user/reset-password', { email, token, password })
      if (data.success) {
        toast.success('Password reset successful. Please login.')
        navigate('/login')
      } else toast.error(data.message)
    } catch (e1) {
      toast.error(e1.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <form onSubmit={submit} className='w-full max-w-md bg-white p-6 rounded-xl shadow'>
        <h2 className='text-2xl font-semibold mb-4'>Reset Password</h2>
        <input type='password' value={password} onChange={e=>setPassword(e.target.value)} required placeholder='New password'
          className='w-full border rounded px-3 py-2 mb-3'/>
        <input type='password' value={confirm} onChange={e=>setConfirm(e.target.value)} required placeholder='Confirm password'
          className='w-full border rounded px-3 py-2 mb-4'/>
        <button disabled={loading} className='w-full bg-[#037c6e] text-white rounded px-3 py-2'>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword


