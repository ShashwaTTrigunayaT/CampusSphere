import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Bot, XCircle, RotateCcw } from 'lucide-react';

const AIPrepCard = ({ event, user }) => {
  const [strategy, setStrategy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
 const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // ⚡ The Action
  const generateStrategy = async () => {
    setLoading(true);
    setError(false);

    try {
        const response = await fetch(`${API_URL}/ai/generate-strategy`, {
          method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventTitle: event.title,
          eventDescription: event.description,
          userSkills: user?.skills || [] 
        })
      });

      const data = await response.json();

      if (data.success) {
        setStrategy(data.strategy);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("AI Fetch Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    // "Inset" Look: Darker cream background to look like a drawer inside the card
    <div className="w-full relative bg-[#EAE4D9] border-t border-[#1E3A8A]/10 shadow-inner">
      
      {/* Decorative Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50"></div>

      {/* --- BODY --- */}
      <div className="p-6">
        
        {/* HEADER: Updated Name */}
        <div className="flex items-center justify-between mb-4 opacity-70">
            <div className="flex items-center gap-2">
                <Bot size={16} className="text-[#1E3A8A]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1E3A8A]">
                    CampusSphere AI
                </span>
            </div>
            {loading && <span className="text-[10px] font-bold text-purple-600 animate-pulse">THINKING...</span>}
        </div>

        {/* STATE 1: Call to Action (Initial) */}
        {!strategy && !loading && (
          <div className="flex flex-col items-center text-center space-y-4">
            <p className="text-[#1E3A8A]/80 text-xs font-medium leading-relaxed max-w-[90%]">
              Tap below to generate a tailored roadmap based on your skills and this event's requirements.
            </p>
            
            <button 
              onClick={generateStrategy}
              className="group relative flex items-center gap-2 bg-[#1E3A8A] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-purple-700 transition-all shadow-md active:scale-95"
            >
              <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
              <span>Generate Plan</span>
            </button>

            {error && (
              <span className="text-red-500 text-[10px] font-bold flex items-center gap-1">
                <XCircle size={10} /> Service Busy - Try Again
              </span>
            )}
          </div>
        )}

        {/* STATE 2: Loading (Subtle pulse) */}
        {loading && (
          <div className="space-y-3 px-2">
            <div className="h-2 bg-[#1E3A8A]/10 rounded-full w-full animate-pulse"></div>
            <div className="h-2 bg-[#1E3A8A]/10 rounded-full w-3/4 animate-pulse delay-75"></div>
            <div className="h-2 bg-[#1E3A8A]/10 rounded-full w-5/6 animate-pulse delay-150"></div>
          </div>
        )}

        {/* STATE 3: The Result (Clean Text) */}
        {strategy && (
          <div className="animate-in fade-in duration-500">
            <div className="prose prose-sm max-w-none text-[#1E3A8A]">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-sm font-black text-purple-800 uppercase tracking-wider mb-3 mt-1" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xs font-bold text-[#1E3A8A] uppercase mt-4 mb-2 flex items-center gap-2 before:content-['•'] before:text-purple-500" {...props} />,
                  p: ({node, ...props}) => <p className="text-xs text-[#1E3A8A]/80 leading-relaxed mb-3 font-medium" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-none space-y-1 mb-3 ml-1" {...props} />,
                  li: ({node, ...props}) => <li className="text-xs text-[#1E3A8A]/80 pl-3 border-l-2 border-purple-300" {...props} />,
                  strong: ({node, ...props}) => <strong className="text-purple-700 font-bold" {...props} />,
                }}
              >
                {strategy}
              </ReactMarkdown>
            </div>

            {/* Footer Action */}
            <div className="mt-6 pt-4 border-t border-[#1E3A8A]/10 flex justify-end">
              <button 
                onClick={() => setStrategy(null)}
                className="text-[10px] font-black text-[#1E3A8A]/50 hover:text-purple-600 uppercase tracking-widest flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={10} /> Regenerate
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AIPrepCard;