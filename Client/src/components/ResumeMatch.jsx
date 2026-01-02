import React, { useState } from 'react';
import { Upload, Sparkles, Loader2, FileText, CheckCircle } from 'lucide-react'; 

const ResumeMatch = ({ onMatchFound, category }) => {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState(null);
  const [fileName, setFileName] = useState("");

  // Default to localhost:5000 if env variable is missing
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setSkills(null); 

    const formData = new FormData();
    formData.append('resume', file);
    // Send the category (Internship/Hackathon) to the backend
    formData.append('category', category); 

    try {
      // 🔴 FIX: This URL must match your server route structure exactly.
      // Based on your setup, it is /api/match/scan-resume
      const response = await fetch(`${API_URL}/api/match/scan-resume`, {
        method: 'POST',
        body: formData,
      });

      // Check if response is okay before parsing JSON
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();

      if (data.matches && data.matches.length > 0) {
        onMatchFound(data.matches, data.detectedSkills);
        setSkills(data.detectedSkills);
      } else {
        setSkills(data.detectedSkills || []);
        alert(`No ${category || 'event'} matches found. Try updating your event tags in the database.`);
      }

    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to analyze resume. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const displayCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) + "s" : "Opportunities";

  return (
    <div className="mb-8 p-1">
      <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-xl p-6 text-center transition-all hover:shadow-2xl hover:bg-white/50">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <Sparkles className="text-purple-600 fill-purple-100" /> 
          Smart {displayCategory} Matcher
        </h2>
        
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Stop searching manually. Upload your resume to find the perfect 
          <span className="font-bold text-purple-600"> {displayCategory} </span>.
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          <label className="relative cursor-pointer group">
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={loading}
            />
            <div className={`flex items-center gap-3 px-8 py-3 rounded-full font-semibold shadow-lg transition-all transform group-hover:scale-105 ${
                loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            }`}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
              <span>{loading ? "Analyzing Skills..." : "Upload Resume (PDF)"}</span>
            </div>
          </label>

          {fileName && !loading && !skills && (
             <p className="text-sm text-gray-500 flex items-center gap-1">
                <FileText size={14}/> Selected: {fileName}
             </p>
          )}
        </div>

        {skills && (
          <div className="mt-6 animate-fade-in-up bg-white/60 p-4 rounded-xl border border-white/50 inline-block">
            <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide flex items-center justify-center gap-1">
               <CheckCircle size={14} className="text-green-500"/> Skills Detected
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResumeMatch;