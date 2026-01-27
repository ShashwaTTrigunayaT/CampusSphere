import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, User, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

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
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleUserSignup = async (event) => {
        event.preventDefault();
        setError("");
        if (!name || !password || !email) {
            setError("Data fields required.");
            return;
        }
        setIsLoading(true); 
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        try {
            const res = await fetch(`${API_URL}/user/signup`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (res.ok && data.message === "User created successfully") {
                setSuccess(true);
                setTimeout(() => navigate("/signin"), 1500); 
            } else {
                setError(data.message || "Failed.");
            }
        } catch (error) {
            setError("Network Link Error.");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        // Reduced height to fit comfortably below the Nav
        <main className="min-h-[calc(100vh)] bg-[#050505] flex items-center justify-center p-4 font-sans">
            
            <div className="fixed top-20 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
                <AnimatePresence mode="wait">
                    {(error || success) && (
                        <motion.div 
                            initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}
                            className={`${error ? 'bg-red-500/90' : 'bg-green-500/90'} backdrop-blur-md text-white px-5 py-1.5 rounded-full flex items-center gap-2 shadow-xl pointer-events-auto`}
                        >
                            {error ? <AlertCircle size={12} /> : <CheckCircle size={12} />}
                            <span className="text-[9px] font-black uppercase tracking-widest">{error || "Identity Confirmed"}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Added max-h and flex-shrink to prevent card from growing too large */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl flex flex-col md:flex-row rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#F6F1E7] max-h-[520px]"
            >
                {/* Left Pane: Reduced width slightly to focus on the form */}
                <div 
                    className="hidden md:block w-[40%] bg-cover bg-center relative p-8"
                    style={{ backgroundImage: "url('/bg-box.png')" }}
                >
                    <div className="absolute inset-0 bg-[#1E3A8A]/30 mix-blend-multiply"></div>
                    <div className="relative z-10 h-full flex flex-col justify-end">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="text-blue-400" size={14} />
                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/70">Secure Identity</span>
                        </div>
                        <h2 className="text-2xl font-black italic uppercase text-white leading-tight">
                            Connect <br /> Sphere
                        </h2>
                    </div>
                </div>

                {/* Right Pane: Tightened padding from p-14 to p-8 */}
                <div className="w-full md:w-[60%] p-8 md:p-10 flex flex-col justify-center">
                    <div className="mb-6">
                        <h1 className="text-2xl font-black uppercase italic tracking-tighter text-[#1E3A8A]">
                            Join <span className="text-blue-600 text-3xl">Sphere</span>
                        </h1>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1E3A8A]/40 mt-1 ml-1">Protocol Initialization</p>
                    </div>

                    <form onSubmit={handleUserSignup} className="space-y-3">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E3A8A]/30" size={14} />
                            <input 
                                className="w-full bg-white border-2 border-[#1E3A8A]/5 rounded-lg py-3 pl-11 pr-4 text-xs font-bold text-[#1E3A8A] focus:outline-none focus:border-[#1E3A8A]/20 transition-all shadow-sm" 
                                placeholder="Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                type="text" 
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E3A8A]/30" size={14} />
                            <input 
                                className="w-full bg-white border-2 border-[#1E3A8A]/5 rounded-lg py-3 pl-11 pr-4 text-xs font-bold text-[#1E3A8A] focus:outline-none focus:border-[#1E3A8A]/20 transition-all shadow-sm" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E3A8A]/30" size={14} />
                            <input 
                                className="w-full bg-white border-2 border-[#1E3A8A]/5 rounded-lg py-3 pl-11 pr-4 text-xs font-bold text-[#1E3A8A] focus:outline-none focus:border-[#1E3A8A]/20 transition-all shadow-sm" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                            />
                        </div>

                        <button 
                            disabled={isLoading}
                            className="w-full bg-[#1E3A8A] text-white py-3.5 rounded-lg font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-[#1E3A8A]/10 mt-1" 
                            type="submit"
                        >
                            {isLoading ? "Syncing..." : "Confirm"}
                            {!isLoading && <ArrowRight size={14} />}
                        </button>
                    </form>

                    <div className="mt-6 text-center border-t border-[#1E3A8A]/5 pt-6">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#1E3A8A]/40">
                            Recognized? 
                            <Link to="/signin" className="ml-2 text-[#1E3A8A] hover:underline">Log In</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </main>
    );
};

export default Signup;