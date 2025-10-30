import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { AlertCircle } from "lucide-react"; 


const LoadingSpinner = ({ category }) => (
  <div className="text-center py-20">
    <p className="text-lg text-gray-500">
      Loading {category ? `${category} events` : "events"}...
    </p>
  </div>
);


const ErrorMessage = ({ error }) => (
  <div className="flex justify-center items-center py-20">
    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg flex items-center gap-3">
      <AlertCircle className="w-6 h-6" />
      <span>Error: {error}</span>
    </div>
  </div>
);


const EmptyState = ({ category }) => (
  <div className="text-center py-20">
    <p className="text-lg text-gray-500">
      No {category ? `${category} events` : "events"} found at this time. 😥
    </p>
    <p className="text-gray-400">Please check back later!</p>
  </div>
);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [type] = useState(() => localStorage.getItem("activeTab") || "");

  useEffect(() => {
    
    async function fetchEvents() {
      setIsLoading(true);
      setError(null);

        if (!type) {
        setError("No event category was selected.");
        setIsLoading(false);
        return;
      }

      
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

      try {
        const res = await fetch(`${API_URL}/event/${type}`);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch ${type} events. Server responded with ${res.status}.`
          );
        }
        const data = await res.json();
        setEvents(data || []); 
      } catch (err) {
        
        console.error("Error fetching events:", err);
        setError(err.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, [type]); 
  
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner category={type} />;
    }

    if (error) {
      return <ErrorMessage error={error} />;
    }

    if (events.length === 0) {
      return <EmptyState category={type} />;
    }

    return (
      <div className="flex flex-wrap gap-4 justify-center my-5">
        {events.map((event) => (
          <EventCard
            key={event._id}
            eventId={event._id}
            title={event.title}
            platform={event.platform}
            eventDate={event.eventDate}
            duration={event.duration}
            type={event.type}
            status={event.status}
            link={event.link}
            description={event.description}
            mode={event.mode}
            registrationDeadline={event.registrationDeadline}
            className="mx-4 my-4"
          />
        ))}
      </div>
    );
  };

  return <>{renderContent()}</>;
};

export default Events;