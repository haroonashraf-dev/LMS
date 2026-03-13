import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-600 font-semibold uppercase tracking-widest">
            About Our Platform
          </h2>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900 leading-tight">
            Learning That Helps You <span className="text-blue-600">Grow</span>
          </h1>

          <p className="text-gray-600 text-lg mt-6">
            We built this learning platform with one mission — to make
            high-quality education accessible to everyone. Whether you're
            starting a new career, improving your skills, or exploring new
            interests, our courses are designed to help you succeed.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Image */}
          <motion.div
            initial={{opacity:0, x:-30}}
            whileInView={{opacity:1, x:0}}
            transition={{duration:0.6}}
            viewport={{once:true}}
          >
            <img
              src="/about-us.jpg"
              alt="Students learning"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{opacity:0, x:30}}
            whileInView={{opacity:1, x:0}}
            transition={{duration:0.6}}
            viewport={{once:true}}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Education Designed for the Modern World
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Our LMS platform connects passionate learners with expert
              instructors from around the world. We combine practical
              knowledge, hands-on projects, and flexible learning tools
              so students can learn anytime, anywhere.
            </p>

            <p className="text-gray-600 leading-relaxed">
              From web development and technology to business and personal
              growth, our courses are designed to provide real-world skills
              that help you advance your career and achieve your goals.
            </p>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-8 mt-20">

          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <BookOpen className="mx-auto text-blue-600 mb-4" size={32}/>
            <h4 className="font-semibold text-lg">Quality Courses</h4>
            <p className="text-gray-500 text-sm mt-2">
              Expert-led courses designed to deliver practical knowledge.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <Users className="mx-auto text-blue-600 mb-4" size={32}/>
            <h4 className="font-semibold text-lg">Global Community</h4>
            <p className="text-gray-500 text-sm mt-2">
              Join learners from different countries and industries.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <Award className="mx-auto text-blue-600 mb-4" size={32}/>
            <h4 className="font-semibold text-lg">Certificates</h4>
            <p className="text-gray-500 text-sm mt-2">
              Earn certificates to showcase your achievements.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <Globe className="mx-auto text-blue-600 mb-4" size={32}/>
            <h4 className="font-semibold text-lg">Learn Anywhere</h4>
            <p className="text-gray-500 text-sm mt-2">
              Access courses anytime from any device.
            </p>
          </div>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-10 text-center mt-20">

          <div>
            <h3 className="text-4xl font-bold text-blue-600">100+</h3>
            <p className="text-gray-600 mt-2">Courses Available</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-blue-600">5k+</h3>
            <p className="text-gray-600 mt-2">Students Learning</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-blue-600">50+</h3>
            <p className="text-gray-600 mt-2">Expert Instructors</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutUs;