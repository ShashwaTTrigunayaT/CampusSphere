import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import ResumeMatch from '../components/ResumeMatch'; 
import { AlertCircle, ChevronLeft, ChevronRight, Loader2, Search, Sparkles } from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [userSkills, setUserSkills] = useState([]); 
  const [type] = useState(() => localStorage.getItem("activeTab") || "");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    setPage(1);
  }, [type, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await fetchEvents();
    }, 500); 
    return () => clearTimeout(timer);
  }, [type, page, searchTerm]);

  const fetchEvents = async () => {
    if (!type) return;
    setIsLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({ page: page, search: searchTerm });
      const res = await fetch(`${API_URL}/event/${type}?${queryParams}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      if (data.data) {
        setEvents(data.data);
        setTotalPages(data.totalPages || 1);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeMatch = (matchedEvents, detectedSkills) => {
    setEvents(matchedEvents); 
    setUserSkills(detectedSkills || []); 
    setTotalPages(1); 
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // --- BEAUTIFIED RENDER STATES ---
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
        <Loader2 className="relative w-12 h-12 animate-spin mb-4 text-blue-500" />
      </div>
      <p className="text-gray-400 font-bold tracking-widest text-xs uppercase animate-pulse">Syncing Opportunities...</p>
    </div>
  );

  const renderError = () => (
    <div className="flex justify-center py-20">
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-8 py-4 rounded-2xl flex items-center gap-4 backdrop-blur-xl">
        <AlertCircle className="w-6 h-6" />
        <span className="font-bold text-sm uppercase tracking-tight">{error}</span>
      </div>
    </div>
  );

  const renderEmpty = () => (
    <div className="text-center py-32 bg-white/5 rounded-[3rem] border border-white/5 backdrop-blur-sm">
      <div className="inline-block p-6 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
        <Search size={40} className="text-blue-500 opacity-50" />
      </div>
      <h3 className="text-2xl font-black text-white italic tracking-tighter">ZERO MATCHES FOUND</h3>
      <p className="text-gray-500 mt-2 max-w-xs mx-auto text-sm font-medium leading-relaxed">
        We couldn't find any {type} matching "{searchTerm}". Try refining your keywords or uploading a fresh resume.
      </p>
      <button 
        onClick={() => setSearchTerm("")}
        className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase rounded-full transition-all shadow-lg shadow-blue-600/20"
      >
        Reset Protocol
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Background Decorative Element */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-screen pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 mt-10">
        {/* Header Section */}
        <div className="mb-16 relative">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase">Discover Hub</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-center mb-4 italic uppercase bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            {type ? type + "s" : "Events"}
          </h1>
          <p className="text-gray-500 text-center max-w-xl mx-auto text-sm font-bold uppercase tracking-[0.1em]">
            Syncing your potential with world-class opportunities.
          </p>
        </div>

        {/* AI Resume Matcher Wrapper */}
        <div className="max-w-3xl mx-auto mb-16 p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-xl shadow-2xl">
          <ResumeMatch 
            onMatchFound={handleResumeMatch} 
            category={type} 
          />
        </div>

        {/* Search Bar Wrapper */}
        <div className="max-w-4xl mx-auto mb-20 transform hover:scale-[1.01] transition-transform duration-500">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Main Content Area */}
        {isLoading ? renderLoading() : error ? renderError() : events.length === 0 ? renderEmpty() : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {events.map((event) => (
                <div key={event._id} className="hover:-translate-y-2 transition-transform duration-500">
                  <EventCard
                    eventId={event._id}
                    userSkills={userSkills}
                    {...event}
                  />
                </div>
              ))}
            </div>

            {/* Pagination Design */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-6">
                <button 
                  onClick={handlePrev} 
                  disabled={page === 1} 
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-blue-500 tracking-[0.3em] uppercase mb-1">Navigation</span>
                  <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black tracking-widest text-white">
                    {page} <span className="text-gray-600 mx-2">/</span> {totalPages}
                  </div>
                </div>

                <button 
                  onClick={handleNext} 
                  disabled={page === totalPages} 
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;