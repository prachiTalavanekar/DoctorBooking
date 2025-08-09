import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          ABOUT <span className='font-medium' style={{ color: '#037c6e ' }}>US</span>
        </p>
      </div>

      <div className='flex my-10 flex-col md:flex-row gap-12 '>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Our <span style={{ color: '#037c6e ' }}>MEDISYNC AI</span> streamlines the process of booking medical appointments online. We aim to connect patients with trusted healthcare professionals quickly and efficiently.
            The platform minimizes manual effort and ensures timely access to care. It bridges the gap between patients and healthcare providers with ease.          </p>
          <p>With user-friendly features, patients can easily search, schedule, and manage appointments. The system also allows doctors to organize consultations and track patient visits.
            Automated notifications keep users updated about their appointments. Secure data handling ensures privacy and reliability for all users.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision is to revolutionize healthcare access through seamless digital appointments.
            We aim to empower patients with timely and convenient medical care.
            By fostering efficient doctor-patient interactions, we reduce delays and improve outcomes.
            We envision a future where healthcare is just a few clicks away for everyone.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>
          WHY <span style={{ color: '#037c6e ' }}>CHOOSE US</span>
        </p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#7dd1b3] hover:text-gray-700 transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency :</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#7dd1b3] hover:text-gray-700 transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience :</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#7dd1b3] hover:text-gray-700 transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization :</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About