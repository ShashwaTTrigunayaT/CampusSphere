import React, { act, useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Globe,
  ClipboardList,
  CheckCircle,
  XCircle,
  ArrowRight,
  Bell,
  Bookmark
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
}) => {
  const platformColors = {
    Codeforces: "from-blue-500 to-indigo-600",
    CodeChef: "from-yellow-400 to-yellow-600 text-black",
    LeetCode: "from-gray-600 to-gray-800",
    AtCoder: "from-orange-400 to-red-500",
    HackerRank: "from-green-400 to-green-600",
    TopCoder: "from-blue-500 to-indigo-600",
  };
  
  const [active, setActive] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [alerted, setAlerted] = useState(false);
  
  
  const handleBookmark = (bookmarked) => {
    fetch("http://localhost:5000/user/bookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: eventId,
        userId: localStorage.getItem("data.email"),
       
      }),
    });
  };

  const handleAlert = (alerted) => {
    fetch("http://localhost:5000/user/alerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: eventId,
        userId: localStorage.getItem("data.email"),
        
      }),
    }).then((res) => res.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      throw new Error("Error in setting alert: " + error.message)
    });
  };
  

  // State for Bookmark and Alerts
  
  
  useEffect(() => {
    if(localStorage.getItem("data.token")){
    setActive(true);
    }
    else{
      setActive(false);
    }
  }, []);
  

  return (
    <div className="w-80 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      
      {/* Platform Badge */}
      <div
        className={`inline-block px-4 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${
          platformColors[platform] || "from-gray-400 to-gray-600"
        }`}
      >
        {platform}
      </div>

      {/* Title */}
      <div className="h-24">
        <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2 hover:text-indigo-600 transition-colors">
          {title}
        </h2>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3">
        {description !== "No Description" ? description : ""}
      </p>

      {/* Details */}
      <div className="mt-4 text-sm text-gray-700 space-y-2">
        <p className="flex items-center gap-2">
          <Calendar size={16} /> {eventDate}
        </p>
        <p className="flex items-center gap-2">
          <Clock size={16} /> {duration}
        </p>
        <p className="flex items-center gap-2">
          <ClipboardList size={16} /> {type}
        </p>
        <p className="flex items-center gap-2">
          {status === "Active" ? (
            <CheckCircle size={16} className="text-green-600" />
          ) : (
            <XCircle size={16} className="text-red-500" />
          )}
          {status}
        </p>
        <p className="flex items-center gap-2">
          <Globe size={16} /> {mode}
        </p>
        <p className="flex items-center gap-2">
          <Clock size={16} /> Deadline: {registrationDeadline}
        </p>
      </div>

      {/* Alert & Bookmark Icons */}
      {active && (
        <div className="mt-4 flex gap-4 justify-end">
        <button
          onClick={() => {setAlerted(!alerted);
            if(alerted===false)handleAlert();}}
          className={`p-2 rounded-full transition ${
            alerted ? "bg-yellow-200" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Bell size={20} className={alerted ? "text-yellow-600" : "text-gray-600"} />
        </button>

        <button
          onClick={() => {setBookmarked(!bookmarked);
            if(bookmarked===false)handleBookmark();}}
          className={`p-2 rounded-full transition ${
            bookmarked ? "bg-indigo-200" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Bookmark size={20} className={bookmarked ? "text-indigo-600" : "text-gray-600"} />
        </button>
      </div>
      )

      }

      {/* CTA Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 rounded-xl transition-all"
      >
        View Contest <ArrowRight size={16} />
      </a>
    </div>
  );
};

export default EventCard;
