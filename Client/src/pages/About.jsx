import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Heart, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center px-6 py-24 bg-[#050505] overflow-hidden">
      
      {/* Background Cinematic Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[50%] bg-indigo-600/5 blur-[130px] rounded-full"></div>
      </div>

      {/* Label */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-8"
      >
        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
        <span className="text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase">The Ecosystem</span>
      </motion.div>
        
      {/* Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-7xl font-black mb-8 italic uppercase tracking-tighter text-center bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
      >
        CampusSphere
      </motion.h1>
      
      {/* Description */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-lg md:text-xl text-gray-400 max-w-3xl text-center leading-relaxed mb-20 font-medium italic"
      >
        A centralized high-performance hub uniting hackathons, coding contests, 
        and internships from the world's leading platforms. We don't just find events; 
        we architect the bridge between student potential and professional reality.
      </motion.p>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl w-full">
        {[
          {
            title: "Our Mission",
            icon: <Target className="w-6 h-6 text-blue-500" />,
            desc: "To simplify how students discover elite opportunities while empowering them to dominate in the tech landscape.",
          },
          {
            title: "The Tech",
            icon: <Zap className="w-6 h-6 text-blue-500" />,
            desc: "Advanced event aggregation, real-time filtering, and resume-skill matching—all built for peak performance.",
          },
          {
            title: "For Students",
            icon: <Heart className="w-6 h-6 text-blue-500" />,
            desc: "Built by developers, for developers. A modern, aggressive tool designed to enhance your professional journey.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
            className="group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl hover:bg-white/[0.07] hover:border-blue-500/40 transition-all duration-500"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-blue-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>
            
            <div className="relative z-10">
              <div className="mb-6 p-3 w-fit rounded-2xl bg-blue-500/10 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">{card.title}</h2>
              <p className="text-gray-500 leading-relaxed font-medium text-sm">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default About;