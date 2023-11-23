import React, { useState } from "react";

function Photo({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`flex justify-center items-center bg-gray-300 ${!isLoaded ? "animate-pulse" : ""}`}>
      <img src={src} alt={alt} loading="lazy" className={`transition-opacity duration-500 ease-in-out max-w-full h-auto border border-gray-300 shadow-md mb-4 md:mb-10 ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setIsLoaded(true)} />
    </div>
  );
}

export default Photo;
