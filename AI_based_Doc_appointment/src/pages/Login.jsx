import React, { useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)


  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email });
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else{
        
      }

    } catch (error) {

    }

  }
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[70vh] flex items-center' action="">
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border  border-[#037c6e] rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "Sign up" : "log in"} to book appointment</p>
        {
          state === 'Sign Up' && <div className='w-full'>
            <p>Full Name</p>
            <input className='outline-none border border-zinc-300 rounded w-full p-2 mt-1 hover:border-[#037c6e]' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        }

        <div className='w-full'>
          <p>Email</p>
          <input className='outline-none border border-zinc-300 rounded w-full p-2 mt-1 hover:border-[#037c6e]' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='outline-none border border-zinc-300 rounded w-full p-2 mt-1 hover:border-[#037c6e]' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className='bg-[#037c6e] text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === 'Sign Up'
            ? <p>Already have an Account ? <span onClick={() => setState('Login')} className='text-[#037c6e] underline cursor-pointer'>Login here</span></p>
            : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-[#037c6e] underline cursor-pointer'>click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login



// #037c6e