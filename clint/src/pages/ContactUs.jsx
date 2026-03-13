import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_y5e7nnd",
        "template_3j3cpx7",
        templateParams,
        "_sJcsQDbJTLj1WYH2"
      )
      .then(() => {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("EmailJS ERROR:", error);
        alert("Failed to send message. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4">
              Contact Us
            </h2>

            <h3 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">
              We're here to help you start learning
            </h3>

            <p className="text-gray-600 text-lg mb-12">
              Have questions about courses or enrollment?  
              Send us a message and our team will respond shortly.
            </p>

            <div className="space-y-6">

              <div className="flex items-center space-x-6 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Mail size={24}/>
                </div>

                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold">
                    Email
                  </p>
                  <p className="text-lg text-gray-900">
                    haroonashraf.dev@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <MapPin size={24}/>
                </div>

                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold">
                    Location
                  </p>
                  <p className="text-lg text-gray-900">
                    Online Learning Platform – Worldwide
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 p-8 md:p-10 rounded-3xl shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                type="text"
                required
                value={formData.name}
                onChange={(e)=> setFormData({...formData, name:e.target.value})}
                placeholder="Your name"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none"
              />

              <input
                type="email"
                required
                value={formData.email}
                onChange={(e)=> setFormData({...formData, email:e.target.value})}
                placeholder="your@email.com"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none"
              />

              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e)=> setFormData({...formData, message:e.target.value})}
                placeholder="Tell us how we can help you..."
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none resize-none"
              />

              {success && (
                <p className="text-green-600 text-sm">
                  ✅ Message sent successfully!
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                <span>{loading ? "Sending..." : "Send Message"}</span>
                <Send size={18}/>
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;