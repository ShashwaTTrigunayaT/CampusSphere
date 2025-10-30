import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react'; 

const Signin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        
        if (error) {
            const timer = setTimeout(() => setError(""), 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleUserSignin = (event) => {
        event.preventDefault();
        setError(""); 
        
        if (!password || !email) {
            setError("All fields are required.");
            return;
        }

        setIsLoading(true); 

        
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        fetch(`${API_URL}/user/signin`, {
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
        .then((res) => {
            if (!res.ok) {
                throw new Error('Server responded with an error'); 
            }
            return res.json();
        })
        .then((data) => {
            if (data.message === "Login successful") {
                
                localStorage.setItem("data.token", data.token);
                localStorage.setItem("data.name", data.name);
                localStorage.setItem("data.profileImageURL", data.profileImageURL);
                localStorage.setItem("data.email", data.email);
                localStorage.setItem("data.username", data.username);
                localStorage.setItem("data.institution", data.institution);
                localStorage.setItem("data.aboutMe", data.aboutSelf || "");
                localStorage.setItem("data.github", data.githubURL || "");
                localStorage.setItem("data.linkedin", data.linkedinURL || "");
                localStorage.setItem("data.skills", data.skills || "");
                localStorage.setItem("data.projects", data.projects || "");
                localStorage.setItem("data.eventData", JSON.stringify(data.eventData || {}));
                
                navigate("/");
            } else if (data.error) {
                
                setError(data.error);
            } else {
                setError("An unexpected error occurred.");
            }
        })
        .catch((error) => {
            
            console.error("Error in signin:", error);
            setError("Login failed. Please check network or try again.");
        })
        .finally(() => {
            setIsLoading(false); 
        });
    };
    return (
        <main className='flex-grow'>
            {/* 5. Improved Error Message */}
            {error && (
                <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 text-center font-serif' role="alert">
                    <AlertCircle className="inline w-5 h-5 mr-2" />
                    {error}
                </div>
            )}

            {/* 4. Removed unused 'success' div */}

            <div className='flex justify-center items-center'>
                <div className='border-[4px] rounded-md border-[#1E3A8A] w-[65%] h-fit mt-20 shadow-lg flex'>
                    <div 
                        className="w-[90%] bg-cover bg-center"
                        style={{ backgroundImage: "url('/bg-box.png')" }}
                    >
                    </div>

                    <form onSubmit={handleUserSignin}>
                        <div className='bg-[#F6F1E7] border-2 border-l-[#e6c08b] p-7'>
                            <h1 className='mb-5 font-semibold font-serif text-[#1E3A8A] text-2xl text-center'>
                                Access <br />campusSphere
                            </h1>

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
                                    {isLoading ? "Accessing..." : "Access Account"}
                                </button>
                            </div>
                        </div>
                    </form >
                </div>
            </div>
        </main>
    )
}

export default Signin;