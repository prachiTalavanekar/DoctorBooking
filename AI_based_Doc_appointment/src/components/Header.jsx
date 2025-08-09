import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center bg-[#037c6e] px-6 md:px-16 py-12 md:py-0 gap-8 overflow-hidden">
      {/* ---------- Left Side ----------- */}
      <div className="md:w-1/2 flex flex-col justify-center gap-6 text-center md:text-left py-10 md:py-[10vh] z-10">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
          Book Appointment <br />With Trusted Doctors
        </p>

        <div className="flex flex-col gap-3 items-center md:flex-row text-white text-sm font-light">
          <img src={assets.group_profiles} alt="Group" className="w-28" />
          <p className="text-white text-base md:text-lg">
            Easily explore our network of trusted doctors and <br className='hidden sm:block' />
            book your appointment in just a few clicks.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center justify-center md:justify-start gap-2 px-8 py-3 bg-white text-gray-700 text-sm font-medium rounded-md hover:scale-105 transition-transform duration-300 w-fit mx-auto md:mx-0"
        >
          Book Appointment
          <img src={assets.arrow_icon} alt="Arrow" className="w-3" />
        </a>
      </div>

      {/* ---------- Right Side ----------- */}
      <div className="md:w-1/2 relative h-[300px] md:h-auto md:min-h-[500px] flex items-end">
        <img
          className="w-full h-full object-cover md:absolute md:bottom-0 md:right-0 rounded-lg"
          src={assets.header_img1}
          alt="Header"
        />
      </div>
    </div>
  );
};

export default Header;

