import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-12 pb-6 mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-3">🎓 E-Learning</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Empower your learning journey with high-quality, instructor-led courses across tech,
            business, and more.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="ml-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Home
              </a>
            </li>
            <li>
  <Link to="/about" className="hover:text-blue-600 transition">
    About Us
  </Link>
</li>
<li>
  <Link to="/contact" className="hover:text-blue-600 transition">
    Contact Us
  </Link>
</li>

            
          </ul>
        </div>

        {/* Newsletter */}
        <div>
  <h3 className="text-lg font-semibold text-gray-800 mb-3">Learn with Confidence</h3>
  <p className="text-sm text-gray-600">
    Empower your future with our expertly designed courses. We're here to support your learning journey.
  </p>
</div>

      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} E-Learning. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
