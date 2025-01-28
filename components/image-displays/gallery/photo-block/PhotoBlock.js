import React from "react";

const PhotoBlock = ({ imageUrl, caption = "", variant = 1 }) => {
  const renderCaption = () => {
    return <p className="my-10 mb-40 font-medium text-sm md:text-xl italic text-center max-w-3xl mx-auto">{caption}</p>;
  };

  const renderImage = () => {
    if (variant === 1) {
      // Edge-to-edge layout
      return (
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden">
          <img src={imageUrl} alt={caption || "Photo"} className="w-full h-auto object-cover" loading="lazy" />
        </div>
      );
    }

    if (variant === 2) {
      // Normal-width layout
      return (
        <div className="w-full flex justify-center">
          <img src={imageUrl} alt={caption || "Photo"} className="w-[72%] max-h-[calc(100vw * 0.35)] object-cover shadow-lg rounded-3xl transition-opacity duration-500" loading="lazy" />
        </div>
      );
    }

    // Default fallback (variant 1)
    return (
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden">
        <img src={imageUrl} alt={caption || "Photo"} className="w-full h-auto object-cover" loading="lazy" />
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Render Image Based on Variant */}
      {renderImage()}
      {/* Caption */}
      {caption && renderCaption()}
    </div>
  );
};

export default PhotoBlock;
