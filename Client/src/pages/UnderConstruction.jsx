import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Construction, ArrowLeft, ShieldAlert, Cpu, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';

const UnderConstruction = ({ sectorName = "Requested Node" }) => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden pt-16">
      
      {/* BACKGROUND TECH GRID */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E3A8A_1px,transparent_1px),linear-gradient(to_bottom,#1E3A8A_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
      </div>

      {/* FLOATING GLOWS */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse [animation-delay:1s]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center relative z-10"
      >
        {/* WARNING ICON */}
        <div className="relative inline-flex mb-8">
          <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl animate-ping"></div>
          <div className="relative bg-[#0A0A0A] border-2 border-yellow-500/50 p-6 rounded-[2rem] shadow-2xl">
            <Construction size={48} className="text-yellow-500" />
          </div>
        </div>

        {/* HEADER */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-center gap-2">
            <ShieldAlert size={14} className="text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-500/70">Access Restricted</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter leading-tight">
            Sector <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-400">Under Sync</span>
          </h1>

          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
            Targeting node: <span className="text-white italic">{sectorName}</span>. 
            Engineers are currently calibrating the T-Minus Protocol for this sector. Initialization pending.
          </p>
        </div>

        {/* PROGRESS BOX */}
        <div className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl mb-10 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-blue-500" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Compiling Assets</span>
            </div>
            <span className="text-[9px] font-black text-yellow-500 uppercase">82%</span>
          </div>
          <div className="h-1.5 w-full bg-black rounded-full overflow-hidden p-[2px] border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.4)]"
            ></motion.div>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <ArrowLeft size={16} className="text-gray-500 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Back to Terminal</span>
          </button>
          
          <button 
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-10 py-4 bg-[#1E3A8A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-700 transition-all"
          >
            Mission Home
          </button>
        </div>
      </motion.div>

      {/* INDUSTRIAL BORDER STRIP */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(45deg,#eab308,#eab308_10px,#000_10px,#000_20px)] opacity-30"></div>
    </main>
  );
};

export default UnderConstruction;