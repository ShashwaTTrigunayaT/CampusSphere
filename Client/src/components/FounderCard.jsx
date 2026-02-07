import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Cpu, ShieldCheck, Activity } from 'lucide-react';

const FounderCard = () => {
  // Securely fetch name from Vite Env
  const creatorName = import.meta.env.VITE_CREATOR_NAME || "System Architect";
  
  // Generate Initials for the Avatar (e.g., "ST")
  const initials = creatorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative group w-full max-w-md"
      >
        {/* Outer Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-[#080808] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden backdrop-blur-2xl">
          
          {/* Animated Scanning Light Beam */}
          <motion.div 
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent z-10 pointer-events-none"
          />

          {/* Top Section: Identity Header */}
          <div className="flex justify-between items-start mb-10 relative z-20">
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit">
                <Fingerprint className="w-3 h-3 text-blue-400" />
                <span className="text-[9px] font-black tracking-[0.2em] text-blue-400 uppercase">
                  Identity Verified
                </span>
              </div>
              
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-[0.9]">
                {creatorName.split(' ')[0]} <br />
                <span className="text-blue-500">{creatorName.split(' ')[1]}</span>
              </h2>
            </div>
            
            {/* Pulsing Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:border-blue-500/50 transition-colors">
                <span className="text-3xl font-black italic text-white z-10">{initials}</span>
                <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
              </div>
              {/* Online Pulse Indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#080808] rounded-full flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
              </div>
            </div>
          </div>

          {/* Middle Section: Security Clearance Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8 relative z-20 text-left">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <p className="text-[8px] uppercase tracking-[0.3em] text-gray-500 mb-1 font-bold">Clearance</p>
              <p className="text-xs font-black text-blue-400 italic uppercase">Genesis Creator</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <p className="text-[8px] uppercase tracking-[0.3em] text-gray-500 mb-1 font-bold">Node Status</p>
              <div className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-emerald-500" />
                <p className="text-xs font-black text-white italic uppercase tracking-tighter">Active</p>
              </div>
            </div>
          </div>

          {/* Bottom Section: System Intelligence Status */}
          <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-20">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-bold text-gray-400 italic uppercase tracking-widest">
                  Blueprint Engine v1.0
                </span>
              </div>
              <p className="text-[9px] text-gray-600 font-medium ml-6">
                Llama-3-Groq-Inference: Synchronized
              </p>
            </div>
            <ShieldCheck className="w-5 h-5 text-white/20 group-hover:text-blue-500/50 transition-colors" />
          </div>

          {/* Background Decorative Element */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/10 blur-[50px] rounded-full pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
};

export default FounderCard;