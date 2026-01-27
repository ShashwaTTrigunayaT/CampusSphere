import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe, Send, Sparkles, CheckCircle, AlertTriangle } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    if (!name || !email || !message) {
      setError("All frequency channels must be filled.");
      setIsLoading(false);
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${API_URL}/api/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Transmission failed. Please try again.");

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err.message || "Unknown system error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center px-6 py-24 bg-[#050505] overflow-hidden">
      
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] bg-blue-600/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[130px] rounded-full"></div>
      </div>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
        <span className="text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase">Communication Hub</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-center bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-6"
      >
        Get In Touch
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500 text-center max-w-xl mx-auto text-sm font-bold uppercase tracking-[0.1em] mb-16"
      >
        Have questions or want to collaborate? Establish a direct link with the Sphere.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full relative z-10">
        
        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-b from-blue-600/20 to-transparent rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col space-y-6"
          >
            <h2 className="text-xl font-black italic uppercase tracking-tight text-white mb-2">Send Message</h2>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="FULL NAME"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="YOUR MESSAGE"
                rows="4"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {success && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-green-400 bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                <CheckCircle className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-tight">Transmission Successful.</span>
              </motion.div>
            )}
            
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-tight">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group w-full bg-white text-black font-black uppercase text-xs tracking-[0.2em] py-5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 disabled:opacity-20 flex items-center justify-center gap-3 shadow-xl shadow-white/5 active:scale-[0.98]"
            >
              {isLoading ? "TRANSMITTING..." : "INITIALIZE SEND"}
              {!isLoading && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
            </button>
          </form>
        </motion.div>

        {/* Contact Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center space-y-6"
        >
          {[
            { icon: <Mail />, label: "Email", value: "campusshere@gmail.com", sub: "Official Support" },
            { icon: <MapPin />, label: "Location", value: "NIT Raipur Campus", sub: "Chhattisgarh, India" },
            { icon: <Globe />, label: "Network", value: "LinkedIn | Twitter | GitHub", sub: "Join the Community" },
          ].map((info, i) => (
            <div key={i} className="group flex items-center gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500 backdrop-blur-sm">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 group-hover:scale-110 transition-transform">
                {React.cloneElement(info.icon, { className: "w-6 h-6" })}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 leading-none">{info.label}</span>
                <h3 className="text-lg font-black italic text-white uppercase tracking-tight mt-1">{info.value}</h3>
                <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mt-0.5">{info.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;