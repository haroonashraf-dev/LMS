import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
            About <span className="text-gray-900">E-Learning</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Empowering learners worldwide with expert-led courses, hands-on practice, and recognized certifications —
            all accessible anytime, anywhere.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-14 items-center">
         <img
  src="/about-us.jpg"
  alt="About E-Learning"
  className="w-full max-h-[500px] object-contain"
/>


          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed">
                E-Learning is a modern education platform that connects students, instructors, and institutions across the globe.
                We believe education should be flexible, inclusive, and tailored to meet the evolving demands of the tech-driven world.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">What We Do</h2>
              <p className="text-gray-600 leading-relaxed">
                From coding bootcamps and marketing courses to soft skills training — our platform delivers expertly curated content,
                progress tracking, community support, and official certifications. Whether you're a student or a working professional,
                we help you achieve your goals.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid sm:grid-cols-3 text-center gap-8">
          <div>
            <h3 className="text-3xl font-bold text-blue-700">Many</h3>
            <p className="text-gray-600">Courses Available</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-700">More</h3>
            <p className="text-gray-600">Students Enrolled</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-700">Top-Rated</h3>
            <p className="text-gray-600">Expert Instructors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
