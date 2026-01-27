import React, { useState } from 'react';
import { Upload, Sparkles, Loader2, FileText, CheckCircle, Zap } from 'lucide-react'; 

const ResumeMatch = ({ onMatchFound, category }) => {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState(null);
  const [fileName, setFileName] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setLoading(true);
    setSkills(null); 

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('category', category); 

    try {
      const response = await fetch(`${API_URL}/api/match/scan-resume`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const data = await response.json();

      if (data.matches && data.matches.length > 0) {
        onMatchFound(data.matches, data.detectedSkills);
        setSkills(data.detectedSkills);
      } else {
        setSkills(data.detectedSkills || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : "Opportunity";

  return (
    <div className="mb-6 w-full max-w-4xl mx-auto group">
      {/* Main Glass Card */}
      <div className="relative overflow-hidden rounded-[1.5rem] bg-[#F6F1E7]/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-5 transition-all duration-500 hover:shadow-[0_8px_32px_0_rgba(30,58,138,0.15)] hover:-translate-y-1">
        
        {/* Animated Gradient Accent */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#1E3A8A] via-blue-400 to-[#1E3A8A] bg-[length:200%_auto] animate-gradient-x"></div>

        <div className="flex flex-col md:flex-row items-center gap-5">
          
          {/* Visual Identity Section */}
          <div className="relative flex items-center justify-center shrink-0">
             <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-all"></div>
             <div className="relative p-3 bg-white border border-[#1E3A8A]/10 rounded-2xl shadow-inner">
                <Sparkles className="text-[#1E3A8A]" size={24} />
             </div>
          </div>

          {/* Core Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-[#1E3A8A] flex items-center justify-center md:justify-start gap-2">
              Neural <span className="text-blue-500">{displayCategory}</span> Engine
            </h2>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mt-0.5 opacity-70">
              Synchronizing resume metadata with active campus nodes
            </p>
          </div>

          {/* Upload Interactive Zone */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <label className="relative cursor-pointer">
              <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} disabled={loading} />
              <div className={`group/btn relative flex items-center gap-3 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all duration-300 overflow-hidden ${
                  loading 
                  ? "bg-gray-200 text-gray-400" 
                  : "bg-[#1E3A8A] text-white hover:shadow-lg hover:shadow-blue-900/20 active:scale-95"
              }`}>
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                
                {loading ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} className="fill-current" />}
                <span className="relative z-10">{loading ? "Scanning..." : "Sync Resume"}</span>
              </div>
            </label>
            {fileName && !loading && (
               <div className="flex items-center gap-1 px-2 py-0.5 bg-white/50 rounded-md border border-black/5 animate-fade-in">
                 <FileText size={10} className="text-[#1E3A8A]"/> 
                 <span className="text-[9px] font-bold text-gray-400 uppercase truncate max-w-[120px]">{fileName}</span>
               </div>
            )}
          </div>
        </div>

        {/* Skill Tags: The "Metadata" look */}
        {skills && (
          <div className="mt-5 pt-4 border-t border-[#1E3A8A]/5 flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-black text-[#1E3A8A]/30 uppercase tracking-[0.2em] flex items-center gap-1.5 mr-2">
               <CheckCircle size={12} className="text-green-500"/> Data Extracted:
            </span>
            {skills.slice(0, 10).map((skill, index) => (
              <span key={index} className="px-2.5 py-1 bg-white border border-[#1E3A8A]/5 text-[#1E3A8A] rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm hover:border-blue-400 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tailwind Custom Animations - Add these to your global CSS or tailwind.config */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
      `}} />
    </div>
  );
};

export default ResumeMatch;