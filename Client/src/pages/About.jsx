import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <main className="min-h-[calc(100vh-7rem)] flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-gray-50 to-gray-100">
        
      {/* Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#1E3A8A] to-[#c89c5d] bg-clip-text text-transparent font-serif"
      >
        About CampusSphere
      </motion.h1>
      
      {/* Description */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg text-gray-700 max-w-3xl text-center leading-relaxed mb-12 font-serif"
      >
        CampusSphere is a student-focused event aggregation platform that unites 
        hackathons, coding contests, internships, and fests from across platforms.  
        We help students stay updated, participate actively, and seize opportunities 
        that shape their journey.
      </motion.p>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full font-serif">
        {[
          {
            title: "Our Mission",
            desc: "To simplify how students discover and access events, while empowering them to grow in tech and beyond.",
          },
          {
            title: "Features",
            desc: "Event discovery, filters, alerts, and bookmarks (coming soon!) — everything designed to keep you ahead.",
          },
          {
            title: "Made for Students",
            desc: "Built by students, for students. A simple, modern, and useful tool to enhance campus life.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.2, duration: 0.7 }}
            className="bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl hover:scale-105 transform transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-[#c89c5d] mb-3">{card.title}</h2>
            <p className="text-gray-600">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default About;
