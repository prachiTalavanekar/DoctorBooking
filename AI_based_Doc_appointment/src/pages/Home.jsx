import React from 'react'
import Header from '../components/Header'
// import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import ChatbotIcon from '../components/ChatbotIcon.jsx'
import OurServices from '../components/OurServices.jsx'
import FAQ from '../components/FAQ.jsx'

const Home = () => {
  return (
    <div>
      <ChatbotIcon />
      <Header />
      <OurServices />
    {/* <SpecialityMenu /> */}
    <TopDoctors />
    <Banner />
    <FAQ />
    </div>
  )
}

export default Home