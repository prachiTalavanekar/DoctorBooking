import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  


  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          CONTACT <span className='font-medium' style={{ color: '#037c6e ' }}>US</span>
        </p>
      </div>

      <div className='flex my-10 flex-col justify-center md:flex-row gap-10 mb:28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
          <p className='text-gray-500'>
            416520 kudal , Sindhudurg ,<br/> Maharashtra
          </p>
          <p className='text-gray-500'>Tel : (415) 555-0132</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at MEDISYNC AI</p>
          <p className='text-gray-500'>Learn more about our team and job openings.</p>
          <button className='border boerder-black px-8 py-4 text-sm hover:bg-[#037c6e] hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact