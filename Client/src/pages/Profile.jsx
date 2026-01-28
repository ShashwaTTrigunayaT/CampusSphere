import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail, Github, Linkedin, Bell, Bookmark, Calendar,
  Briefcase, Edit3, LogOut, Code, Layers, Camera,
  AlertCircle, Sparkles, User, ShieldCheck, ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoadingSpinner = ({ text }) => (
  <div className="flex flex-col justify-center items-center h-64 space-y-4">
    <div className="relative">
      <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 relative"></div>
    </div>
    <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-xs">{text}</p>
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl relative flex items-center gap-3">
    <AlertCircle className="w-5 h-5" />
    <span className="text-xs font-bold uppercase tracking-tight">System Error: {error}</span>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [isLoadingData, setIsLoadingData] = useState(true); 
  const [isSaving, setIsSaving] = useState(false); 
  const [error, setError] = useState(null);
  const [dataVersion, setDataVersion] = useState(0); 

  // State initialization from localStorage
  const [username, setUsername] = useState(localStorage.getItem("data.username") || "Unknown");
  const [name] = useState(localStorage.getItem("data.name") || "Pilot");
  const [email] = useState(localStorage.getItem("data.email") || "Classified");
  const [institution, setInstitution] = useState(localStorage.getItem("data.institution") || "Unknown Entity");
  const [profileImageURL, setProfileImageURL] = useState(localStorage.getItem("data.profileImageURL") || "/default-profile.png");
  const [projects, setProjects] = useState(localStorage.getItem("data.projects") || "");
  const [skills, setSkills] = useState(localStorage.getItem("data.skills") || "");
  const [aboutMe, setAboutMe] = useState(localStorage.getItem("data.aboutMe") || "No briefing provided.");
  const [githubLink, setGithubLink] = useState(localStorage.getItem("data.github") || "");
  const [linkedinLink, setLinkedinLink] = useState(localStorage.getItem("data.linkedin") || "");

  const eventData = JSON.parse(localStorage.getItem("data.eventData") || "{}");
  const [alerts, setAlerts] = useState(eventData.alerts || []);
  const [bookmarks, setBookmarks] = useState(eventData.bookmarks || []);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Data Fetching logic (Kept intact)
  useEffect(() => {
    const userId = localStorage.getItem("data.email");
    if (!userId) return;
    fetch(`${API_URL}/user/updatebookmarksandalerts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }).catch(err => console.error(err));
  }, [API_URL]);

  useEffect(() => {
    const token = localStorage.getItem("data.token");
    const email = localStorage.getItem("data.email");
    if (token && email) {
      setIsLoadingData(true);
      fetch(`${API_URL}/user/update-profile/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const profileData = data.data;
          // LocalStorage Sync
          Object.keys(profileData).forEach(key => {
            if (typeof profileData[key] === 'string') localStorage.setItem(`data.${key}`, profileData[key]);
          });
          // State Sync
          setUsername(profileData.username || "");
          setInstitution(profileData.institution || "");
          setAboutMe(profileData.aboutSelf || "");
          setGithubLink(profileData.githubURL || "");
          setLinkedinLink(profileData.linkedinURL || "");
          setProjects(profileData.projects || "");
          setSkills(profileData.skills || "");
          setProfileImageURL(profileData.profileImageURL || "/default-profile.png");
          setAlerts(profileData.eventData?.alerts || []);
          setBookmarks(profileData.eventData?.bookmarks || []);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setIsLoadingData(false));
    }
  }, [dataVersion, API_URL]);

  const logoutUser = () => { localStorage.clear(); navigate("/signin"); };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setSelectedImage(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const saveChanges = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("data.token");
    try {
      const formData = new FormData();
      formData.append("email", localStorage.getItem("data.email"));
      formData.append("username", username);
      formData.append("institution", institution);
      formData.append("aboutSelf", aboutMe);
      formData.append("githubURL", githubLink);
      formData.append("linkedinURL", linkedinLink);
      formData.append("projects", projects);
      formData.append("skills", skills);
      if (selectedImage) formData.append("profileImage", selectedImage);

      const res = await fetch(`${API_URL}/user/update-credentials`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        setDataVersion(v => v + 1);
        setEdit(false);
      }
    } catch (err) { setError("Update synchronization failed."); }
    finally { setIsSaving(false); }
  };

  if (isLoadingData) return <div className="min-h-screen bg-[#050505]"><LoadingSpinner text="Accessing User Database..." /></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20 selection:bg-blue-500/30 font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-900/5 to-transparent"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Cinematic Banner */}
      <div className="w-full h-64 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <main className="max-w-6xl mx-auto px-6">
        {/* Profile Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="-mt-32 relative z-10 bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-10"
        >
          {/* Image Handler */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative w-40 h-40 rounded-[2rem] overflow-hidden border border-white/10 bg-black">
              <img src={imagePreview || profileImageURL} alt="Profile" className="w-full h-full object-cover" />
              {edit && (
                <div onClick={() => fileInputRef.current.click()} className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-blue-400" />
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Verified Pilot</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                {name}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-center md:justify-start gap-3 bg-white/5 border border-white/5 p-3 rounded-xl">
                <User className="w-4 h-4 text-gray-500" />
                <input disabled={!edit} value={username} onChange={(e) => setUsername(e.target.value)} className="bg-transparent text-sm font-bold focus:outline-none disabled:text-gray-400" placeholder="Username" />
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 bg-white/5 border border-white/5 p-3 rounded-xl">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-400">{email}</span>
              </div>
            </div>

            {error && <ErrorMessage error={error} />}

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <button onClick={() => (edit ? saveChanges() : setEdit(true))} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20">
                {edit ? (isSaving ? "Syncing..." : "Commit Changes") : "Modify Intel"}
              </button>
              <button onClick={logoutUser} className="flex items-center gap-2 px-8 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:bg-red-500/10 hover:text-red-500 transition-all">
                <LogOut size={14} /> Terminate Session
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { icon: <Bell className="text-blue-500" />, label: "Alerts", val: alerts?.length || 0, path: "/alerts" },
            { icon: <Bookmark className="text-purple-500" />, label: "Saved", val: bookmarks?.length || 0, path: "/bookmarks" },
            { icon: <Calendar className="text-emerald-500" />, label: "Events", val: 0, path: "/underconstruction" },
            { icon: <Github className="text-gray-400" />, label: "Git Repo", val: githubLink ? 1 : 0, path: githubLink }
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} onClick={() => stat.path.startsWith('http') ? window.open(stat.path) : navigate(stat.path)} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl cursor-pointer hover:bg-white/[0.05] transition-all">
              <div className="mb-4">{stat.icon}</div>
              <p className="text-2xl font-black italic tracking-tighter">{stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* About Briefing */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-6 flex items-center gap-2">
              <Sparkles size={14} /> Personnel Briefing
            </h2>
            {edit ? (
              <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-all" rows="4" />
            ) : (
              <p className="text-gray-400 text-sm leading-relaxed font-medium">{aboutMe}</p>
            )}
          </div>

          {/* Core Skills */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-purple-500 mb-6 flex items-center gap-2">
              <Code size={14} /> Technical Stack
            </h2>
            {edit ? (
              <input value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none" placeholder="e.g. React, Python" />
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills ? skills.split(',').map((s, i) => (
                  <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] font-black uppercase text-gray-300">{s.trim()}</span>
                )) : <span className="text-gray-600 text-xs italic">No skills cataloged.</span>}
              </div>
            )}
          </div>

          {/* Social Nodes */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl md:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6 flex items-center gap-2">
              <ExternalLink size={14} /> Network Nodes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Institution</label>
                <input disabled={!edit} value={institution} onChange={(e) => setInstitution(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm font-bold text-white focus:outline-none disabled:opacity-50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">LinkedIn / Professional</label>
                <input disabled={!edit} value={linkedinLink} onChange={(e) => setLinkedinLink(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm font-bold text-white focus:outline-none disabled:opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;