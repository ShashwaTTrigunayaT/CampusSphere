import React from "react";
import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Bookmark } from "lucide-react";
import { logout } from "./Home";

const Profile = () => {
  const [edit ,setEdit] = React.useState(false);
  
  return (
    <main className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center px-6 py-12 bg-gray-50">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-[#1E3A8A] mb-6 font-serif">
        Dashboard
      </h1>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-md p-8 max-w-3xl w-full flex flex-col items-center text-center"
      >
        {/* Profile Picture */}
        <img
          src={localStorage.getItem("data.profileImageURL") || "/default-profile.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full shadow-md mb-4"
        />

        {/* Name + Tagline */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-10">
          {localStorage.getItem("data.name") || "Unknown User"}
        </h2>


        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
            <User className="text-[#c89c5d]" />
            <input 
            type="text"
            value={localStorage.getItem("data.username") || "Unknown Username"}
            onChange={(e)=>{localStorage.setItem("data.username", e.target.value)}}
            disabled={!edit}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            placeholder="Username"
            />
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
            <Mail className="text-[#c89c5d]" />
            <p className="text-gray-700">{localStorage.getItem("data.email") || "Unknown Email"}</p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
            <GraduationCap className="text-[#c89c5d]" />
            <input 
            type="text"
            value={localStorage.getItem("data.institution") || "Unknown Institution"}
            onChange={(e)=>{localStorage.setItem("data.institution", e.target.value)}}
            disabled={!edit}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            placeholder="Institution"
            />
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
            <Bookmark className="text-[#c89c5d]" />
            <p className="text-gray-700">"upcoming Feature"</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-2 rounded-xl bg-[#1E3A8A] text-white font-medium shadow hover:bg-[#142860] transition" onClick={() => setEdit(!edit)}>
            {edit ? "Save Changes" : "Edit Profile"}
          </button>
          <button className="px-6 py-2 rounded-xl border border-red-500 text-red-500 font-medium hover:bg-red-50 transition" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </motion.div>
    </main>
  );
};

export default Profile;
