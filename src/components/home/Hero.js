// src/components/Home/Hero.js

import React from "react";
import "./Home.css"; // Importing the CSS file for animations

const Hero = () => {
  const rotatingWords = ["weekly", "daily", "quarterly", "yearly"];

  return (
    <div className="text-center pt-20 px-6">
      <h1 className="animate-fadeDown mx-auto md:max-w-3xl text-6xl md:text-7xl text-gray-800 font-bold mb-2">Hi, I'm Swami.</h1>

      <p className="animate-fadeIn mx-auto max-w-2xl text-2xl text-gray-600 mb-8 mt-5 font-medium">
        I’m an engineer, designer, photographer, writer, and CEO of Qtr. Sign up below to join over 1500 people receiving insights from my podcast, where I interview the world’s best landscape photographers.
      </p>

      <div className="mt-12 md:mt-16"></div>
    </div>
  );
};

export default Hero;
