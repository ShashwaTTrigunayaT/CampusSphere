import React from "react";
import { Search, X, Filter } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto mb-12 group z-10">
      {/* 1. The Glow Effect (Behind) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      
      {/* 2. The Actual Bar */}
      <div className="relative bg-white rounded-full shadow-2xl shadow-indigo-500/10 flex items-center p-2 border border-gray-100">
        
        {/* Search Icon */}
        <div className="pl-4 pr-2 text-indigo-500">
          <Search size={24} strokeWidth={2.5} />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-lg font-medium"
          placeholder="Search events, locations, or tags..."
        />

        {/* Clear Button (only shows when typing) */}
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="p-2 mr-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-all"
          >
            <X size={18} />
          </button>
        )}

        {/* Filter Button (Visual only, adds to premium look) */}
        <div className="hidden sm:block border-l border-gray-200 pl-2">
             <button className="flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-full transition-all font-semibold text-sm">
                <Filter size={16} />
                <span>Filters</span>
             </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;