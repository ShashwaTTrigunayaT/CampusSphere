import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight, Shield } from 'lucide-react';
import logoImg from "/logo.png";

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-gradient-to-b from-transparent to-black pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="relative">
                <div className="absolute -inset-1 bg-blue-500 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                <img 
                  src={logoImg} 
                  alt="CampusSphere" 
                  className="relative h-10 w-10 rounded-full border border-white/10 object-cover"
                />
              </div>
              <span className="font-black tracking-tighter text-2xl uppercase italic bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                CampusSphere
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs text-center md:text-left font-medium leading-relaxed">
              The definitive ecosystem for campus innovation, competitions, and professional growth.
            </p>
          </div>

          {/* Clean Navigation */}
          <div className="flex gap-16 text-center md:text-left">
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase">Explore</h4>
              <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors font-bold">HOME</Link>
              <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors font-bold">MISSION</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase">Account</h4>
              <Link to="/profile" className="text-sm text-gray-400 hover:text-white transition-colors font-bold">DASHBOARD</Link>
              <Link to="/contacts" className="text-sm text-gray-400 hover:text-white transition-colors font-bold">HELP CENTER</Link>
            </div>
          </div>

          {/* Official Contact Section */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h4 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Official Channel</h4>
            <a 
              href="mailto:campusshere@gmail.com" 
              className="group flex items-center gap-4 bg-white/[0.03] backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl hover:border-blue-500/50 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none mb-1">Send Mail</span>
                <span className="text-sm font-bold text-white tracking-tight">campusshere@gmail.com</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-40">
            <Shield className="w-3 h-3 text-gray-400" />
            <p className="text-[9px] font-black text-gray-400 tracking-[0.2em] uppercase">
              © 2026 CampusSphere. All Systems Operational.
            </p>
          </div>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[10px] font-bold text-gray-600 hover:text-blue-400 transition-colors uppercase tracking-widest">Privacy Policy</Link>
            <Link to="/terms" className="text-[10px] font-bold text-gray-600 hover:text-blue-400 transition-colors uppercase tracking-widest">Terms of Use</Link>
          </div>
        </div>
      </div>

      {/* Deep Space Glow Effect */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-5xl h-32 bg-blue-600/10 blur-[120px] -z-10 rounded-full"></div>
    </footer>
  );
};

export default Footer;