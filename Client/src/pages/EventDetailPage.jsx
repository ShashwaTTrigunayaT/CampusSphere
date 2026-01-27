import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar, Clock, MapPin, Globe, Award, DollarSign, Users,
  Tag, Link as LinkIcon, Building, Flag, Share2, ChevronLeft, Timer, Sparkles
} from "lucide-react";

// --- New Component: Live Countdown Timer (Beautified) ---
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft.days && !timeLeft.hours && !timeLeft.minutes && !timeLeft.seconds) return null;

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-3 min-w-[70px] backdrop-blur-md">
      <span className="text-2xl font-black text-blue-500 font-mono tracking-tighter">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className="text-[9px] uppercase font-black text-gray-500 tracking-[0.2em] mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="mb-8 relative group">
      <div className="absolute -inset-1 bg-blue-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
      <div className="relative bg-white/[0.03] border border-white/10 p-6 rounded-[2rem] backdrop-blur-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Timer size={16} className="text-blue-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Mission Clock</span>
        </div>
        <div className="flex justify-between items-center">
          <TimeBox value={timeLeft.days || 0} label="Days" />
          <span className="text-xl font-black text-white/20">:</span>
          <TimeBox value={timeLeft.hours || 0} label="Hrs" />
          <span className="text-xl font-black text-white/20">:</span>
          <TimeBox value={timeLeft.minutes || 0} label="Mins" />
          <span className="text-xl font-black text-white/20">:</span>
          <TimeBox value={timeLeft.seconds || 0} label="Secs" />
        </div>
      </div>
    </div>
  );
};

// --- Premium Info Card Component ---
const InfoItem = ({ icon, title, text }) => (
  <div className="group flex items-center gap-5 p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500 backdrop-blur-sm">
    <div className="flex-shrink-0 p-3 bg-blue-500/10 text-blue-500 rounded-xl group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-1">
        {title}
      </span>
      <span className="font-bold text-gray-200 leading-tight text-sm uppercase tracking-tight">{text}</span>
    </div>
  </div>
);

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/event/eventDetails/${id}`);
        const res = await response.json();
        setEvent(res.data || res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id, API_URL]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
       <div className="relative">
        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'expired': return "bg-red-500/10 text-red-500 border-red-500/20";
      case 'ongoing': return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default: return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20 selection:bg-blue-500/30">
      {/* Background Cinematic Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-screen pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[130px] rounded-full"></div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[450px] w-full overflow-hidden">
        {event.bannerURL ? (
          <img src={event.bannerURL} alt="Banner" className="w-full h-full object-cover opacity-40 scale-105" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        
        <button onClick={() => window.history.back()} className="absolute top-10 left-10 p-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl hover:bg-blue-600 transition-all z-50">
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 relative -mt-40 z-10">
        <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="p-10 md:p-14 border-b border-white/5">
            <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start text-center lg:text-left">
              <div className="relative flex-shrink-0 group">
                <div className="absolute -inset-2 bg-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                <div className="relative bg-black p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                  <img src={event.logoURL || "/placeholder.png"} alt="Logo" className="w-28 h-28 object-contain" />
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(event.status)}`}>
                    {event.status || 'Active'}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-gray-400 border border-white/10">
                    {event.type}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-4">
                  {event.title}
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-500/60 font-black text-xs uppercase tracking-[0.2em]">
                   <Building size={14} />
                   <span>ORG: {event.organization || "Independent"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full lg:w-auto min-w-[200px]">
                <a href={event.link} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 bg-white text-black font-black uppercase text-xs tracking-widest py-5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95 shadow-xl shadow-white/5">
                  INITIALIZE REGISTER <LinkIcon size={16} />
                </a>
                <button className="flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-all text-xs font-black uppercase tracking-widest">
                  <Share2 size={16} /> SHARE INTEL
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Description */}
            <div className="flex-grow p-10 md:p-14 lg:w-[65%] border-r border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="text-blue-500 w-5 h-5" />
                <h2 className="text-xl font-black italic uppercase tracking-tight">Mission Briefing</h2>
              </div>
              <div 
                className="prose prose-invert max-w-none text-gray-400 text-sm leading-relaxed font-medium [&>ul]:list-disc [&>ul]:pl-5 [&>p]:mb-6"
                dangerouslySetInnerHTML={{ __html: event.description || "Information classified." }}
              />

              {event.tags && (
                <div className="mt-16 pt-10 border-t border-white/5">
                  <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6">Technologies / Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="px-5 py-2.5 bg-white/[0.02] text-gray-300 rounded-xl text-[10px] font-black uppercase border border-white/5 hover:border-blue-500/40 transition-colors">
                        # {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Details */}
            <div className="lg:w-[35%] bg-white/[0.01] p-10 md:p-14 flex flex-col gap-5">
              {event.registrationDeadline && <CountdownTimer targetDate={event.registrationDeadline} />}
              <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4">Core Metadata</h3>
              
              <InfoItem icon={<Calendar />} title="DEPLOYMENT DATE" text={new Date(event.eventDate).toLocaleDateString()} />
              <InfoItem icon={<Globe />} title="OPERATION MODE" text={event.mode || "Online"} />
              {event.location && <InfoItem icon={<MapPin />} title="GRID LOCATION" text={event.location} />}
              {event.prizes && <InfoItem icon={<Award />} title="REWARDS" text={event.prizes} />}
              {event.stipend && <InfoItem icon={<DollarSign />} title="STIPEND" text={event.stipend} />}
              <InfoItem icon={<Users />} title="TEAM CAPACITY" text={event.teamSize?.max ? `MAX ${event.teamSize.max}` : "SINGLE PILOT"} />
              {event.platform && <InfoItem icon={<Flag />} title="CARRIER PLATFORM" text={event.platform} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;