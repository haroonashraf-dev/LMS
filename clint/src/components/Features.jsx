import React from "react";
import { FaCertificate, FaClock, FaChalkboardTeacher, FaUsers } from "react-icons/fa";

const features = [
  {
  icon: <FaCertificate className="text-3xl text-blue-600" />,
  title: "High-Quality Courses",
  description: "Learn from expert-created content to level up your skills.",
},

  {
    icon: <FaChalkboardTeacher className="text-3xl text-green-600" />,
    title: "Expert Instructors",
    description: "Learn from industry leaders with years of experience.",
  },
  {
    icon: <FaClock className="text-3xl text-purple-600" />,
    title: "Learn Anytime",
    description: "Access courses 24/7 on any device at your convenience.",
  },
  {
    icon: <FaUsers className="text-3xl text-pink-600" />,
    title: "Community Support",
    description: "Get help, join discussions, and grow with our community.",
  },
];

const Features = () => {
  return (
    <section className="my-16 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
