import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Bell, ShieldAlert, Loader2, Sparkles } from "lucide-react"; 

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-32">
    <div className="relative">
      <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 animate-pulse"></div>
      <Loader2 className="relative w-12 h-12 animate-spin mb-4 text-yellow-500" />
    </div>
    <p className="text-gray-400 font-black tracking-[0.3em] text-[10px] uppercase animate-pulse">Scanning Satellite Feeds...</p>
  </div>
);

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("data.email");
    const token = localStorage.getItem("data.token");
    setUserName(localStorage.getItem("data.name") || "User");

    if (!email || !token) {
      setError("You must be logged in to see alerts.");
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
        if (!res.ok) {
          setError("Failed to fetch alerts. Please try again later.");
          throw new Error("Failed to fetch alerts. Please try again later.");
        }
        return res.json();
      })
      .then((data) => {
        setAlerts(data.alerts || []);
      })
      .catch((error) => {
        console.error("Error fetching alerts:", error);
        setError(error.message || "An unknown error occurred.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;

    if (error) {
      return (
        <div className="flex justify-center py-20 animate-in zoom-in-95 duration-500">
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-8 py-6 rounded-[2rem] flex items-center gap-4 backdrop-blur-xl">
            <ShieldAlert className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500/50">Access Denied</span>
              <span className="font-bold text-sm uppercase">{error}</span>
            </div>
          </div>
        </div>
      );
    }

    if (alerts.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
          {alerts.map((alert) => (
            <div key={alert._id} className="hover:-translate-y-2 transition-transform duration-500">
              <EventCard {...alert} />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-32 bg-white/[0.02] rounded-[3rem] border border-white/5 backdrop-blur-sm animate-in fade-in duration-700">
        <div className="inline-block p-6 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
          <Bell size={40} className="text-yellow-500 opacity-50" />
        </div>
        <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Signal Is Empty</h3>
        <p className="text-gray-500 mt-2 max-w-xs mx-auto text-sm font-medium leading-relaxed italic">
          No saved events found in your radar. Start exploring the sphere to trigger alerts.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      {/* Background Cinematic Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-screen pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] bg-yellow-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 mt-10 relative">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion-div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-md">
              <Bell className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/20" />
              <span className="text-[10px] font-black tracking-[0.3em] text-yellow-500 uppercase">Live Intercepts</span>
            </div>
          </motion-div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase mb-4 leading-none">
            <span className="text-gray-500 block text-2xl mb-2 not-italic tracking-widest">{userName}</span>
            <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Your Alert Intel
            </span>
          </h1>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.1em] max-w-lg">
              Synchronized events from your watch-list. Never miss a critical deadline.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="relative z-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Alerts;