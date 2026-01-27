import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Zap, Globe, Award, Briefcase, ArrowRight, Info, MessageCircle } from "lucide-react"; 

// Asset Imports (Ensure these paths are still correct)
import hackathonImg from "../assets/images/hackathons.jpg";
import contestImg from "../assets/images/contest.webp";
import internshipImg from "../assets/images/internship.avif";
import festivalsImg from "../assets/images/festivals.jpg";
import logoImg from "/logo.png"; 
import dashboardBgImg from "/dashboard-BG.jpg"; 
import defaultAvatarImg from "/default-Avatar.png"; 

// Keep logout external for reuse
const logout = (setUserActivation, navigate) => {
  localStorage.clear();
  setUserActivation(false);
  navigate("/");
};

// --- Sub-Components ---

const FeaturePill = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-gray-300 text-xs md:text-sm font-medium">
    <Icon className="w-4 h-4 text-blue-500" />
    {text}
  </div>
);

const TabCard = ({ label, image, description, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`
      group relative flex flex-col justify-end w-full h-[350px] p-8 rounded-[2.5rem] cursor-pointer
      transition-all duration-500 ease-out transform hover:-translate-y-3
      ${isActive 
        ? "ring-4 ring-blue-600 shadow-[0_20px_60px_rgba(30,58,138,0.5)] scale-[1.02]" 
        : "border border-white/10 hover:border-blue-500/50"}
      overflow-hidden
    `}
  >
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

    <div className="relative z-10">
      <h3 className="text-white text-3xl font-black mb-2 group-hover:text-blue-400 transition-colors uppercase italic tracking-tighter">
        {label}
      </h3>
      <p className="text-gray-300 text-sm line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity font-medium">
        {description}
      </p>
    </div>

    <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
      <ArrowRight className="text-white w-6 h-6" />
    </div>
  </div>
);

// --- Main Page Component ---

