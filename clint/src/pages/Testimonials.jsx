import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const testimonials = [
  {
    name: "Harry",
    review:
      "I've been using this LMS for nearly two years and it's been incredibly user-friendly, making my work much easier.",
    stars: 5,
  },
  {
    name: "Sherian's",
    review:
      "This platform is excellent. The courses are well-structured and helped me land a job!",
    stars: 4,
  },
  {
    name: "Charlie",
    review:
      "Really valuable content. It's helped me grow both professionally and technically.",
    stars: 5,
  },
];

const Testimonials = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleGetStarted = () => {
    if (user) {
      // Just refresh the page or stay at "/"
      window.location.href = "/";
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
          <p className="text-gray-600 mb-10">
            Hear from our learners how this platform made a difference in their
            lives.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 text-left"
              >
                <h4 className="text-lg font-semibold">{t.name}</h4>
                <div className="flex mt-2 mb-4 text-yellow-400">
                  {"★".repeat(t.stars)}
                  {"☆".repeat(5 - t.stars)}
                </div>
                <p className="text-gray-700 text-sm">{t.review}</p>
                <a className="text-blue-500 text-sm mt-3 inline-block" href="#">
                  Read more
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn Anything, Anytime, Anywhere Section */}
      <section className="bg-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            Learn anything, anytime, anywhere
          </h2>
          <p className="text-gray-600 mb-8">
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum
            anim id veniam aliqua proident excepteur commodo do ea.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Get started
            </button>
            <Link
              to="/courses"
              className="text-blue-600 font-medium px-6 py-3 border border-blue-600 rounded-md hover:bg-blue-50 transition duration-200"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
