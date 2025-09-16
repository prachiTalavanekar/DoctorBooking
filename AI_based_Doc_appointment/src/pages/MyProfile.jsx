// import React, { useState } from 'react'
// import { assets } from '../assets/assets'

// const MyProfile = () => {

//   const [userData, setUserData] = useState({
//     name: 'Prachi Talavanekar',
//     image: assets.profile_pic,
//     email: 'prachitalavanekar29@gmail.com',
//     phone: '+91 9422509340',
//     address: {
//       line1: 'Pinguli Dhuri Temb Nagar',
//       line2: 'Tal-Kudal,Dist-Sindhudurg'
//     },
//     gender: 'Female',
//     dob: '2005-01-31'
//   })

//   const [isEdit, setIsEdit] = useState(false)

//   return (
//     <div className='max-w-lg flex flex-col gap-2 text-sm'>

//       <img className='w-36 rounded' src={userData.image} alt="" />
//       {
//         isEdit
//           ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4  outline-[#037c6e] ' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
//           : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
//       }

//       <hr className='bg-zinc-400 h-[-1px] border-none' />
//       <div>
//         <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
//         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//           <p className='font-medium'>Email id:</p>
//           <p className='text-blue-500'>{userData.email}</p>
//           <p className='font-medium'>Phone:</p>
//           {
//             isEdit
//               ? <input className='bg-gray-100 max-w-52 outline-[#037c6e]' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
//               : <p className='text-blue-400'>{userData.phone}</p>
//           }
//           <p className='font-medium'>Address:</p>
//           {
//             isEdit
//               ? <p>
//                 <input className='bg-gray-50 outline-[#037c6e]' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
//                 <br />
//                 <input className='bg-gray-50 outline-[#037c6e]' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
//               </p>
//               : <p className='text-gray-500'>
//                 {userData.address.line1}
//                 <br />
//                 {userData.address.line2}
//               </p>
//           }
//         </div>
//       </div>

//       <div>
//         <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
//         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//           <p className='font-medium'>
//             Gender:
//           </p>
//           {
//             isEdit
//               ? <select className='max-w-20 bg-gray-100 outline-[#037c6e]' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//               : <p className='text-gray-400'>{userData.gender}</p>
//           }

//           <p className='font-medium'>Birthday:</p>
//           {
//             isEdit
//               ? <input className='max-w-28 bg-gray-100 outline-[#037c6e]' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
//               : <p className='text-gray-400'>{userData.dob}</p>
//           }
//         </div>
//       </div>

//           <div className='mt-10'>
//             {
//             isEdit
//             ? <button className='border border-[#037c6e] px-8 py-2 rounded-full hover:bg-[#037c6e] hover:text-white transition-all' onClick={() =>setIsEdit(false)}>Save information</button>
//             : <button className='border border-[#037c6e] px-8 py-2 rounded-full hover:bg-[#037c6e] hover:text-white transition-all' onClick={() =>setIsEdit(true)}>Edit</button>
//             }
//           </div>

//     </div>
//   )
// }

// export default MyProfile

// // #037c6e



// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import { useContext } from 'react'
// import { AppContext } from '../context/AppContext'
// import { toast } from 'react-toastify'
// import axios from 'axios';



// const MyProfile = () => {
//   // const [userData, setUserData] = useState({
//   //   name: 'Prachi Talavanekar',
//   //   image: assets.profile_pic,
//   //   email: 'prachitalavanekar29@gmail.com',
//   //   phone: '+91 9422509340',
//   //   address: {
//   //     line1: 'Pinguli Dhuri Temb Nagar',
//   //     line2: 'Tal-Kudal,Dist-Sindhudurg'
//   //   },
//   //   gender: 'Female',
//   //   dob: '2005-01-31'
//   // })

//   const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

//   const [isEdit, setIsEdit] = useState(false)
//   const [image, setImage] = useState(false);
//   const [loading, setLoading] = useState(false);


//   // const updateUserProfileData = async () => {
//   //   try {
//   //     const formData = new FormData()


