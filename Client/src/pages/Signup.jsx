import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle } from 'lucide-react'; 

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        
        if (error || success) {
            const timer = setTimeout(() => {
                setError("");
                setSuccess(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleUserSignup = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        if (!name || !password || !email) {
            setError("All fields are required.");
            return;
        }

        setIsLoading(true); 

        
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        try {
            const res = await fetch(`${API_URL}/user/signup`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await res.json();

            if (res.ok && data.message === "User created successfully") {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/signin");
                }, 1500); 
            } else {
                
                setError(data.message || "An unknown error occurred.");
            }
        } catch (error) {
            
            console.error("Error in signup:", error);
            setError("Signup failed. Please check network or try again.");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <main className='flex-grow'>
            {/* Improved Error Message */}
            {error && (
                <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 text-center font-serif' role="alert">
                    <AlertCircle className="inline w-5 h-5 mr-2" />
                    {error}
                </div>
            )}

            {/* Improved Success Message */}
            {success && (
                <div className='bg-green-100 border-l-4 border-green-500 text-green-700 p-4 text-center font-serif' role="alert">
                    <CheckCircle className="inline w-5 h-5 mr-2" />
                    User Created Successfully! Redirecting...
                </div>
            )}

            <div className='flex justify-center items-center'>
                <div className='border-[4px] rounded-md border-[#1E3A8A] w-[65%] h-fit mt-20 shadow-lg flex'>
                    <div 
                        className="w-[90%] bg-cover bg-center"
                        style={{ backgroundImage: "url('/bg-box.png')" }}
                    >
                    </div>

                    <form onSubmit={handleUserSignup}>
                        <div className='bg-[#F6F1E7] border-2 border-l-[#e6c08b] p-4'>
                            <h1 className='mb-5 font-semibold font-serif text-[#1E3A8A] text-2xl text-center'>
                                Join <br />CampusSphere
                            </h1>
                            <div>
                                <input 
                                    className='border-[#e3b672] rounded-md border-2 m-2 px-2 py-1 focus:outline-none focus:border-[#1E3A8A]' 
                                    placeholder='Full Name' 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    type="text" 
                                />
                            </div>
                            <div>
                                <input 
                                    className='border-[#e3b672] rounded-md border-2 m-2 px-2 py-1 focus:outline-none focus:border-[#1E3A8A]' 
                                    placeholder='Email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="text" 
                                />
                            </div>
                            <div>
                                {/* --- 6. CRITICAL SECURITY FIX --- */}
                                <input 
                                    className='border-[#e3b672] rounded-md border-2 m-2 px-2 py-1 focus:outline-none focus:border-[#1E3A8A]' 
                                    placeholder='Password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password" 
                                />
                            </div>
                            <div className='flex justify-center'>
                                <button 
                                    className="bg-[#edc894] hover:bg-[#e6c08b] mt-2 text-white font-bold py-2 px-4 border-2 border-[#e3b672] rounded active:rounded-md disabled:opacity-50 disabled:cursor-not-allowed" 
                                    type="submit"
                                    disabled={isLoading} 
                                >
                                    {isLoading ? "Creating..." : "Create Account"}
                                </button>
                            </div>
                            <div>
                                <p className='mt-4 text-center text-gray-700 font-serif'>
                                    Already have an account? 
                                    <span 
                                        className='text-blue-600 cursor-pointer ml-1' 
                                        onClick={() => navigate("/signin")}
                                    >
                                        Sign In
                                    </span>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Signup;