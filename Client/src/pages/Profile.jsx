import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Bell, Bookmark, Calendar, Briefcase, Edit3, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { body } from "framer-motion/client";

const Profile = () => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("data.token")) {
      fetch(`http://localhost:5000/user/update-profile`, {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("data.token")}`,

        },
        body: JSON.stringify({
          email: localStorage.getItem("data.email"),
          
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("User data fetched successfully:", data);
            return;
            // Update localStorage with the fetched data
            localStorage.setItem("data.username", data.username);
            localStorage.setItem("data.email", data.email);
            localStorage.setItem("data.institution", data.institution);
            localStorage.setItem("data.profileImageURL", data.profileImageURL);
            localStorage.setItem("data.aboutMe", data.aboutMe);
            localStorage.setItem("data.github", data.github);
            localStorage.setItem("data.linkedin", data.linkedin);
          } else {
            console.error("Failed to fetch user data:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  // State from localStorage
  const [username, setUsername] = useState(localStorage.getItem("data.username") || "Unknown Username");
  const [name] = useState(localStorage.getItem("data.name") || "Unknown User");
  const [email] = useState(localStorage.getItem("data.email") || "Unknown Email");
  const [institution, setInstitution] = useState(localStorage.getItem("data.institution") || "Unknown Institution");
  const [profileImageURL] = useState(localStorage.getItem("data.profileImageURL") || "/default-profile.png");
  const eventData = JSON.parse(localStorage.getItem("data.eventData") || "{}");

  // NEW STATES
  const [aboutMe, setAboutMe] = useState(
    localStorage.getItem("data.aboutMe") || "Write something about yourself..."
  );
  const [githubLink, setGithubLink] = useState(localStorage.getItem("data.github") || "");
  const [linkedinLink, setLinkedinLink] = useState(localStorage.getItem("data.linkedin") || "");

  const logoutUser = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const saveChanges = async () => {
  try {
    const res = await fetch("http://localhost:5000/user/update-credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("data.token")}`, // optional if you use token auth
      },
      body: JSON.stringify({
        email: localStorage.getItem("data.email"), // required
        username,       // optional
        institution,    // optional
        aboutMe,        // optional (from editable About Me field)
        githubLink,     // optional (from editable social field)
        linkedinLink,   // optional (from editable social field)
      }),
    });

    const result = await res.json();
    if (res.ok) {
      // Update localStorage if backend update succeeds
      localStorage.setItem("data.username", username);
      localStorage.setItem("data.institution", institution);
      localStorage.setItem("data.aboutMe", aboutMe);
      localStorage.setItem("data.githubLink", githubLink);
      localStorage.setItem("data.linkedinLink", linkedinLink);
      setEdit(false);
      console.log("Credentials updated successfully");
    } else {
      console.error("Backend update failed:", result.message);
    }
  } catch (err) {
    console.error("Error updating credentials:", err);
  }
};

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
          <img
            src={profileImageURL}
            alt="Profile"
            className="w-32 h-32 rounded-2xl object-cover shadow-md border-4 border-white"
          />

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <p className="text-3xl font-bold text-gray-800 text-center md:text-left w-full">{name}</p>

            {/* Username */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!edit}
              className="focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
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
              className="focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              placeholder="Institution"
            />

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4 mt-3">
              <button
                onClick={() => (edit ? saveChanges() : setEdit(true))}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
              >
                <Edit3 size={16} /> {edit ? "Save Changes" : "Edit Profile"}
              </button>
              <button
                onClick={logoutUser}
                className="flex items-center gap-2 px-6 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition"
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
            { icon: <Bell className="w-6 h-6 text-yellow-500" />, label: "Alerts", value: eventData.alerts?.length || 0 },
            { icon: <Bookmark className="w-6 h-6 text-indigo-600" />, label: "Bookmarks", value: eventData.bookmarks?.length || 0 },
            { icon: <Calendar className="w-6 h-6 text-pink-500" />, label: "Upcoming", value: "3" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-md p-6 rounded-2xl flex items-center gap-4 shadow hover:shadow-xl transition"
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
            <h2 className="text-xl font-semibold text-gray-800">Contact Info</h2>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-indigo-500" /> <span>{email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Briefcase className="w-5 h-5 text-purple-500" /> <span>{institution}</span>
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">About Me</h2>
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
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
