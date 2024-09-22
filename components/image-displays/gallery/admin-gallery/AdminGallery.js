import React, { useRef } from "react";
import Masonry from "react-masonry-css";
import { handleImageClick } from "../../../../common/images";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { getCloudimageUrl } from "../../../../common/images";
import styles from "./AdminGallery.module.css"; // Use a separate CSS module for admin-specific styles

const AdminGallery = ({ name, images, description, showCover = true }) => {
  const masonryRef = useRef(null);
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleDownClick = () => {
    if (masonryRef.current) {
      masonryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const breakpointColumnsObj = {
    default: 3,
    700: 1,
  };

  const getFilename = (imageUrl) => {
    return imageUrl.split("/").pop();
  };

  return (
    <div className={`${styles.adminGallery} h-screen overflow-auto`}>
      <div className="gallery-content flex-grow p-4 overflow-hidden">
        {showCover && (
          <div className="cover relative flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center text-white bg-gray-500">
            <h1 className="text-4xl font-bold mb-2">{name}</h1>
            <p className="text-lg mb-6">{description}</p>
            <button onClick={handleDownClick} className="text-gray-900 bg-white px-10 py-3 hover:bg-gray-400 transition-colors duration-200 uppercase font-mono tracking-wider">
              View Gallery
            </button>
          </div>
        )}
        <div ref={masonryRef} className={isMobile ? "mt-16" : ""}>
          <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto -ml-5" columnClassName="pl-5">
            {images.map((image, index) => (
              <div key={index} className="relative mb-5">
                <img src={getCloudimageUrl(image, { width: 800, quality: 80 })} className="w-full h-auto transition-opacity duration-500 ease-in shadow-lg" onError={(e) => e.target.classList.add("hidden")} onClick={() => handleImageClick(image, images, router)} />
                <div className="absolute top-2 right-2 bg-gray-800 text-white text-sm px-2 py-1 rounded font-sans">{getFilename(image)}</div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
