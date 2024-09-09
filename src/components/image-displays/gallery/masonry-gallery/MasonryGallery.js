import React, { useRef } from "react";
import Masonry from "react-masonry-css";
import { handleImageClick } from "../../../../common/images"; // Import the common functions
import { useNavigate } from "react-router-dom";
import "./MasonryGallery.css";

const MasonryGallery = ({ name, images, description, showCover = true }) => {
  const masonryRef = useRef(null); // Ref for the Masonry container
  const navigate = useNavigate();

  const handleDownClick = () => {
    if (masonryRef.current) {
      masonryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const breakpointColumnsObj = {
    default: 3,
    700: 1,
  };

  return (
    <div className="masonry-gallery h-screen overflow-auto bg-gray-500">
      <div className="gallery-content flex-grow p-4 overflow-hidden">
        {showCover && (
          <div className="cover relative flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center text-white bg-gray-500">
            <h1 className="text-4xl font-bold mb-2">{name}</h1>
            <p className="text-lg mb-6">{description}</p>
            <button onClick={handleDownClick} className="text-gray-900 bg-white px-10 py-3 hover:bg-gray-400 transition-colors duration-200 uppercase font-geist-mono tracking-wider">
              View Gallery
            </button>
          </div>
        )}
        <div ref={masonryRef}>
          <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto -ml-5" columnClassName="pl-5">
            {images.map((image, index) => (
              <div key={index} className="mb-5">
                <img
                  data-src={image}
                  className="w-full h-auto lazy-load transition-opacity duration-500 ease-in shadow-lg"
                  onError={(e) => e.target.classList.add("hidden")}
                  onClick={() => handleImageClick(image, images, navigate)} // Use the common function
                />
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default MasonryGallery;
