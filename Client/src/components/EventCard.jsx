
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddToCalender from "./AddToCalender";
import AIPrepCard from "./AIPrepCard";
import {
  Calendar,
  Clock,
  Globe,
  ArrowRight,
  Bell,
  Bookmark,
  Info,
  Zap,
  Star,
  Bot
} from "lucide-react";

const EventCard = ({
  eventId,
  title,
  platform,
  eventDate,
  duration,
  type,
  status,
  link,
  description,
  mode,
  registrationDeadline,
  bannerURL,
  logoURL,
  tags,
  userSkills = []
}) => {
  const navigate = useNavigate();

  // --- STATE ---
  const [imageSource, setImageSource] = useState(bannerURL || logoURL || null);
  const [active, setActive] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [alerted, setAlerted] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const platformColors = {
    Codeforces: "from-blue-500 to-indigo-600",
    CodeChef: "from-yellow-400 to-yellow-600 text-black",
    LeetCode: "from-gray-600 to-gray-800",
    AtCoder: "from-orange-400 to-red-500",
    HackerRank: "from-green-400 to-green-600",
    DevFolio: "from-purple-500 to-indigo-600",
    Unstop: "from-blue-400 to-blue-600",
  };

  const renderMatchBadge = () => {
    if (!userSkills || userSkills.length === 0) return null;
    const eventContext = (title + description + (tags ? tags.join(" ") : "")).toLowerCase();
    const matchCount = userSkills.filter(skill => eventContext.includes(skill.toLowerCase())).length;

    if (matchCount >= 2) {
      return (
        <div className="absolute top-3 right-3 z-20 bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 animate-pulse">
          <Star size={10} fill="currentColor" /> 95% Match
        </div>
      );
    }
    if (matchCount >= 1) {
      return (
        <div className="absolute top-3 right-3 z-20 bg-[#1E3A8A] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
          <Zap size={10} fill="currentColor" /> Good Fit
        </div>
      );
    }
    return null;
  };

  const handleImageError = () => {
    if (imageSource === bannerURL && logoURL) {
      setImageSource(logoURL);
    } else {
      setImageSource(null);
    }
  };

  useEffect(() => {
    setImageSource(bannerURL || logoURL || null);
  }, [bannerURL, logoURL]);

  const handleBookmark = async () => {
    if (isBookmarking) return;
    setIsBookmarking(true);
    try {
      const res = await fetch(`${API_URL}/user/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, userId: localStorage.getItem("data.email") }),
      });
      if (res.ok) setBookmarked(prev => !prev);
    } catch (err) { console.error(err); }
    finally { setIsBookmarking(false); }
  };

  const handleAlert = async () => {
    if (isAlerting) return;
    setIsAlerting(true);
    try {
      const res = await fetch(`${API_URL}/user/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, userId: localStorage.getItem("data.email") }),
      });
      if (res.ok) setAlerted(prev => !prev);
    } catch (err) { console.error(err); }
    finally { setIsAlerting(false); }
  };

  useEffect(() => {
    setActive(!!localStorage.getItem("data.token"));
  }, []);

  // --- RENDER ---
  return (
    <div className={`relative w-full max-w-sm bg-[#F6F1E7] rounded-3xl border-2 border-[#1E3A8A]/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden h-fit ${showAI ? 'z-50' : 'z-0'}`}>

      {renderMatchBadge()}

      {/* Banner Section */}
      <div className="h-32 w-full overflow-hidden bg-white/50 border-b border-[#1E3A8A]/5">
        {imageSource ? (
          <img
            src={imageSource}
            alt={title}
            className={`w-full h-full ${imageSource === logoURL ? "object-contain p-6" : "object-cover"}`}
            onError={handleImageError}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${platformColors[platform] || "from-gray-400 to-gray-600"}`} />
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Platform & Status */}
        <div className="flex justify-between items-center mb-3">
          <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-white rounded-lg bg-gradient-to-r ${platformColors[platform] || "from-gray-400 to-gray-600"}`}>
            {platform}
          </span>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${status === "Active" || status === "Upcoming" ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-[10px] font-bold text-gray-500 uppercase">{status}</span>
          </div>
        </div>

        {/* Title */}
        <h2
          className="text-base font-black italic uppercase text-[#1E3A8A] leading-tight mb-3 line-clamp-2 cursor-pointer hover:underline decoration-2"
          onClick={() => navigate(`/events/${eventId}`)}
        >
          {title}
        </h2>

        {/* Description */}
        <div
          className="text-[12px] text-gray-600 line-clamp-2 mb-4 h-9 overflow-hidden opacity-80"
          dangerouslySetInnerHTML={{ __html: description && description !== "No Description" ? description : "No details provided." }}
        />

        {/* Details List */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#1E3A8A]/70 uppercase">
            <Calendar size={14} /> {eventDate ? new Date(eventDate).toLocaleDateString() : "TBD"}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#1E3A8A]/70 uppercase">
            <Clock size={14} /> {duration || "N/A"}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#1E3A8A]/70 uppercase">
            <Globe size={14} /> {mode}
          </div>
        </div>

        {/* --- FOOTER SECTION --- */}
        <div className="mt-auto pt-4 border-t border-[#1E3A8A]/10 flex flex-col">

          {/* Row 1: Icons (Always Visible) */}
          <div className="flex items-center justify-evenly w-full px-2">

            {/* Info Icon */}
            <button
              onClick={() => navigate(`/events/${eventId}`)}
              className="p-2 hover:bg-[#1E3A8A]/5 rounded-lg text-gray-400 hover:text-[#1E3A8A] transition-colors"
              title="View Details"
            >
              <Info size={20} />
            </button>

            {active && (
              <>
                {/* Alert Icon */}
                <button
                  onClick={handleAlert}
                  className="p-2 hover:bg-yellow-50 rounded-lg text-gray-400 transition-colors"
                  title="Set Alert"
                >
                  <Bell size={20} className={alerted ? "fill-yellow-500 text-yellow-600 border-none" : ""} />
                </button>

                {/* Bookmark Icon */}
                <button
                  onClick={handleBookmark}
                  className="p-2 hover:bg-indigo-50 rounded-lg text-gray-400 transition-colors"
                  title="Bookmark"
                >
                  <Bookmark size={20} className={bookmarked ? "fill-indigo-600 text-indigo-600 border-none" : ""} />
                </button>

                {/* AI Strategy Toggle */}
                <button
                  onClick={() => setShowAI(!showAI)}
                  className={`p-2 rounded-lg transition-all duration-300 ${showAI ? "bg-purple-600 text-white shadow-lg scale-110" : "hover:bg-purple-100 text-gray-400 hover:text-purple-600"}`}
                  title="Generate Winning Strategy"
                >
                  <Bot size={20} />
                </button>

                {/* Calendar Icon */}
                <div className="scale-100">
                  <AddToCalender
                    title={title}
                    eventType={type}
                    eventDateTime={eventDate}
                    eventDuration={duration}
                    description={description?.replace(/<[^>]*>?/gm, '') || ""}
                  />
                </div>
              </>
            )}
          </div>

          {/* Row 2: Enter Button (Reveals on Hover) */}
          {/* ✅ The outer div handles the slide animation */}
          <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-16 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-md active:scale-95 mt-4"
            >
              Enter Challenge <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </div>

      {/* AI Expandable Section */}
      
      {showAI && (
        <div className="animate-in slide-in-from-top-5 duration-300 w-full">
          <AIPrepCard
            event={{ title, description }}
            user={{ skills: userSkills }}
          />
        </div>
      )}

    </div>
  );
};

export default EventCard;