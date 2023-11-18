import React from "react";

function Photo({ src, alt }) {
  return (
    <div className="flex justify-center items-center">
      <img src={src} alt={alt} className="max-w-full h-auto border border-gray-300 rounded" />
    </div>
  );
}

export default Photo;
