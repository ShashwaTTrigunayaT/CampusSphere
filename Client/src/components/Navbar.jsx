import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [active, setActive] = useState(false);

  const logout = () => {
    localStorage.clear();
    setActive(false);
    navigate("/signin");
  };

  useEffect(() => {
    const userActive = localStorage.getItem("data.token");
    setActive(!!userActive);
  }, [location]); 

  
  return (
    <nav className='w-full h-14 flex justify-between items-center shadow-md px-72 font-serif'>
      <div className='font-serif font-bold text-[#c89c5d] text-xl'>CampusSphere</div>
      <div>
        <Link className='px-2 text-[#1E3A8A] hover:text-[#c89c5d]' to="/">Home</Link>
        {!active && (
          <>
            <Link className='px-2 text-[#1E3A8A] hover:text-[#c89c5d]' to="/signin">Access Account</Link>
            <Link className='px-2 text-[#1E3A8A] hover:text-[#c89c5d]' to="/signup">Create Account</Link>
          </>
        )}
        {active && (
          <Link className='px-2 text-[#1E3A8A] hover:text-[#c89c5d]' to="/profile">Dashboard</Link>
        )}
        <Link className='px-2 text-[#1E3A8A] hover:text-[#c89c5d]' to="/about">About</Link>
        <Link className='px-2 text-[#1E3A8A] hover:text-[#c89c5d]' to="/contacts">Contact</Link>
        {active && (
          <button onClick={logout} className='px-2 text-[#1E3A8A] hover:text-[#c89c5d]'>Logout</button>
        )}
      </div>
    </nav> 
  );
};

export default Navbar;