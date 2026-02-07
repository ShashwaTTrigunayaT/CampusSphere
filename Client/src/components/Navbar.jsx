import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, ShieldCheck } from 'lucide-react';

import logoImg from "/logo.png"; 
import defaultAvatarImg from "/default-Avatar.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ADMIN_EMAIL = "shashwattrigunayat04@gmail.com"; // Should ideally be in .env

  const [isFounder, setIsFounder] = useState(false);

  const [userData, setUserData] = useState({
    name: "Explorer",
    image: defaultAvatarImg
  });

  useEffect(() => {
    const token = localStorage.getItem("data.token") || localStorage.getItem("token");
    setActive(!!token);

    const rawData = localStorage.getItem("data");
    let detectedName = "Explorer";
    let detectedImage = defaultAvatarImg;

    try {
      if (rawData && rawData.startsWith('{')) {
        const parsed = JSON.parse(rawData);
        detectedName = parsed.name || parsed.username || detectedName;
        detectedImage = parsed.profileImageURL || parsed.image || detectedImage;
      } else {
        detectedName =
          localStorage.getItem("data.name") ||
          localStorage.getItem("name") ||
          "Explorer";

        detectedImage =
          localStorage.getItem("data.profileImageURL") ||
          localStorage.getItem("profileImage") ||
          defaultAvatarImg;
      }
    } catch (e) {
      console.error("Auth parse error");
    }

    const storedEmail = localStorage.getItem("data.email");

    if (storedEmail?.toLowerCase() === ADMIN_EMAIL?.toLowerCase()) {
      setIsFounder(true);
    } else {
      setIsFounder(false);
    }

    setUserData({ name: detectedName, image: detectedImage });

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const logout = () => {
    localStorage.clear();
    setActive(false);
    navigate("/signin");
  };

  useEffect(() => setMobileMenuOpen(false), [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out px-4 md:px-10
      ${isScrolled 
        ? "py-3 mt-4 max-w-5xl mx-auto rounded-full bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)]" 
        : "py-6 bg-transparent mt-0 max-w-full"}`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* BRAND LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-blue-500 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
            <img 
              src={logoImg} 
              alt="CampusSphere" 
              className="relative w-10 h-10 rounded-full border border-white/20 object-cover shadow-2xl" 
            />
          </div>
          <span className="font-black tracking-tighter text-xl uppercase italic text-white group-hover:text-blue-400 transition-colors">
            Campus<span className="text-blue-500">Sphere</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            {['HOME', 'ABOUT', 'CONTACTS'].map((item) => (
              <Link 
                key={item}
                className="text-[10px] tracking-[0.3em] font-black text-gray-400 hover:text-white transition-all relative group" 
                to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>
          
          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

          {active ? (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 pr-5 rounded-2xl hover:border-blue-500/50 hover:bg-white/10 transition-all group/profile"
              >
                <div className="relative">
                  <img 
                    src={userData.image} 
                    className={`w-9 h-9 rounded-xl object-cover border transition-colors ${
                      isFounder
                        ? "border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                        : "border-white/10 group-hover/profile:border-blue-500"
                    }`}
                    alt="Profile"
                  />

                  <div className={`absolute -bottom-1 -right-1 rounded-full p-0.5 border-2 border-black ${
                    isFounder ? "bg-yellow-500" : "bg-blue-500"
                  }`}>
                    <ShieldCheck size={8} className="text-white" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className={`text-[9px] font-black tracking-widest leading-none ${
                    isFounder ? "text-yellow-400" : "text-blue-500"
                  }`}>
                    {isFounder ? "FOUNDER" : "PILOT"}
                  </span>

                  <span className={`text-sm font-black leading-none mt-1 uppercase italic tracking-tighter ${
                    isFounder
                      ? "bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent"
                      : "text-white"
                  }`}>
                    {userData.name}
                  </span>
                </div>
              </Link>

              <button 
                onClick={logout} 
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                title="Eject Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link className="text-[10px] font-black text-gray-400 hover:text-white tracking-[0.2em]" to="/signin">SIGN IN</Link>
              <Link 
                className="bg-blue-600 text-white px-7 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-95" 
                to="/signup"
              >
                Join Sphere
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 mx-4 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col gap-8 md:hidden shadow-2xl animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {['HOME', 'ABOUT', 'CONTACT'].map((item) => (
              <Link key={item} className="text-4xl font-black italic tracking-tighter text-white/40 hover:text-blue-500 transition-colors" to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}>
                {item}
              </Link>
            ))}
          </div>

          <div className="h-[1px] bg-white/10 w-full" />

          {active ? (
            <div className="flex flex-col gap-6">
              <Link to="/profile" className={`text-4xl font-black italic tracking-tighter uppercase ${
                isFounder
                  ? "bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent"
                  : "text-blue-500"
              }`}>
                {userData.name}
              </Link>
              <button onClick={logout} className="text-left text-red-500 text-xl font-black tracking-widest">LOGOUT</button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <Link className="text-4xl font-black italic tracking-tighter text-white" to="/signin">SIGN IN</Link>
              <Link className="text-4xl font-black italic tracking-tighter text-blue-500" to="/signup">JOIN SPHERE</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