const Home = () => {
  const [UserActivation, setUserActivation] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [counts, setCounts] = useState({ hackathons: 0, contests: 0, internships: 0, festivals: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const tabsData = [
    { id: "Hackathons", label: "Hackathons", image: hackathonImg, description: "Build the future in 48 hours. Connect with mentors and win big.", eventType: "Hackathon" },
    { id: "Contests", label: "Contests", image: contestImg, description: "Competitive programming at its finest. Sharpen your logic.", eventType: "Coding Competition" },
    { id: "Internships", label: "Internships", image: internshipImg, description: "Exclusive roles from top tech firms and innovative startups.", eventType: "Internship" },
    { id: "Festivals", label: "Festivals", image: festivalsImg, description: "Experience the vibrant culture of campus fests and workshops.", eventType: "Fest" },
  ];

  // Fetch Event Counts
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    fetch(`${API_URL}/event`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setCounts({
          hackathons: data.hackathon || 0,
          contests: data.contests || 0,
          internships: data.internship || 0,
          festivals: data.fest || 0
        });
      })
      .catch(() => setError("Failed to sync live event data."));
  }, []);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auth Check (Fixed to handle both old/new storage styles)
  useEffect(() => {
    const token = localStorage.getItem("data.token") || localStorage.getItem("token");
    if (token) setUserActivation(true);
  }, []);

  // Safe Profile Data Retrieval
  const profileImage = localStorage.getItem("data.profileImageURL") || defaultAvatarImg;
  const name = localStorage.getItem("data.name") || "Explorer";

  const handleEventNavigation = (eventType) => {
    localStorage.setItem("activeTab", eventType);
    navigate("/events");
  };

  const crystalStyle = { clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)" };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white scroll-smooth">
      
      {/* 1. Dynamic Navbar */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? "bg-black/90 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer group">
            <img src={logoImg} className="w-10 h-10 rounded-full border border-blue-500 group-hover:rotate-12 transition-transform" alt="Logo" />
            <span className="font-black tracking-tighter text-2xl uppercase italic group-hover:text-blue-400 transition-colors">CampusSphere</span>
          </div>
          
          <div className="flex items-center gap-4">
            {UserActivation ? (
              <div onClick={() => navigate("/profile")} className="flex items-center gap-3 bg-white/5 p-1 pr-4 rounded-full border border-white/10 hover:border-blue-500 transition-all cursor-pointer">
                <img src={profileImage} className="w-9 h-9 rounded-full object-cover border border-blue-500" alt="User" />
                <span className="text-sm font-bold hidden md:block">{name}</span>
              </div>
            ) : (
              <button onClick={() => navigate("/Signin")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-blue-600/20">
                Launch
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* 2. Cinematic Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-20 bg-fixed"
            style={{ backgroundImage: `url(${dashboardBgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-black to-black"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-6xl">
          <div className="flex justify-center gap-3 mb-10 flex-wrap scale-90 md:scale-100">
            <FeaturePill icon={Zap} text="AI Smart Matcher" />
            <FeaturePill icon={Globe} text="Centralized Feed" />
            <FeaturePill icon={Award} text="Verified Badges" />
          </div>

          <h1 className="text-6xl md:text-[100px] font-black mb-8 tracking-tighter leading-[0.9] uppercase italic">
            Connect. Compete. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-600">
              Shine Bright.
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Eliminating fragmentation for developers. Aggregate 
            <span className="text-white italic"> Hackathons</span>, 
            <span className="text-white italic"> Internships</span>, and 
            <span className="text-white italic"> Contests</span> into a single intelligent dashboard.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {!UserActivation ? (
              <>
                <button onClick={() => navigate("/Signup")} className="bg-white text-black px-12 py-5 rounded-full font-black text-xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 shadow-2xl shadow-white/10">
                  GET STARTED
                </button>
                <button onClick={() => navigate("/Signin")} className="bg-transparent border-2 border-white/20 text-white px-12 py-5 rounded-full font-black text-xl hover:bg-white/10 transition-all">
                  LAUNCH APP
                </button>
              </>
            ) : (
              <button onClick={() => navigate("/profile")} className="bg-blue-700 text-white px-14 py-5 rounded-full font-black text-xl hover:shadow-[0_0_40px_rgba(30,58,138,0.6)] transition-all transform hover:scale-105">
                VIEW PROFILE
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-10 py-6 border-y border-white/10 bg-white/[0.02] backdrop-blur-md rounded-2xl md:rounded-full px-12">
            <button onClick={() => navigate("/About")} className="flex items-center gap-2 group text-gray-400 hover:text-white transition-all font-black uppercase tracking-[0.2em] text-xs">
              <Info className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              Our Mission
            </button>
            <div className="hidden md:block w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            <button onClick={() => navigate("/Contacts")} className="flex items-center gap-2 group text-gray-400 hover:text-white transition-all font-black uppercase tracking-[0.2em] text-xs">
              <MessageCircle className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              Inquire
            </button>
            {UserActivation && (
              <>
                <div className="hidden md:block w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                <button onClick={() => logout(setUserActivation, navigate)} className="text-red-500/60 hover:text-red-500 font-black uppercase tracking-[0.2em] text-xs transition-all">
                  Exit Sphere
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 3. The Interactive Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-5xl font-black italic tracking-tighter mb-4 uppercase">Opportunity Feed</h2>
            <div className="h-1.5 w-24 bg-blue-600 rounded-full mb-6"></div>
            <p className="text-gray-500 font-bold text-sm leading-relaxed">
              Real-time aggregation from across the web. Select a category to explore active listings.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] text-right backdrop-blur-md">
            <p className="text-blue-500 font-black text-6xl tracking-tighter leading-none mb-1">
              {counts.hackathons + counts.contests + counts.internships}+
            </p>
            <p className="text-gray-500 text-xs font-black uppercase tracking-[0.3em]">Total Opportunities</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {tabsData.map((tab) => (
            <TabCard
              key={tab.id}
              label={tab.label}
              description={tab.description}
              image={tab.image}
              isActive={activeTab === tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                handleEventNavigation(tab.eventType);
              }}
            />
          ))}
        </div>
      </section>

      {/* 4. Live Statistics */}
      <section className="bg-white/[0.03] border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center group">
            <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Briefcase className="w-10 h-10 text-blue-500" />
            </div>
            <h4 className="text-5xl font-black mb-2 tracking-tighter italic">{counts.internships}</h4>
            <p className="text-gray-500 font-black text-xs uppercase tracking-widest">Active Internships</p>
          </div>
          
          <div className="text-center group md:border-x md:border-white/5">
            <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-10 h-10 text-indigo-500" />
            </div>
            <h4 className="text-5xl font-black mb-2 tracking-tighter italic">{counts.hackathons + counts.contests}</h4>
            <p className="text-gray-500 font-black text-xs uppercase tracking-widest">Global Competitions</p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-purple-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-10 h-10 text-purple-500" />
            </div>
            <h4 className="text-5xl font-black mb-2 tracking-tighter italic">{counts.festivals}</h4>
            <p className="text-gray-500 font-black text-xs uppercase tracking-widest">Campus Festivals</p>
          </div>
        </div>
      </section>

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-10 left-10 z-[200] flex items-center gap-3 bg-red-900/80 backdrop-blur-lg border border-red-500 p-4 rounded-2xl animate-pulse">
          <AlertCircle className="text-white w-6 h-6" />
          <p className="text-white font-bold text-sm">{error}</p>
        </div>
      )}
    </main>
  );
};

export default Home;