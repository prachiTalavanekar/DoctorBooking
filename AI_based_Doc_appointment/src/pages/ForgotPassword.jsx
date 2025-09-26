import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const { backendUrl } = useContext(AppContext)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      console.log('POST', backendUrl + '/api/user/forgot-password', { email })
      const { data } = await axios.post(backendUrl + '/api/user/forgot-password', { email })
      if (data.success) toast.success(data.message)
      else toast.error(data.message)
    } catch (e1) {
      toast.error(e1.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <form onSubmit={submit} className='w-full max-w-md bg-white p-6 rounded-xl shadow'>
        <h2 className='text-2xl font-semibold mb-4'>Forgot Password</h2>
        <p className='text-sm text-gray-600 mb-4'>Enter your email to receive a reset link.</p>
        <input type='email' value={email} onChange={e=>setEmail(e.target.value)} required placeholder='Email'
          className='w-full border rounded px-3 py-2 mb-4'/>
        <button disabled={loading} className='w-full bg-[#037c6e] text-white rounded px-3 py-2'>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword


