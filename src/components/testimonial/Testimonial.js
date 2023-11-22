import React from "react";
import { useInView } from "react-intersection-observer";

const Testimonial = ({ imageSrc, altText, testimony, name, role, reverse = false }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-20px",
  });

  const orderClasses = reverse ? "md:flex-row-reverse" : "md:flex-row";
  const animationClass = inView ? (reverse ? "animate-rotateRight" : "animate-rotateLeft") : "";

  return (
    <div ref={ref} className={`${animationClass} bg-gray-100 flex flex-col md:flex-row w-full md:w-9/12 mx-auto items-center overflow-hidden p-4 md:p-6 mb-8 rounded-xl border border-gray-300 ${orderClasses}`}>
      {/* Image container */}
      <div className="flex-shrink-0 mx-10 mb-4 md:mb-0" style={{ width: "300px", height: "300px" }}>
        {" "}
        {/* Adjust the width and height to be equal */}
        <img src={imageSrc} alt={altText} className="w-full h-full object-cover rounded-full" />
      </div>

      {/* Text content */}
      <div className={`flex-grow font-serif text-center italic md:text-left ${reverse ? "md:pl-9" : "md:pr-9"}`}>
        <p className="text-xl">{testimony}</p>
        <p className="mt-4 font-semibold text-2xl">{name}</p>
        <p className="text-gray-500 text-lg">{role}</p>
      </div>
    </div>
  );
};

export default Testimonial;
