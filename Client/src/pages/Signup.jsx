import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { nav } from 'framer-motion/client';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const handleError = (error) => {
        if (error) {
            setTimeout(() => {
                setError("");

            }, 1500);
        }
    }
    const handleUserSignup = async (event) => {
        event.preventDefault();
        if (!name || !password || !email) {
            setError("All Fields are Required!!!");
            return;
        }
         fetch('http://localhost:5000/user/signup', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then((res) => res.json())
            .then((data) => {
                if (data.message === "User created successfully") {
                    setSuccess(true);
                    setTimeout(() => {
                        navigate("/signin");
                    }, 1500);
                    
                }
                else {
                    setError(data.message);
                }
            })
            .catch((error) => {
                throw new Error("Error in signup: " + error.message);
                
            });


    }

    return (
       // <div className='min-h-screen flex flex-col  bg-[#F6F1E7]'>
            
            <main className='flex-grow  '>
                <div >
                    {error && (
                        <div className='bg-[#e3b672] border-2 text-center font-serif text-base text-gray-700'>

                            {error}
                            {handleError(error)}



                        </div>)}
                </div>

                <div>
                    {success && (
                        <div className='bg-[#e3b672] border-2 text-center font-serif text-base text-gray-700'>

                            User Created Successfully!!!


                        </div>
                    )}
                </div>

                <div className='flex justify-center items-center  '>
                    <div className='  border-[4px] rounded-md border-[#1E3A8A] w-[65%] h-fit  mt-20 shadow-lg  flex' >
                        <div className="  w-[90%] bg-cover bg-center  "
                            style={{ backgroundImage: "url('/bg-box.png')" }}>

                        </div>

                        <form onSubmit={handleUserSignup}  >

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

                        </form >

                    </div>
                </div>
            </main>
            
        //</div>

    )
}

export default Signup


