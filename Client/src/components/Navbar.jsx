import React, { use, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {logout} from '../pages/Home.jsx'

const Navbar = () => {
  const[active,setActive] = React.useState(false);
  useEffect(() => {
    const userActive= localStorage.getItem("data.token");
    
    if(userActive){
      setActive(true);
    }else{
      setActive(false);
    }
  }, []);
  return (
   <>
   <footer className='w-full h-14   bg-opacity-0 mt-0 flex justify-between items-center shadow-md px-72'>

      <div className='font-serif font-semibold text-[#c89c5d] text-xl'><span>CampusSphere</span></div>
   <div >

   <Link className='px-2 active:shadow-sm font-serif font-medium text-base cursor-pointer text-[#1E3A8A] hover:text-[#c89c5d] duration-200'   to="/">Home</Link>
   
   {!active===true &&
    (<Link className='px-2 active:shadow-sm font-serif font-medium text-base cursor-pointer text-[#1E3A8A] hover:text-[#c89c5d] duration-200'   to="/Signin">Access Account</Link>)
   }
   {!active===true &&(
    <Link className='px-2 active:shadow-sm font-serif font-medium text-base cursor-pointer text-[#1E3A8A] hover:text-[#c89c5d] duration-200'   to="/Signup">Create Account</Link>)
   }
   <Link className='px-2 active:shadow-sm font-serif font-medium text-base cursor-pointer text-[#1E3A8A] hover:text-[#c89c5d] duration-200'   to="/About">About</Link>
   <Link className='px-2 active:shadow-sm font-serif font-medium text-base cursor-pointer text-[#1E3A8A] hover:text-[#c89c5d] duration-200'   to="/Contacts">Contacts</Link>
    {active===true &&(
    <Link className='px-2 active:shadow-sm font-serif font-medium text-base cursor-pointer text-[#1E3A8A] hover:text-[#c89c5d] duration-200'   onClick={() => logout()}>Logout</Link>
    )}
   </div>
    

   </footer>
   </>
  )
}

export default Navbar
