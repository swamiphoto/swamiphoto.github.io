import React from "react";

function Photo({ src, alt }) {
  return (
    <div className="flex justify-center items-center">
      <img src={src} alt={alt} loading="lazy" className="max-w-full h-auto border border-gray-300 shadow-md mb-4 md:mb-10" />
    </div>
  );
}

export default Photo;
