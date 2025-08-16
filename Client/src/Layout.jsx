import React from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

const layout = () => {
   const location = useLocation();
   const isHomePage = location.pathname === '/';
  return (
    <div className='min-h-screen flex flex-col  bg-[#F6F1E7]'>
    {!isHomePage && <Navbar />}
    <Outlet />
    {!isHomePage && <Footer />}
    </div>
  )
}

export default layout
