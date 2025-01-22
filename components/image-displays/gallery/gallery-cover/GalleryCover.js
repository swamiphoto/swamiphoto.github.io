import React from "react";

const GalleryCover = ({ name, description }) => {
  return (
    <div className="relative flex flex-col items-center justify-center  text-gray-900 pt-20 md:p-20">
      <div className="text-center px-6">
        {name && <h1 className="text-4xl md:text-6xl font-bold mb-4">{name}</h1>}
        {description && <p className="text-lg md:text-xl max-w-xl mx-auto">{description}</p>}
      </div>
    </div>
  );
};

export default GalleryCover;
