import React, { useState } from "react";
import "./Photo.css";

function Photo({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const srcResized = src + "?width=1300";

  return (
    <div className={`flex justify-center items-center  ${!isLoaded ? "animate-pulse" : ""}`}>
      <img src={srcResized} alt={alt} loading="lazy" className={`photo transition-opacity duration-500 ease-in-out max-w-full h-auto mb-4 md:mb-10 ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setIsLoaded(true)} />
    </div>
  );
}

export default Photo;
