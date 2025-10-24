import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Bell } from "lucide-react"; // Alert icon

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  // Fetch alerts
  useEffect(() => {
    fetch(
      `http://localhost:5000/user/showAlerts/${localStorage.getItem("data.email")}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setAlerts(data.alerts || []))
      .catch((error) => console.error("Error fetching alerts:", error));
  }, []);

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-28 py-10">
      {/* 🔔 Alert Events Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          
          <h1 className="text-3xl md:text-4xl font-semibold text-yellow-400">
           {localStorage.getItem("data.name")} <br /> Here are Your Alert Events
          </h1>
        </div>
        <p className="text-gray-600">
          Events you’ve saved or subscribed to — never miss an opportunity!
        </p>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-3 rounded-full"></div>
      </div>

      {alerts.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {alerts.map((alert) => (
            <EventCard key={alert._id} {...alert} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          You have no alerts yet 🔕 — start saving events!
        </p>
      )}
    </div>
  );
}

export default Alerts;
