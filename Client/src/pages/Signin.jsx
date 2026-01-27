import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleUserSignin = (event) => {
        event.preventDefault();
        setError("");
        if (!password || !email) {
            setError("Missing Credentials");
            return;
        }
        setIsLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        fetch(`${API_URL}/user/signin`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        })
        .then((res) => {
            if (!res.ok) throw new Error('Authentication Failed');
            return res.json();
        })
        .then((data) => {
            if (data.message === "Login successful") {
                // --- 🚀 THE FIX: Saving all missing metadata ---
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
            } else {
                setError(data.error || "Access Denied");
            }
        })
        .catch((err) => {
            console.error(err);
            setError("Network Error: Terminal Offline");
        })
        .finally(() => setIsLoading(false));
    };

    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
            
            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-24 z-50 bg-red-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl flex flex-col md:flex-row rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl bg-[#F6F1E7]"
            >
                {/* Visual Side */}
                <div 
                    className="hidden md:block w-1/2 min-h-[500px] bg-cover bg-center relative p-12"
                    style={{ backgroundImage: "url('/bg-box.png')" }}
                >
                    <div className="absolute inset-0 bg-[#1E3A8A]/30 mix-blend-multiply"></div>
                    <div className="relative z-10 h-full flex flex-col justify-end">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="text-white/70" size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Secure Node 01</span>
                        </div>
                        <h2 className="text-5xl font-black italic uppercase text-white leading-[0.9] tracking-tighter">
                            CAMPUS <br /> SPHERE
                        </h2>
                    </div>
                </div>

                {/* Input Side */}
                <div className="w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-[#F6F1E7]">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-[#1E3A8A]">
                            Initialize Access
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A8A]/40 mt-2">Credential Verification Required</p>
                    </div>

                    <form onSubmit={handleUserSignin} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E3A8A]/20" size={18} />
                            <input 
                                className="w-full bg-white border-2 border-[#1E3A8A]/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold text-[#1E3A8A] placeholder-[#1E3A8A]/30 focus:outline-none focus:border-[#1E3A8A] transition-all" 
                                placeholder="NODE EMAIL" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E3A8A]/20" size={18} />
                            <input 
                                className="w-full bg-white border-2 border-[#1E3A8A]/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold text-[#1E3A8A] placeholder-[#1E3A8A]/30 focus:outline-none focus:border-[#1E3A8A] transition-all" 
                                placeholder="PASSWORD" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                            />
                        </div>

                        <button 
                            disabled={isLoading}
                            className="w-full bg-[#1E3A8A] text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#152a63] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-[#1E3A8A]/20 mt-6" 
                            type="submit"
                        >
                            {isLoading ? "SYNCING..." : "ENTER SPHERE"} <ArrowRight size={16} />
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-[#1E3A8A]/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <Link to="/signup" className="text-[#1E3A8A]/40 hover:text-[#1E3A8A] transition-colors">Create Profile</Link>
                        <span className="text-[#1E3A8A]/10 italic">Secure.Connect.V2</span>
                    </div>
                </div>
            </motion.div>
        </main>
    );
};

export default Signin;