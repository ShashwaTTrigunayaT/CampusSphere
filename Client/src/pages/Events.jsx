import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import ResumeMatch from '../components/ResumeMatch'; 
import { AlertCircle, ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";

const Events = () => {
  
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  // ✅ 1. NEW STATE: Store the user's skills here
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

  // ✅ 2. UPDATE HANDLER: Capture skills from the ResumeMatch component
  const handleResumeMatch = (matchedEvents, detectedSkills) => {
    console.log("Found Skills:", detectedSkills); // Debugging log
    setEvents(matchedEvents); 
    setUserSkills(detectedSkills || []); // Save skills to state
    setTotalPages(1); 
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-500" />
      <p>Finding the best opportunities...</p>
    </div>
  );

  const renderError = () => (
    <div className="flex justify-center py-20">
      <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-5 h-5" />
        <span>{error}</span>
      </div>
    </div>
  );

  const renderEmpty = () => (
    <div className="text-center py-20">
      <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
        <Search size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No events found</h3>
      <p className="text-gray-500 mt-1 max-w-xs mx-auto">
        We couldn't find any {type} matching "{searchTerm}". Try adjusting your search or uploading your resume.
      </p>
      <button 
        onClick={() => setSearchTerm("")}
        className="mt-4 text-indigo-600 font-medium hover:text-indigo-700"
      >
        Clear Search
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#cc9a54] text-center mb-2">
          Explore {type ? type.toUpperCase() + "S" : "EVENTS"}
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Find the perfect opportunity to showcase your skills.
        </p>

        <div className="max-w-3xl mx-auto mb-10">
            <ResumeMatch 
                onMatchFound={handleResumeMatch} 
                category={type} 
            />
        </div>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {isLoading ? renderLoading() : error ? renderError() : events.length === 0 ? renderEmpty() : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {events.map((event) => (
              <EventCard
                key={event._id}
                eventId={event._id}
                userSkills={userSkills} /* ✅ 3. PASS SKILLS TO CARD */
                {...event}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <button onClick={handlePrev} disabled={page === 1} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium text-gray-600 px-4 py-2 bg-gray-50 rounded-lg">
                Page {page} of {totalPages}
              </span>
              <button onClick={handleNext} disabled={page === totalPages} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Events;