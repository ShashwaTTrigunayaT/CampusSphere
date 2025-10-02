import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe } from "lucide-react";

const Contact = () => {
  return (
    <main className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-gray-50 to-gray-100">

      
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-[#1E3A8A] font-serif mb-4"
      >
        Contact Us
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg font-medium text-[#c89c5d] font-serif max-w-2xl text-center leading-relaxed mb-4"
      >
        Have questions, suggestions, or want to collaborate?  
        Reach out to us — we’d love to hear from you!
      </motion.p>
      

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl w-full font-serif">
        
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-lg px-8 py-6 flex flex-col space-y-5 hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-semibold text-[#c89c5d] mb-4">
            Send a Message
          </h2>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
          />
          <button
            type="submit"
            className="bg-[#1E3A8A] text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-[#152d6b] transition"
          >
            Send Message
          </button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center space-y-6"
        >
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition flex items-center space-x-4">
            <Mail className="w-6 h-6 text-[#1E3A8A]" />
            <div>
              <h2 className="text-xl font-semibold text-[#c89c5d] mb-1">
                Email
              </h2>
              <p className="text-gray-600">campussphere@gmail.com</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition flex items-center space-x-4">
            <MapPin className="w-6 h-6 text-[#1E3A8A]" />
            <div>
              <h2 className="text-xl font-semibold text-[#c89c5d] mb-1">
                Address
              </h2>
              <p className="text-gray-600">NIT Raipur Campus, Raipur, Chhattisgarh</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition flex items-center space-x-4">
            <Globe className="w-6 h-6 text-[#1E3A8A]" />
            <div>
              <h2 className="text-xl font-semibold text-[#c89c5d] mb-1">
                Follow Us
              </h2>
              <p className="text-gray-600">LinkedIn | Twitter | GitHub</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;

