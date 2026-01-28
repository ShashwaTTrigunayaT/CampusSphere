import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Bookmark, ShieldCheck, Zap, Loader2 } from "lucide-react"; 
import { motion } from "framer-motion";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/50">Synchronizing Vault...</p>
  </div>
);

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [userName, setUserName] = useState("Pilot");

  useEffect(() => {
    const email = localStorage.getItem("data.email");
    const token = localStorage.getItem("data.token"); 
    // Uses the fixed name from our new Signin logic
    setUserName(localStorage.getItem("data.name") || "Pilot");

    if (!email || !token) {
      setError("Authorization Required: Terminal access restricted.");
      setIsLoading(false);
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    fetch(`${API_URL}/user/showBookmarks/${email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to sync with vault.");
        return res.json();
      })
      .then((data) => setBookmarks(data.bookmarks || []))
      .catch((error) => {
        console.error("Error fetching bookmarks:", error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;

    if (error) return (
      <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/20 p-6 rounded-3xl text-center">
        <p className="text-xs font-black text-red-500 uppercase tracking-widest">{error}</p>
      </div>
    );

    if (bookmarks.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {bookmarks.map((bookmark) => (
            <EventCard key={bookmark._id} {...bookmark} />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-20 bg-white/5 border border-white/5 rounded-[3rem] backdrop-blur-sm">
        <Bookmark className="mx-auto text-gray-700 mb-4 opacity-20" size={48} />
        <p className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Vault is Empty</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center gap-2">
              <ShieldCheck size={12} className="text-blue-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-500">Secure Vault Access</span>
            </div>
            {/* NEW: Mention of your Alert System */}
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
              <Zap size={10} className="text-yellow-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">T-Minus Protocol Active</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
            Welcome back, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">
              {userName}
            </span>
          </h1>
          
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] max-w-xl leading-relaxed">
            Accessing your bookmarked nodes. Your <span className="text-white italic underline">T-Minus Protocol</span> 
            is currently monitoring these events for 120-minute proximity alerts.
          </p>
        </div>

        {/* CONTENT AREA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}

export default Bookmarks;