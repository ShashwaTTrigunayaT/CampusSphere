import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  Award,
  DollarSign,
  Users,
  Tag,
  Link as LinkIcon,
  Building,
  Flag,
  Share2,
  ChevronLeft,
  Timer
} from "lucide-react";

// --- New Component: Live Countdown Timer ---
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

  // If event has passed or no date provided
  if (!timeLeft.days && !timeLeft.hours && !timeLeft.minutes && !timeLeft.seconds) {
    return null; 
  }

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center bg-indigo-50 border border-indigo-100 rounded-lg p-2 min-w-[60px]">
      <span className="text-xl font-bold text-indigo-700 font-mono">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="mb-6 bg-white border border-indigo-100 p-5 rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 mb-3 text-indigo-900 font-bold">
        <Timer size={18} className="text-indigo-600" />
        <span>Event Starts In</span>
      </div>
      <div className="flex justify-between gap-2">
        <TimeBox value={timeLeft.days || 0} label="Days" />
        <div className="text-2xl font-bold text-indigo-200 mt-1">:</div>
        <TimeBox value={timeLeft.hours || 0} label="Hrs" />
        <div className="text-2xl font-bold text-indigo-200 mt-1">:</div>
        <TimeBox value={timeLeft.minutes || 0} label="Mins" />
        <div className="text-2xl font-bold text-indigo-200 mt-1">:</div>
        <TimeBox value={timeLeft.seconds || 0} label="Secs" />
      </div>
    </div>
  );
};

// --- Premium Info Card Component ---
const InfoItem = ({ icon, title, text }) => (
  <div className="group flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300">
    <div className="flex-shrink-0 p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
        {title}
      </span>
      <span className="font-medium text-slate-800 leading-tight">{text}</span>
    </div>
  </div>
);

// --- Helper Functions ---
const formatTeamSize = (teamSize) => {
  if (!teamSize || (teamSize.min === null && teamSize.max === null)) return null;
  if (teamSize.min && teamSize.max) return `${teamSize.min} - ${teamSize.max} Members`;
  if (teamSize.min) return `Min ${teamSize.min} Members`;
  if (teamSize.max) return `Max ${teamSize.max} Members`;
  return null;
};

const formatDateTime = (dateString) => {
  if (!dateString) return "TBD";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

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
        // Correct URL
        const response = await fetch(`${API_URL}/event/eventDetails/${id}`);
        const res = await response.json();
        console.log("Fetched Event Details:", res);

        if (res.data) {
          setEvent(res.data);
        } else {
          setEvent(res);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id, API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500">
        <p className="text-xl font-semibold">Unable to load event</p>
        <p className="text-sm mt-2">{error || "Event not found"}</p>
      </div>
    );
  }

  const teamSizeString = formatTeamSize(event.teamSize);
  
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'expired': return "bg-rose-100 text-rose-700 border-rose-200";
      case 'ongoing': return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-emerald-100 text-emerald-700 border-emerald-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* 1. Hero Banner Area */}
      <div className="relative h-[400px] w-full overflow-hidden bg-slate-900">
        {event.bannerURL ? (
          <>
            <img
              src={event.bannerURL}
              alt="Banner"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900" />
        )}

        <button 
          onClick={() => window.history.back()}
          className="absolute top-6 left-6 p-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-32 z-10">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Header Section */}
          <div className="p-8 md:p-10 border-b border-slate-100">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              {/* Logo Box */}
              <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 -mt-16 md:-mt-0 relative z-20">
                <img
                  src={event.logoURL || "https://via.placeholder.com/100"}
                  alt="Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>

              {/* Title & Actions */}
              <div className="flex-grow w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="flex gap-3 items-center">
                     {event.status && (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto">
                     <button className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                        <Share2 size={20} />
                     </button>
                     <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow md:flex-grow-0 text-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      Register Now <LinkIcon size={18} />
                    </a>
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                  {event.title}
                </h1>
                
                {event.organization && (
                  <div className="flex items-center gap-2 text-lg text-slate-500 font-medium">
                    <Building size={18} />
                    <span>Hosted by {event.organization}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Grid Layout */}
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Column: Description & Tags (65%) */}
            <div className="flex-grow p-8 md:p-10 lg:w-[65%] border-r border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                About this Event
              </h2>
              
              {/* UPDATED: Uses dangerouslySetInnerHTML for HTML rendering */}
              <div 
                className="prose prose-slate max-w-none text-slate-600 leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: event.description || "No description provided." }}
              />

              {event.tags && event.tags.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium border border-slate-200 hover:border-indigo-300 transition-colors cursor-default flex items-center gap-2"
                      >
                        <Tag size={14} className="text-indigo-500" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Key Info (35%) */}
            <div className="lg:w-[35%] bg-slate-50/50 p-8 md:p-10 flex flex-col gap-4">
              
              {/* --- NEW COUNTDOWN TIMER HERE --- */}
              {event.registrationDeadline && <CountdownTimer targetDate={event.registrationDeadline} />}

              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Key Details
              </h3>
              
              <InfoItem
                icon={<Calendar size={20} />}
                title="Event Date"
                text={formatDateTime(event.eventDate)}
              />
              <InfoItem
                icon={<Clock size={20} />}
                title="Registration Deadline"
                text={formatDateTime(event.registrationDeadline)}
              />
              <InfoItem
                icon={<Globe size={20} />}
                title="Mode"
                text={event.mode}
              />
              {event.location && (
                <InfoItem
                  icon={<MapPin size={20} />}
                  title="Location"
                  text={event.location}
                />
              )}
              {event.stipend && (
                <InfoItem
                  icon={<DollarSign size={20} />}
                  title="Stipend"
                  text={event.stipend}
                />
              )}
              {event.prizes && (
                <InfoItem
                  icon={<Award size={20} />}
                  title="Prizes"
                  text={event.prizes}
                />
              )}
              {teamSizeString && (
                <InfoItem
                  icon={<Users size={20} />}
                  title="Team Size"
                  text={teamSizeString}
                />
              )}
              {event.college && (
                <InfoItem
                  icon={<Building size={20} />}
                  title="College"
                  text={event.college}
                />
              )}
              {event.platform && (
                <InfoItem
                  icon={<Flag size={20} />}
                  title="Platform"
                  text={event.platform}
                />
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;