//   //     formData.append('name',userData.name)
//   //     formData.append('phone',userData.phone)
//   //     formData.append('address',JSON.stringify(userData.address))
//   //     formData.append('gender',userData.gender)
//   //     formData.append('dob',userData.dob)

//   //     image && formData.append('image',image)

//   //     const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,
//   //       {   headers: { Authorization: `Bearer ${token}` }})


//   //     if (data.success) {
//   //       toast.success(data.message)
//   //       await loadUserProfileData()
//   //       setIsEdit(false)
//   //       setImage(false)
//   //     } else{
//   //       toast.error(data.message)
//   //     }

//   //   } catch (error) {
//   //     toast.error(error.message)
//   //     console.log(error)
      
//   //   }
//   // }

//   const handleProfileUpdate = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("phone", form.phone);
//     formData.append("gender", form.gender);
//     formData.append("dob", form.dob);
//     formData.append("address", JSON.stringify(form.address));

//     if (image) {
//       formData.append("image", image);
//     }

//     const response = await axios.post("/api/user/update-profile", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.data.success) {
//       toast.success("Profile updated successfully");
//       await loadUserProfileData(); // Refresh local state from server
//       setEditMode(false);
//     } else {
//       toast.error(response.data.message || "Update failed");
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };



//   return userData && (
//     <div className="max-w-3xl w-full mx-auto bg-white shadow-md rounded-2xl px-6 py-8 space-y-6 border border-gray-100">

//       {/* Profile Header */}
//       <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
//         {/* <img src={userData.image} alt="profile" className="w-24 h-24 rounded-full object-cover" /> */}

//         {
//           isEdit
//             ? <label htmlFor="image">
//               <div className='inline-block relative cursor-pointer'>
//                 <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
//                 <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />

//               </div>
//               <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
//             </label>
//             : <img className="w-36 rounded" src={userData.image} alt="" />
//         }

//         {
//           isEdit
//             ? <input
//               type="text"
//               value={userData.name}
//               onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
//               className="text-2xl font-semibold text-gray-800 bg-gray-50 px-3 py-1 rounded-md outline-[#037c6e] w-full sm:w-auto"
//             />
//             : <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">{userData.name}</h2>
//         }
//       </div>

//       <hr className="border-t border-dashed border-gray-300" />

//       {/* Contact Info */}
//       <div>
//         <h3 className="text-[#037c6e] font-semibold mb-3">Contact Information</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-4 text-sm text-gray-700">
//           <p className="font-medium">Email:</p>
//           <p className="text-blue-600 break-words">{userData.email}</p>

//           <p className="font-medium">Phone:</p>
//           {
//             isEdit
//               ? <input
//                 type="text"
//                 value={userData.phone}
//                 onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
//                 className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full sm:w-60"
//               />
//               : <p className="text-blue-500">{userData.phone}</p>
//           }

//           <p className="font-medium">Address:</p>
//           {
//             isEdit
//               ? <div className="space-y-2 w-full">
//                 <input
//                   value={userData.address.line1}
//                   onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
//                   className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full"
//                 />
//                 <input
//                   value={userData.address.line2}
//                   onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
//                   className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full"
//                 />
//               </div>
//               : <p className="text-gray-600 whitespace-pre-line">
//                 {userData.address.line1}
//                 <br />
//                 {userData.address.line2}
//               </p>
//           }
//         </div>
//       </div>

//       {/* Basic Info */}
//       <div>
//         <h3 className="text-[#037c6e] font-semibold mb-3">Basic Information</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-4 text-sm text-gray-700">
//           <p className="font-medium">Gender:</p>
//           {
//             isEdit
//               ? <select
//                 value={userData.gender}
//                 onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
//                 className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full sm:w-40"
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//               : <p className="text-gray-600">{userData.gender}</p>
//           }

