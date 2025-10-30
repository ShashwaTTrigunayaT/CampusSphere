import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Bell,
  Bookmark,
  Calendar,
  Briefcase,
  Edit3,
  LogOut,
  Code,
  Layers,
  Camera,
  AlertCircle, 
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const LoadingSpinner = ({ text }) => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    <p className="ml-4 text-lg text-gray-600">{text}</p>
  </div>
);


const ErrorMessage = ({ error }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center gap-2">
    <AlertCircle className="w-5 h-5" />
    <span>Error: {error}</span>
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

  
  const [username, setUsername] = useState(
    localStorage.getItem("data.username") || "Unknown Username"
  );
  const [name] = useState(localStorage.getItem("data.name") || "Unknown User");
  const [email] = useState(
    localStorage.getItem("data.email") || "Unknown Email"
  );
  const [institution, setInstitution] = useState(
    localStorage.getItem("data.institution") || "Unknown Institution"
  );
  const [profileImageURL, setProfileImageURL] = useState(
    localStorage.getItem("data.profileImageURL") || "/default-profile.png"
  );
  const [projects, setProjects] = useState(
    localStorage.getItem("data.projects") || ""
  );
  const [skills, setSkills] = useState(
    localStorage.getItem("data.skills") || ""
  );
  const [aboutMe, setAboutMe] = useState(
    localStorage.getItem("data.aboutMe") || "Write something about yourself..."
  );
  const [githubLink, setGithubLink] = useState(
    localStorage.getItem("data.github") || ""
  );
  const [linkedinLink, setLinkedinLink] = useState(
    localStorage.getItem("data.linkedin") || ""
  );

  const eventData = JSON.parse(localStorage.getItem("data.eventData") || "{}");
  const [alerts, setAlerts] = useState(eventData.alerts || []);
  const [bookmarks, setBookmarks] = useState(eventData.bookmarks || []);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  
  useEffect(() => {
    const userId = localStorage.getItem("data.email");
    if (!userId) return;

    fetch(`${API_URL}/user/updatebookmarksandalerts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => {
        if (!res.ok) console.error("Failed to update bookmarks/alerts count.");
      })
      .catch((err) => {
        console.error("Error updating bookmarks/alerts:", err);
      });
  }, [API_URL]); 
  
  useEffect(() => {
    const token = localStorage.getItem("data.token");
    const email = localStorage.getItem("data.email");

    if (token && email) {
      setIsLoadingData(true);
      setError(null);

      fetch(`${API_URL}/user/update-profile/${email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch profile data.");
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            const profileData = data.data;

            
            localStorage.setItem("data.username", profileData.username || "");
            localStorage.setItem(
              "data.institution",
              profileData.institution || ""
            );
            localStorage.setItem("data.aboutMe", profileData.aboutSelf || "");
            localStorage.setItem("data.github", profileData.githubURL || "");
            localStorage.setItem("data.linkedin", profileData.linkedinURL || "");
            localStorage.setItem("data.projects", profileData.projects || "");
            localStorage.setItem("data.skills", profileData.skills || "");
            localStorage.setItem(
              "data.profileImageURL",
              profileData.profileImageURL || "/default-profile.png"
            );
            localStorage.setItem(
              "data.eventData",
              JSON.stringify(profileData.eventData || {})
            );

            
            setUsername(profileData.username || "Unknown Username");
            setInstitution(
              profileData.institution || "Unknown Institution"
            );
            setAboutMe(
              profileData.aboutSelf || "Write something about yourself..."
            );
            setGithubLink(profileData.githubURL || "");
            setLinkedinLink(profileData.linkedinURL || "");
            setProjects(profileData.projects || "");
            setSkills(profileData.skills || "");
            setProfileImageURL(
              profileData.profileImageURL || "/default-profile.png"
            );

            const eventData = profileData.eventData || {};
            setAlerts(eventData.alerts || []);
            setBookmarks(eventData.bookmarks || []);
          } else {
            throw new Error(data.message || "Failed to fetch user data.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError(error.message);
        })
        .finally(() => {
          setIsLoadingData(false);
        });
    } else {
      setIsLoadingData(false);
      setError("You are not logged in.");
      
    }
  }, [dataVersion, API_URL]); 

  const logoutUser = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    if (edit && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  
  const saveChanges = async () => {
    setIsSaving(true);
    setError(null);
    const token = localStorage.getItem("data.token");

    if (!token) {
      setError("Authentication error. Please log in again.");
      setIsSaving(false);
      return;
    }

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

      if (selectedImage) {
        formData.append("profileImage", selectedImage);
      }

      const res = await fetch(`${API_URL}/user/update-credentials`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        
        
        setDataVersion(dataVersion + 1);
        

        
        setSelectedImage(null);
        setImagePreview(null);
        setEdit(false);
      } else {
        setError(result.message || "Update failed. Please try again.");
      }
    } catch (err) {
      console.error("Error updating credentials:", err);
      setError("An error occurred. Please check your network and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
        <LoadingSpinner text="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
      {/* Top Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-b-3xl relative shadow-lg">
        <div className="absolute inset-0 opacity-20 bg-[url('/blob.svg')] bg-cover"></div>
      </div>

      <main className="mt-20 mb-5">
        {/* Floating Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="-mt-16 mx-auto w-11/12 md:w-3/4 lg:w-2/3 bg-white/70 backdrop-blur-xl rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 border border-white/40 shadow-xl"
        >
          {/* Profile Image */}
          <div className="relative">
            <img
              src={imagePreview || profileImageURL}
              alt="Profile"
              className="w-32 h-32 rounded-2xl object-cover shadow-md border-4 border-white"
            />
            {edit && (
              <div
                className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center cursor-pointer group"
                onClick={handleImageClick}
              >
                <Camera className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <p className="text-3xl font-bold text-gray-800 text-center md:text-left w-full">
              {name}
            </p>

            {/* Username */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!edit}
              className="text-gray-600 bg-transparent rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-transparent"
              placeholder="Username"
            />

            {/* Email */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
              <Mail className="w-5 h-5 text-red-500" />
              <span>{email}</span>
            </div>

            {/* Institution */}
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              disabled={!edit}
              className="text-gray-600 bg-transparent rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-transparent"
              placeholder="Institution"
            />

            {/* Error Message Display */}
            {error && <ErrorMessage error={error} />}

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4 mt-3">
              <button
                onClick={() => (edit ? saveChanges() : setEdit(true))}
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700 transition disabled:opacity-50"
                disabled={isSaving}
              >
                <Edit3 size={16} />
                {edit
                  ? isSaving
                    ? "Saving..."
                    : "Save Changes"
                  : "Edit Profile"}
              </button>
              <button
                onClick={logoutUser}
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4 mt-3">
              {edit ? (
                <>
                  <input
                    type="text"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="GitHub URL"
                    className="border rounded px-2 py-1 w-full"
                  />
                  <input
                    type="text"
                    value={linkedinLink}
                    onChange={(e) => setLinkedinLink(e.target.value)}
                    placeholder="LinkedIn URL"
                    className="border rounded px-2 py-1 w-full"
                  />
                </>
              ) : (
                <>
                  <a
                    href={githubLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white/60 rounded-full shadow hover:scale-110 transition"
                  >
                    <Github className="w-5 h-5 text-gray-800" />
                  </a>
                  <a
                    href={linkedinLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-white/60 rounded-full shadow hover:scale-110 transition"
                  >
                    <Linkedin className="w-5 h-5 text-blue-700" />
                  </a>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 md:w-3/4 lg:w-2/3 mx-auto"
        >
          {[
            {
              icon: <Bell className="w-6 h-6 text-yellow-500" />,
              label: "Alerts",
              value: alerts?.length || 0,
              onClick: () => {
                navigate("/alerts");
              },
            },
            {
              icon: <Bookmark className="w-6 h-6 text-indigo-600" />,
              label: "Bookmarks",
              value: bookmarks?.length || 0,
              onClick: () => {
                navigate("/bookmarks");
              },
            },
            {
              icon: <Calendar className="w-6 h-6 text-pink-500" />,
              label: "Upcoming",
              value: upcomingEventsCount || 0,
              onClick: () => {
                navigate("/upcoming");
              },
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-md p-6 rounded-2xl flex items-center gap-4 shadow hover:shadow-xl transition cursor-pointer"
              onClick={stat.onClick}
            >
              {stat.icon}
              <div>
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* About + Activity Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-11/12 md:w-3/4 lg:w-2/3 mx-auto"
        >
          {/* Contact Info */}
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Contact Info
            </h2>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-indigo-500" /> <span>{email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-70Z00">
              <Briefcase className="w-5 h-5 text-purple-500" />{" "}
              <span>{institution}</span>
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              About Me
            </h2>
            {edit ? (
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-500"
                rows="4"
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{aboutMe}</p>
            )}
          </div>

          {/* --- SKILLS --- */}
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-3">
              <Code className="w-5 h-5 text-blue-500" /> Skills
            </h2>
            {edit ? (
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. React, Node.js, Python"
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {skills || "No skills listed."}
              </p>
            )}
          </div>

          {/* --- PROJECTS --- */}
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-3">
              <Layers className="w-5 h-5 text-green-500" /> Projects
            </h2>
            {edit ? (
              <textarea
                value={projects}
                onChange={(e) => setProjects(e.target.value)}
                className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-500"
                rows="4"
                placeholder="List your projects, perhaps with descriptions and links..."
              />
            ) : (
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {projects || "No projects listed."}
              </p>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;