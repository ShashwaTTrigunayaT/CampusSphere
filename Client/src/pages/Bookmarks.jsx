import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Bookmark } from "lucide-react"; // Lucide bookmark icon

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks
  useEffect(() => {
    fetch(
      `http://localhost:5000/user/showBookmarks/${localStorage.getItem(
        "data.email"
      )}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBookmarks(data.bookmarks || []);
        console.log("Bookmarks:", data.bookmarks);
      })
      .catch((error) => {
        console.error("Error fetching bookmarks:", error);
      });
  }, []);

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-28 py-10">
      {/* 📌 Bookmarks Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          
          <h1 className="text-3xl md:text-4xl font-semibold text-blue-700">
            {localStorage.getItem("data.name")}<br /> Here are your Bookmarked Events
          </h1>
        </div>
        <p className="text-gray-600">
          Events you’ve saved for later — keep track of what matters most!
        </p>
        <div className="w-24 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></div>
      </div>

      {bookmarks.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {bookmarks.map((bookmark) => (
            <EventCard key={bookmark._id} {...bookmark} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          You haven’t bookmarked any events yet 📌
        </p>
      )}
    </div>
  );
}

export default Bookmarks;
