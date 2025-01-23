import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";

const GalleryCover = ({ name, description, enableSlideshow = false, enableClientView = false, onBackClick, onSlideshowClick, onClientLoginClick }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Detect mobile screen

  return (
    <>
      {isMobile ? (
        // Mobile-specific navigation bar
        <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white bg-opacity-90 border-b border-gray-100 z-50">
          <HiOutlineArrowLeft className="hover:text-red-500 cursor-pointer" size={20} onClick={onBackClick} />
          <div className="ml-auto flex space-x-4 text-sm">
            {enableSlideshow && (
              <button onClick={onSlideshowClick} className="px-4 py-2 bg-black text-white font-medium rounded hover:bg-gray-800 transition">
                View Slideshow
              </button>
            )}
            {enableClientView && (
              <button onClick={onClientLoginClick} className="px-4 py-2 border border-red-500 text-red-500 font-medium rounded hover:bg-red-500 hover:text-white transition">
                Client Login
              </button>
            )}
          </div>
        </div>
      ) : (
        // Desktop-specific layout
        <div className="relative flex flex-col items-center justify-center text-gray-900 pt-20 md:p-20">
          <div className="text-center px-6">
            {name && <h1 className="text-4xl md:text-6xl font-bold mb-4">{name}</h1>}
            {description && <p className="text-lg md:text-xl max-w-xl mx-auto mb-6">{description}</p>}

            <div className="flex items-center justify-center space-x-6 mt-6">
              {enableSlideshow && (
                <button onClick={onSlideshowClick} className="px-6 py-3 bg-gray-900 text-white text-lg font-medium  hover:bg-gray-800 transition">
                  View Music Show
                </button>
              )}

              {enableClientView && (
                <button onClick={onClientLoginClick} className="px-6 py-3 border border-gray-500 text-gray-700 text-lg font-medium  hover:text-black transition">
                  Client Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryCover;
