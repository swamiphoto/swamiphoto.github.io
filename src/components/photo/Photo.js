import React, { useState } from "react";

function Photo({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const srcResized = src + "?width=900";

  return (
    <div className={`flex justify-center items-center  ${!isLoaded ? "animate-pulse" : ""}`}>
      <img src={srcResized} alt={alt} loading="lazy" className={`transition-opacity duration-500 ease-in-out max-w-full h-auto border border-gray-300 shadow-md mb-4 md:mb-10 ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setIsLoaded(true)} />
    </div>
  );
}

export default Photo;
