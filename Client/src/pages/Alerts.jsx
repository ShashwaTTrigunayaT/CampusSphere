import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Bell } from "lucide-react"; 


const LoadingSpinner = () => (
  <div className="text-center py-10">
    <p className="text-lg text-gray-500">Loading alerts...</p>
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
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <p className="text-center text-red-600 font-semibold bg-red-100 p-4 rounded-md">
          Error: {error}
        </p>
      );
    }

    if (alerts.length > 0) {
      return (
        <div className="flex flex-wrap gap-6 justify-center">
          {alerts.map((alert) => (
            <EventCard key={alert._id} {...alert} />
          ))}
        </div>
      );
    }

    
    return (
      <p className="text-center text-gray-500">
        You have no alerts yet  — start saving events!
      </p>
    );
  };

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-28 py-10">
      {/*  Alert Events Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <h1 className="text-3xl md:text-4xl font-semibold text-yellow-400">
            {userName} <br /> Here are Your Alert Events
          </h1>
        </div>
        <p className="text-gray-600">
          Events you’ve saved or subscribed to — never miss an opportunity!
        </p>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Render content based on loading/error/data state */}
      {renderContent()}
    </div>
  );
}

export default Alerts;