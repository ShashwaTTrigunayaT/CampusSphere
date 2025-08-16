import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <>
   <footer className='w-full h-14   bg-opacity-0 mt-0 flex justify-between items-center shadow-md px-72'>

      <div className='font-serif font-semibold text-[#c89c5d] text-xl'><span>CampusSphere</span></div>
   <div >

   <Link className='px-2 active:shadow-sm font-serif font-semibold text-base cursor-pointer text-[#1E3A8A] hover:text-[#c89c5d] duration-200'   to="/">Home</Link>
   <Link className='px-2 active:shadow-sm font-serif font-semibold text-base cursor-pointer text-[#1E3A8A] hover:text-[#c89c5d] duration-200'   to="/Signin">Access Account</Link>
   <Link className='px-2 active:shadow-sm font-serif font-semibold text-base cursor-pointer text-[#1E3A8A] hover:text-[#c89c5d] duration-200'   to="/Signup">Create Account</Link>
   <Link className='px-2 active:shadow-sm font-serif font-semibold text-base cursor-pointer text-[#1E3A8A] hover:text-[#c89c5d] duration-200'   to="#">About</Link>
   <Link className='px-2 active:shadow-sm font-serif font-semibold text-base cursor-pointer text-[#1E3A8A] hover:text-[#c89c5d] duration-200'   to="#">Contacts</Link>

   </div>
    

   </footer>
   </>
  )
}

export default Navbar
