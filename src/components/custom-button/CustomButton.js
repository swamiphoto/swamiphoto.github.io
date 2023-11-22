import React, { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";
import "./CustomButton.css"; // Ensure this is correctly imported

const CustomButton = ({ label = "Book a Session", small = false, className = "", onClick }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Lower the threshold
    rootMargin: "-20px", // Adjust this value to trigger the animation a bit earlier or later
  });

  // Decide the order and animation class of elements based on `reverse` prop and inView status
  const orderClasses = "md:flex-row";
  const animationClass = inView ? "animate-rotateRight" : "";

  return (
    <div>
      <button
        ref={ref}
        onClick={onClick}
        className={`${animationClass} ${orderClasses} ${
          small ? "text-lg py-3" : "text-2xl py-5"
        } tilt-button bg-black text-white font-geist-mono px-10 inline-flex items-center justify-center cursor-pointer outline-none focus:outline-none transition-transform duration-300 ease-in-out hover:-rotate-6 ${className}`}>
        <span>{label}</span>
        <ArrowRightIcon className="w-5 h-5 ml-2" aria-hidden="true" />
      </button>
    </div>
  );
};

export default CustomButton;
