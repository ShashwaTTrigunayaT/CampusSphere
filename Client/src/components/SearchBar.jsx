import React from "react";
import { Search, X, Filter, Target, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto mb-16 px-4">
      
      {/* 1. The Background Technical Layer */}
      <div className="absolute -inset-4 bg-[#1E3A8A]/5 blur-3xl rounded-full opacity-50"></div>

      <div className="relative group">
        {/* 2. The Main Chassis */}
        <div className="relative bg-[#F6F1E7]/90 backdrop-blur-md border-[3px] border-[#1E3A8A] rounded-2xl flex items-center p-1.5 shadow-[8px_8px_0px_0px_rgba(30,58,138,1)] transition-all duration-300 group-hover:shadow-[12px_12px_0px_0px_rgba(30,58,138,1)] group-hover:-translate-x-1 group-hover:-translate-y-1">
          
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2 pl-4 pr-3 border-r-2 border-[#1E3A8A]/10">
            <Cpu size={16} className="text-[#1E3A8A] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-[#1E3A8A]/40">Active</span>
          </div>

          {/* Search Icon / Targeting Reticle */}
          <div className="pl-4 pr-2 text-[#1E3A8A]">
            <Target size={22} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500" />
          </div>

          {/* Input Field: Precision Serif/Sans mix */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 bg-transparent outline-none text-[#1E3A8A] placeholder-[#1E3A8A]/30 text-lg font-bold italic uppercase tracking-tight"
            placeholder="Scan for Nodes, Events, or Tags..."
          />

          {/* Functional Cluster */}
          <div className="flex items-center gap-2 pr-2">
            <AnimatePresence>
              {searchTerm && (
                <motion.button 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => setSearchTerm("")}
                  className="p-2 bg-[#1E3A8A]/10 hover:bg-red-500 hover:text-white rounded-lg text-[#1E3A8A] transition-all"
                >
                  <X size={18} strokeWidth={3} />
                </motion.button>
              )}
            </AnimatePresence>

            <button className="flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-xl transition-all font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-800 active:scale-95 shadow-lg shadow-blue-900/20">
              <Filter size={14} />
              <span className="hidden sm:inline">Parameters</span>
            </button>
          </div>
        </div>

        {/* 3. Aesthetic Technical Tags (Decorative) */}
        <div className="absolute -bottom-8 left-6 flex gap-4">
           <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-[8px] font-black text-[#1E3A8A]/40 uppercase tracking-widest">System Nominal</span>
           </div>
           <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-black text-[#1E3A8A]/40 uppercase tracking-widest">Querying: {searchTerm ? searchTerm.length : 0} Bits</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;