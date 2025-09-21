import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate=useNavigate();
    
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
    const handleUserSignin = (event) => {
        event.preventDefault();
        if (!password || !email) {
            setError("All Fields are Required!!!");
            return;
        }
        fetch('http://localhost:5000/user/signin', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
               
                email,
                password
            }),
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                
                

                if(data.message==="Login successful"){
                    localStorage.setItem("data.token", data.token);
                    localStorage.setItem("data.name", data.name);
                    localStorage.setItem("data.profileImageURL", data.profileImageURL);
                    localStorage.setItem("data.email", data.email);
                    
                    navigate("/");
                }
                else if(data.error){
                    setError(data.error);
                }
            })
            .catch((error) => { throw new Error("Error in signup: " + error.message) })





    }

    return (
        
            
            <main className='flex-grow'>
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

                        <form onSubmit={handleUserSignin}  >
                            <div className='bg-[#F6F1E7]  border-2 border-l-[#e6c08b]  p-8 '>
                                <h1 className='mb-5 font-semibold font-serif text-[#1E3A8A] text-2xl text-center '>Access  <br />Account</h1>
                                
                                <div>

                                    <input className='border-[#e3b672] rounded-md border-2 m-2 px-2 py-1 focus:outline-none focus:border-[#1E3A8A]' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                                </div>
                                <div>

                                    <input className='border-[#e3b672] rounded-md border-2 m-2 px-2 py-1 focus:outline-none focus:border-[#1E3A8A]' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                                </div>
                                <div className='flex justify-center'>
                                    <button className="bg-[#edc894]  hover:bg-[#e6c08b] mt-2 text-white font-bold py-2 px-4 border-2 border-[#e3b672] rounded active:rounded-md" type="submit" button>Access Account</button>
                                </div>
                            </div>

                        </form >

                    </div>
                </div>
            </main>

        

    )
}

export default Signin