//           <p className="font-medium">Birthday:</p>
//           {
//             isEdit
//               ? <input
//                 type="date"
//                 value={userData.dob}
//                 onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
//                 className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full sm:w-40"
//               />
//               : <p className="text-gray-600">{userData.dob}</p>
//           }
//         </div>
//       </div>

//       {/* Edit Button */}
//       <div className="text-center pt-4">
//         <button
//           onClick={handleProfileUpdate}
//           className="px-8 py-2 text-sm font-medium rounded-full border border-[#037c6e] text-[#037c6e] hover:bg-[#037c6e] hover:text-white transition-all"
//         >
//           Save information
//         </button>
//          <button
//           onClick={() => setIsEdit(true)}
//           className="px-8 py-2 text-sm font-medium rounded-full border border-[#037c6e] text-[#037c6e] hover:bg-[#037c6e] hover:text-white transition-all"
//         >
//           Edit
//         </button>
//       </div>
//     </div>
//   )
// }

// export default MyProfile



import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null); // Track image file
  const [loading, setLoading] = useState(false);

  // Initialize the form state using userData values
  const [form, setForm] = useState({
    name: userData?.name || '',
    phone: userData?.phone || '',
    gender: userData?.gender || '',
    dob: userData?.dob || '',
    address: userData?.address || { line1: '', line2: '' },
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before sending the request

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('phone', form.phone);
    formData.append('gender', form.gender);
    formData.append('dob', form.dob);  // Send the dob in yyyy-MM-dd format
    formData.append('address', JSON.stringify(form.address));

    if (image) formData.append('image', image);

    try {
      const response = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success('Profile updated successfully');
        await loadUserProfileData(); // Refresh local state from server
        setIsEdit(false); // Set edit mode off after success
      } else {
        toast.error(response.data.message || 'Profile update failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false); // Set loading to false once the request is completed
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      address: {
        ...prevForm.address,
        [name]: value,
      },
    }));
  };

  return userData && (
    <div className="max-w-3xl w-full mx-auto bg-white shadow-md rounded-2xl px-6 py-8 space-y-6 border border-gray-100">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded"
                src={image ? URL.createObjectURL(image) : userData.image || '/path/to/default-image.jpg'}
                alt="Profile"
              />
              <img className="w-10 absolute bottom-12 right-12" src={assets.upload_icon} alt="Upload Icon" />
            </div>
            <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} hidden />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="Profile" />
        )}

        {isEdit ? (
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="text-2xl font-semibold text-gray-800 bg-gray-50 px-3 py-1 rounded-md outline-[#037c6e] w-full sm:w-auto"
          />
        ) : (
          <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">{userData.name}</h2>
        )}
      </div>

      <hr className="border-t border-dashed border-gray-300" />

      {/* Contact Info */}
      <div>
        <h3 className="text-[#037c6e] font-semibold mb-3">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-4 text-sm text-gray-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-600 break-words">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full sm:w-60"
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="space-y-2 w-full">
              <input
                name="line1"
                value={form.address.line1}
                onChange={handleAddressChange}
                className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full"
              />
              <input
                name="line2"
                value={form.address.line2}
                onChange={handleAddressChange}
                className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full"
              />
            </div>
          ) : (
            <p className="text-gray-600 whitespace-pre-line">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <h3 className="text-[#037c6e] font-semibold mb-3">Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-4 text-sm text-gray-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full sm:w-40"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-600">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              name="dob"
              value={form.dob || ""}
              onChange={handleChange}
              className="bg-gray-100 px-2 py-1 rounded-md outline-[#037c6e] w-full sm:w-40"
            />
          ) : (
            <p className="text-gray-600">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Edit Button */}
      <div className="text-center pt-4">
        {isEdit ? (
          <button
            onClick={handleProfileUpdate}
            className="px-8 py-2 text-sm font-medium rounded-full border border-[#037c6e] text-[#037c6e] hover:bg-[#037c6e] hover:text-white transition-all"
          >
            Save information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-8 py-2 text-sm font-medium rounded-full border border-[#037c6e] text-[#037c6e] hover:bg-[#037c6e] hover:text-white transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

