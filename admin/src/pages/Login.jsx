import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const { setAToken, backendUrl } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          console.log(data.token)
        } else{
          toast.error(data.message)
        }

      } else {
        console.error("Login error:");
      }
    } catch (error) {
      // error handling code might be here
      console.error("Login error:", error);
    }

  }



  return (
    <form onSubmit={onSubmitHandler} className='h-screen flex items-center justify-center bg-white'>
      <div style={{ border: '2px solid rgb(47, 181, 165)' }} className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg '>
        <p className="text-2xl font-semibold m-auto"
        ><span className='text-[rgb(47, 181, 165)]' style={{ color: '#037c6e' }}>{state}</span> Login</p>

        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email}
            className="outline-none border border-zinc-300 rounded w-full p-2 mt-1 hover:border-[#037c6e]"
            type="email" required />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password}
            className="outline-none border border-zinc-300 rounded w-full p-2 mt-1 hover:border-[#037c6e]"
            type="password" required />
        </div>

        <button className="cursor-pointer bg-[#037c6e] text-white w-full py-2 rounded-md text-base"
        >Login</button>
        {
          state === 'Admin'
            ? <p>Doctor Login? <span className="text-[#037c6e] underline cursor-pointer"
              onClick={() => setState('Doctor')}
            >Click here</span></p>
            : <p>Admin Login? <span className="text-[#037c6e] underline cursor-pointer" onClick={() => setState('Admin')}
            >Click here</span></p>
        }

      </div>

    </form>
  )
}

export default Login


// import React, { useContext, useState } from 'react';
// import { AdminContext } from '../context/AdminContext';
// import axios from 'axios';

// const Login = () => {
//   const [state, setState] = useState('Admin');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const { setAToken, backendUrl } = useContext(AdminContext);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       if (state === 'Admin') {
//         const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

//         if (data.success) {
//           console.log(data.token);
//           setAToken(data.token);  // Save token in context
//         }
//       } else {
//         // Handle other user states like 'Doctor' here
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       // You can also set error state here to display a message to the user
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className='h-screen flex items-center justify-center bg-white'>
//       <div
//         style={{ border: '2px solid rgb(47, 181, 165)' }}
//         className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg '
//       >
//         <p className="text-2xl font-semibold m-auto">
//           <span className='text-[rgb(47, 181, 165)]' style={{ color: '#037c6e' }}>{state}</span> Login
//         </p>

//         <div className='w-full'>
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}  // Changed to onChange
//             value={email}
//             className="outline-none border border-zinc-300 rounded w-full p-2 mt-1 hover:border-[#037c6e]"
//             type="email"
//             required
//           />
//         </div>

//         <div className='w-full'>
//           <p>Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}  // Changed to onChange
//             value={password}
//             className="outline-none border border-zinc-300 rounded w-full p-2 mt-1 hover:border-[#037c6e]"
//             type="password"
//             required
//           />
//         </div>

//         <button
//           className="cursor-pointer bg-[#037c6e] text-white w-full py-2 rounded-md text-base"
//         >
//           Login
//         </button>

//         {
//           state === 'Admin' ? (
//             <p>
//               Doctor Login?{' '}
//               <span
//                 className="text-[#037c6e] underline cursor-pointer"
//                 onClick={() => setState('Doctor')}
//               >
//                 Click here
//               </span>
//             </p>
//           ) : (
//             <p>
//               Admin Login?{' '}
//               <span
//                 className="text-[#037c6e] underline cursor-pointer"
//                 onClick={() => setState('Admin')}
//               >
//                 Click here
//               </span>
//             </p>
//           )
//         }
//       </div>
//     </form>
//   );
// };

// export default Login;
