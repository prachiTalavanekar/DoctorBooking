import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { doctors } from '../assets/assets';


const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const { Doctors } = useContext(AppContext)
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const applyfilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyfilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#037c6e] text-white' : ' '}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-60 ${showFilter ? 'flex' : 'hidden sm:flex'} transition-all`}>
          <p onClick={()=>speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-[#e3fcf3]  text-black" : ""}`}>General physician</p>
          <p onClick={()=>speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-[#e3fcf3]  text-black" : ""}`}>Gynecologist</p>
          <p onClick={()=>speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-[#e3fcf3]  text-black" : ""}`}>Dermatologist</p>
          <p onClick={()=>speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-[#e3fcf3]  text-black" : ""}`}>Pediatricians</p>
          <p onClick={()=>speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-[#e3fcf3]  text-black" : ""}`}>Neurologist</p>
          <p onClick={()=>speciality === 'Gastroenterolist' ? navigate('/doctors') : navigate('/doctors/Gastroenterolist')} className={`w-[98vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterolist" ? "bg-[#e3fcf3]  text-black" : ""}`}>Gastroenterolist</p>
        </div>
<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                key={index}
                className='rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-md'
                style={{ border: '1px solid rgb(47, 181, 165)' }}
              >
                {/* Image Section with Background and Padding */}
                <div
                  className='w-full h-48 flex items-center justify-center'
                  style={{ backgroundColor: '#e3fcf3' }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className='h-full object-contain p-1'
                  />
                </div>

                {/* Doctor Info */}
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-green-700 mb-2'>
                    <span className='w-2 h-2 bg-green-600 rounded-full'></span>
                    <span>Available</span>
                  </div>
                  <p className='font-semibold text-gray-800'>{item.name}</p>
                  <p className='text-sm text-gray-700'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors



