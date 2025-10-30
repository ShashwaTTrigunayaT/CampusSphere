import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react"; 




import hackathonImg from "../assets/images/hackathons.jpg";
import contestImg from "../assets/images/contest.webp";
import internshipImg from "../assets/images/internship.avif";
import festivalsImg from "../assets/images/festivals.jpg";
import logoImg from "/logo.png"; 
import dashboardBgImg from "/dashboard-BG.jpg"; 
import defaultAvatarImg from "/default-Avatar.png"; 




const logout = (setUserActivation, navigate) => {
  localStorage.clear();
  setUserActivation(false);
  navigate("/");
};




const TabCard = ({ label, image, description, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`
      relative flex flex-col justify-end w- 2/5 md:w-2/5 h-[300px] p-6 rounded-3xl cursor-pointer
      transition-all duration-300 ease-in-out transform hover:scale-105
      ${
        isActive
          ? "border-2 border-[#1E3A8A] shadow-[0_0_40px_rgba(30,58,138,0.6)]"
          : "border border-gray-800 shadow-lg hover:shadow-[0_0_30px_rgba(30,58,138,0.4)]"
      }
      bg-gradient-to-t from-black/80 to-black/40
      hover:brightness-110
    `}
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
    <div className="relative z-10">
      <p className="text-white text-2xl md:text-3xl font-bold drop-shadow-[0_0_10px_#1E3A8A]">
        {label}
      </p>
      {description && (
        <p className="text-gray-200 mt-2 md:mt-4 text-sm md:text-base">
          {description}
        </p>
      )}
    </div>
    {isActive && (
      <div className="absolute bottom-4 w-3/4 h-1.5 rounded-full bg-[#1E3A8A] animate-pulse z-10"></div>
    )}
  </div>
);


const ErrorMessage = ({ error }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center gap-2">
    <AlertCircle className="w-5 h-5" />
    <span>{error}</span>
  </div>
);




const Home = () => {
  const [UserActivation, setUserActivation] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [hackathonlen, setHackathonlen] = useState(0);
  const [contestlen, setContestlen] = useState(0);
  const [internshiplen, setInternshiplen] = useState(0);
  const [festivallen, setFestivallen] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const tabsData = [
    
    
    {
      id: "Hackathons",
      label: "Hackathons",
      image: hackathonImg,
      description: "Participate in exciting hackathons.",
      eventType: "Hackathons",
    },
    {
      id: "Contests",
      label: "Contests",
      image: contestImg,
      description: "Compete in coding competitions.",
      eventType: "Coding Competition",
    },
    {
      id: "Internships",
      label: "Internships",
      image: internshipImg,
      description: "Find your dream internship.",
      eventType: null,
    },
    {
      id: "Festivals",
      label: "Festivals",
      image: festivalsImg,
      description: "Join college festivals & events.",
      eventType: null,
    },
  ];

  useEffect(() => {
    
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    
    setError(null); 
    
    fetch(`${API_URL}/event`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const hackathonlen = data.hackathon;
        const contestlen = data.contests;
        const internshiplen = data.internship;
        const festivallen = data.fest;
        localStorage.setItem("hackathonlen", hackathonlen);
        localStorage.setItem("contestlen", contestlen);
        localStorage.setItem("internshiplen", internshiplen);
        localStorage.setItem("festivallen", festivallen);
        setHackathonlen(hackathonlen);
        setContestlen(contestlen);
        setInternshiplen(internshiplen);
        setFestivallen(festivallen);
      })
      .catch((error) => {
        
        console.error("Error fetching events:", error);
        setError("Could not load event counts. Please refresh the page.");
      });
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const eventViewer = (tab) => {
    localStorage.setItem("activeTab", tab);
    navigate("/events");
  };

  const handleTabClick = (tabId, eventType) => {
    setActiveTab(tabId);
    if (eventType) eventViewer(eventType);
  };

  const handleRoute = (route) => navigate(route);

  useEffect(() => {
    const user = localStorage.getItem("data.token");
    if (user) setUserActivation(true);
  }, []);

  const profileImage =
    localStorage.getItem("data.profileImageURL") || defaultAvatarImg;
  const name = localStorage.getItem("data.name") || "User";

  const premiumButtonClasses = `
    px-6 py-3 text-white font-bold rounded-3xl
    bg-gradient-to-br from-[#1E3A8A] to-[#162A60]
    shadow-xl shadow-[#1E3A8A]/50
    transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-2xl hover:brightness-110
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3A8A]
  `;

  const crystalShapeStyle = {
    clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
  };

  return (
    <main className="min-h-screen relative bg-gradient-to-b from-gray-900 via-black to-gray-900 scroll-smooth ">
      {/* Scroll-activated header */}
      {UserActivation && (
        <nav
          className={`
            fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out
            ${
              isScrolled
                ? "bg-gray-950/80 backdrop-blur-lg border-b border-[#1E3A8A]/50 shadow-lg"
                : "bg-transparent border-b border-transparent"
            }
          `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              {/* Logo */}
              <div
                onClick={() => navigate("/")}
                className="cursor-pointer"
              >
                <img
                  className="w-12 h-12 rounded-full border-2 border-[#1E3A8A]"
                  src={logoImg}
                  alt="CampusSphere Logo"
                />
              </div>

              {/* Profile Card */}
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 cursor-pointer rounded-full p-2 transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={profileImage}
                  className="w-12 h-12 rounded-full border-2 border-[#1E3A8A] object-cover" 
                  alt="User Profile"
                />
                <p className="text-white font-semibold text-lg mr-3 hidden sm:block">
                  {name}
                </p>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <section
        className="min-h-screen flex flex-col items-center text-center px-6 relative mb-5 border-4 border-[#1E3A8A]"
        style={{
          backgroundImage: `url(${dashboardBgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={logoImg}
          className="h-24 md:h-36 mx-auto animate-bounce mt-24"
          alt="CampusSphere Logo"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1E3A8A] drop-shadow-[0_0_20px_#1E3A8A] ">
          Connect. Compete. <br /> Create.
        </h1>
        <div className="flex flex-col items-center text-center px-6 mt-28 max-w-4xl mx-auto">
          <p className="text-[#e3b672] text-3xl font-semibold md:text-xl leading-relaxed max-w-3xl font-serif">
            Your one-stop platform for everything campus-related. Participate in
            hackathons, explore internships, and connect with peers across
            campuses.{" "}
            <span className="text-[#1E3A8A] font-semibold">
              <br />
              Level up your skills and shine!
            </span>
          </p>
        </div>
      </section>

      {/* Premium Tab Cards Section */}
      <section className="flex flex-col items-center gap-12 mb-12">
        {tabsData.map((tab) => (
          <TabCard
            key={tab.id}
            label={tab.label}
            description={tab.description}
            image={tab.image}
            
            
            isActive={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id, tab.eventType)}
          />
        ))}
      </section>

      {/* Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mb-12 text-center">
        {/* Display Error if it exists */}
        {error && (
          <div className="md:col-span-3">
            <ErrorMessage error={error} />
          </div>
        )}
        <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[#1E3A8A]">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">
            {hackathonlen + contestlen}
          </h2>
          <p className="text-gray-200">Hackathons & Contests</p>
        </div>
        <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[#1E3A8A]">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">
            {internshiplen}
          </h2>
          <p className="text-gray-200">Internships Opportunities</p>
        </div>
        <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[#1E3A8A]">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">
            {festivallen}
          </h2>
          <p className="text-gray-200">College Festivals & Events</p>
        </div>
      </section>

      {/* Premium Buttons */}
      <section className="flex flex-wrap justify-center items-center gap-6 mb-12 px-6">
        {UserActivation ? (
          <>
            <button
              onClick={() => logout(setUserActivation, navigate)}
              className={premiumButtonClasses}
              style={crystalShapeStyle}
            >
              Exit
            </button>
            <button
              onClick={() => handleRoute("/profile")}
              className={premiumButtonClasses}
              style={crystalShapeStyle}
            >
              Profile
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleRoute("/Signup")}
              className={premiumButtonClasses}
              style={crystalShapeStyle}
            >
              Get Started
            </button>
            <button
              onClick={() => handleRoute("/Signin")}
              className={premiumButtonClasses}
              style={crystalShapeStyle}
            >
              Launch
            </button>
          </>
        )}
        <button
          onClick={() => handleRoute("/About")}
          className={premiumButtonClasses}
          style={crystalShapeStyle}
        >
          Our Mission
        </button>
        <button
          onClick={() => handleRoute("/Contacts")}
          className={premiumButtonClasses}
          style={crystalShapeStyle}
        >
          Inquire
        </button>
      </section>
    </main>
  );
};

export default Home;
export { logout };