import React from 'react';

const TabButton = ({ label, isActive, onClick }) => {
  return (

        <button
      onClick={onClick}
      className={`px-10 py-8  font-semibold  text-xl  ml-16 mt-40 font-serif rounded-full 

        ${isActive ? 'bg-[#edc894] text-[#1E3A8A] ' : 'bg-white text-gray-600'}
        focus:outline-none focus:ring-4 font focus:ring-[#1E3A8A]`}
    >
      {label}
    </button>
    
  );
};

export default TabButton;