import React from 'react'

const Card = () => {
  return (
<div className='bg-[#F6F1E7]  border-2 border-l-[#e6c08b]  p-8 '>
                                <h1 className='mb-5 font-semibold font-serif text-[#1E3A8A] text-2xl text-center '>Join   <br />CampusSphere</h1>
                                <div>

                                    <input className='border-[#e3b672] rounded-md border-2 m-2 px-2 py-1 focus:outline-none focus:border-[#1E3A8A]' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} type="text" />
                                </div>
                                <div>

                                    <input className='border-[#e3b672] rounded-md border-2 m-2 px-2 py-1 focus:outline-none focus:border-[#1E3A8A]' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                                </div>
                                <div>

                                    <input className='border-[#e3b672] rounded-md border-2 m-2 px-2 py-1 focus:outline-none focus:border-[#1E3A8A]' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                                </div>
                                <div className='flex justify-center'>
                                    <button className="bg-[#edc894]  hover:bg-[#e6c08b] mt-2 text-white font-bold py-2 px-4 border-2 border-[#e3b672] rounded active:rounded-md" type="submit" button>Create Account</button>
                                </div>
                            </div>
  )
}

export default Card
