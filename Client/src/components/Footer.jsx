import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
      <>
   <nav className='w-full  h-14 px-50  flex  items-center shadow-lg '>
   <div className=''>
    <span >
        <img src="/logo.png" alt=""  className='h-14 object-contain'/>
    </span>
   </div>

   <div className=''>
  <p className="text-sm text-[#4a4a4a] font-sans text-center">
    © 2025 <span className="font-semibold">CampusSphere</span>. <br /> All rights reserved.
  </p>
</div>
   
   </nav> 
   </>
    </footer>
  )
}

export default Footer

