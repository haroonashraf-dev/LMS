import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import slide1 from "./images/slideimg1.jpg";
import slide2 from "./images/slideimg2.jpg";
import slide3 from "./images/slideimg3.jpg";
import slide4 from "./images/slideimg4.jpg";
import slide5 from "./images/slideimg5.jpg";

const HeroSection = () => {
   const [searchQuery, setSearchQuery] = useState("");
  const images = [slide1, slide2, slide3, slide5, slide4];
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // const handleExploreClick = () => {
  //   if (user) {
  //     navigate("/courses");
  //   } else {
  //     navigate("/login");
  //   }
  // };
   const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-16">
      {/* Image Slider Background */}
      <div className="absolute inset-0 z-0">
        <Slider
          autoplay
          autoplaySpeed={4000}
          infinite
          speed={1000}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={false}
          fade
          cssEase="cubic-bezier(0.645, 0.045, 0.355, 1)"
        >
          {images.map((src, index) => (
            <div key={index}>
              <motion.div
                className="h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${src})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </div>
          ))}
        </Slider>
        <motion.div
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white text-center max-w-5xl mx-auto"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={container}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          variants={item}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
            Empower Your
          </span>{" "}
          Learning Journey
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl"
          variants={item}
        >
          Discover + expert-led courses across all disciplines. Learn at your own pace with our flexible platform.
        </motion.p>

        <motion.form onSubmit={searchHandler}
          className="w-full max-w-2xl bg-white rounded-full overflow-hidden shadow-md mb-6 flex"
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses e.g. web development"
            className="flex-grow px-6 py-4 text-gray-800 placeholder-gray-500 focus:outline-none border-none rounded-none"
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-none rounded-r-full"
          >
            Search
          </Button>
        </motion.form>

        <motion.div variants={item}>
          <Button
            // onClick={handleExploreClick}
            onClick={()=> navigate(`/course/search?query`)}
            className="bg-white text-blue-600 hover:bg-gray-200 px-6 py-3 rounded-full font-semibold shadow-md"
          >
            Explore Courses
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
