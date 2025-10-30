import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe } from "lucide-react";

const Contact = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    if (!name || !email || !message) {
      setError("Please fill out all fields.");
      setIsLoading(false);
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      
      const res = await fetch(`${API_URL}/api/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please try again later.");
      }

      
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

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
        Have questions, suggestions, or want to collaborate? Reach out to us —
        we’d love to hear from you!
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl w-full font-serif">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-lg px-8 py-6 flex flex-col space-y-5 hover:shadow-xl transition"
          onSubmit={handleSubmit} 
        >
          <h2 className="text-2xl font-semibold text-[#c89c5d] mb-4">
            Send a Message
          </h2>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* 7. Add Success/Error Messages */}
          {success && (
            <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">
              Message sent successfully! We'll get back to you soon.
            </p>
          )}
          {error && (
            <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">
              Error: {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-[#1E3A8A] text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-[#152d6b] transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading} 
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

        {/* Contact Info (No changes needed here) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center space-y-6"
        >
          {/* ... all your contact info cards ... */}
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
              <p className="text-gray-600">
                NIT Raipur Campus, Raipur, Chhattisgarh
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition flex items-center space-x-4">
            <Globe className="w-6 h-6 text-[#1E3A8A]" />
            <div>
              <h2 className="text-xl font-semibold text-[#c89c5d] mb-1">
                Follow Us
              </h2>
              <p className="text-gray-600">
                <a href="#">LinkedIn</a> | <a href="#">Twitter</a> |{" "}
                <a href="#">GitHub</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;