import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center gap-4 mb-16 bt-12 text-gray-900 md:mx-10'>
      {/* Title Section */}
      <h1 className='text-3xl font-medium text-center'>
        <span style={{ color: '#037c6e' }}>Top Doctors</span> to Book
      </h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors
      </p>

      {/* Doctor Cards Grid */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0, 5).map((item, index) => (
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
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => navigate('/doctors')}
        className='mt-8 px-6 py-2 bg-[#037c6e] text-white rounded-md font-medium hover:bg-[#026358] transition'
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
