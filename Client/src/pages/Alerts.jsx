import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Bell, ShieldCheck, Zap, Loader2, Radio } from "lucide-react"; 
import { motion } from "framer-motion";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <Loader2 className="w-10 h-10 text-yellow-500 animate-spin" />
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500/50">Interception in Progress...</p>
  </div>
);

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("Pilot");

  useEffect(() => {
    const email = localStorage.getItem("data.email");
    const token = localStorage.getItem("data.token");
    setUserName(localStorage.getItem("data.name") || "Pilot");

    if (!email || !token) {
      setError("Terminal Locked: Authentication Required.");
      setIsLoading(false);
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    fetch(`${API_URL}/user/showAlerts/${email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Signal Lost: Failed to fetch alerts.");
        return res.json();
      })
      .then((data) => setAlerts(data.alerts || []))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;

    if (error) return (
      <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/20 p-6 rounded-3xl text-center">
        <p className="text-xs font-black text-red-500 uppercase tracking-widest">{error}</p>
      </div>
    );

    if (alerts.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {alerts.map((alert) => (
            <EventCard key={alert._id} {...alert} />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-24 bg-white/5 border border-white/5 rounded-[3rem] backdrop-blur-sm">
        <Radio className="mx-auto text-yellow-500/20 mb-4 animate-pulse" size={48} />
        <p className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">No Incoming Signals</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Glows for Depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION - Matches Bookmark Style */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center gap-2">
              <Zap size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500">T-Minus Protocol Active</span>
            </div>
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
              <ShieldCheck size={10} className="text-blue-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Secure Intercept</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
            Active Alerts, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-400">
              {userName}
            </span>
          </h1>
          
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] max-w-xl leading-relaxed">
            Synchronizing live event data. Your node is configured to transmit 
            <span className="text-white italic underline ml-1">Automated Email Alerts</span> 120 minutes prior to event launch.
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

export default Alerts;