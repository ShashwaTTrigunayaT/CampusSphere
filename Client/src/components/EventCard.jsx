import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddToCalender from "./AddToCalender"; 
import {
  Calendar,
  Clock,
  Globe,
  CheckCircle,
  XCircle,
  ArrowRight,
  Bell,
  Bookmark,
  Info
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
}) => {
  
  const navigate = useNavigate(); 

  const platformColors = {
    Codeforces: "from-blue-500 to-indigo-600",
    CodeChef: "from-yellow-400 to-yellow-600 text-black",
    LeetCode: "from-gray-600 to-gray-800",
    AtCoder: "from-orange-400 to-red-500",
    HackerRank: "from-green-400 to-green-600",
    TopCoder: "from-blue-500 to-indigo-600",
    DevFolio: "from-purple-500 to-indigo-600",
  };

  const [active, setActive] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [alerted, setAlerted] = useState(false);

  const [isBookmarking, setIsBookmarking] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  
  const handleBookmark = async () => {
    if (isBookmarking) return;
    setIsBookmarking(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/user/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: eventId,
          userId: localStorage.getItem("data.email"),
        }),
      });

      if (!res.ok) throw new Error("Failed to update bookmark");
      setBookmarked((prev) => !prev);
    } catch (err) {
      console.error("Bookmark error:", err);
    } finally {
      setIsBookmarking(false);
    }
  };

  
  const handleAlert = async () => {
    if (isAlerting) return;
    setIsAlerting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/user/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: eventId,
          userId: localStorage.getItem("data.email"),
        }),
      });

      if (!res.ok) throw new Error("Failed to update alert");
      setAlerted((prev) => !prev);
    } catch (err) {
      console.error("Alert error:", err);
    } finally {
      setIsAlerting(false);
    }
  };

  
  useEffect(() => {
    if (localStorage.getItem("data.token")) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, []);

  
  return (
    <div className="w-75 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
      
      {/* Banner Image */}
      {bannerURL ? (
        <img 
          src={bannerURL} 
          alt={`${title} banner`} 
          className="w-full h-32 object-cover" 
        />
      ) : (
        
        <div className={`w-full h-32 bg-gradient-to-r ${platformColors[platform] || "from-gray-400 to-gray-600"}`}></div>
      )}

      {/* Main card content area */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Logo + Platform Badge */}
        <div className="flex items-center gap-2 mb-3">
          {logoURL && (
            <img src={logoURL} alt={platform} className="w-6 h-6 rounded-full object-contain bg-white" />
          )}
          <div
            className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${
              platformColors[platform] || "from-gray-400 to-gray-600"
            }`}
          >
            {platform}
          </div>
        </div>

        {/* Title (Fixed height + line clamp) */}
        <div className="h-14 mb-2 overflow-hidden">
          <h2 className="text-base font-bold text-gray-800 leading-tight line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer"
              onClick={() => navigate(`/events/${eventId}`)}>
            {title}
          </h2>
        </div>

        {/* Description (Fixed height + line clamp) */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 h-16">
          {description && description !== "No Description" ? description : "No details provided available for this event."}
        </p>

        {/* Details List */}
        <div className="text-sm text-gray-700 space-y-2 mb-4">
          <p className="flex items-center gap-2">
            <Calendar size={16} className="text-indigo-500" /> {eventDate ? new Date(eventDate).toLocaleDateString() : "TBD"}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={16} className="text-indigo-500" /> {duration || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <Globe size={16} className="text-indigo-500" /> {mode}
          </p>
          
          {/* Status Check */}
          <p className="flex items-center gap-2 font-medium">
             {status === "Active" || status === "Upcoming" ? (
                <CheckCircle size={16} className="text-green-600" />
              ) : (
                <XCircle size={16} className="text-red-500" />
              )}
              <span className={status === "Active" || status === "Upcoming" ? "text-green-700" : "text-red-700"}>
                {status}
              </span>
          </p>
        </div>

        {/* === ACTION BUTTONS ROW (Fixed Layout) === */}
        <div className="mt-auto pt-4 flex gap-2 justify-end items-center border-t border-gray-100">
          
          {/* 1. Info Button (Always Visible) */}
          <button
            onClick={() => navigate(`/events/${eventId}`)}
            className="p-2 rounded-full hover:bg-blue-50 transition-colors group"
            title="View Details"
          >
            <Info size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* 2. Auth Buttons (Only if logged in) */}
          {active && (
            <>
              <button
                onClick={handleAlert}
                disabled={isAlerting}
                className="p-2 rounded-full hover:bg-yellow-50 transition-colors disabled:opacity-50"
                title={alerted ? "Remove alert" : "Set alert"}
              >
                <Bell
                  size={20}
                  className={alerted ? "fill-yellow-500 text-yellow-600" : "text-gray-400 hover:text-yellow-600 transition-colors"}
                />
              </button>

              <button
                onClick={handleBookmark}
                disabled={isBookmarking}
                className="p-2 rounded-full hover:bg-indigo-50 transition-colors disabled:opacity-50"
                title={bookmarked ? "Remove bookmark" : "Bookmark event"}
              >
                <Bookmark
                  size={20}
                  className={bookmarked ? "fill-indigo-600 text-indigo-600" : "text-gray-400 hover:text-indigo-600 transition-colors"}
                />
              </button>

              {/* Add To Calendar Component */}
              <div className="hover:bg-purple-50 rounded-full p-1 transition-colors">
                <AddToCalender
                  title={title}
                  eventType={type}
                  eventDateTime={eventDate}
                  eventDuration={duration}
                  description={description}
                />
              </div>
            </>
          )}
        </div>

        {/* CTA Button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          View Contest <ArrowRight size={16} />
        </a>

      </div>
    </div>
  );
};

export default EventCard;