import React, { useRef } from "react";
import Masonry from "react-masonry-css";
import { handleImageClick } from "../../../../common/images"; // Adjust import paths for Next.js
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive"; // For detecting mobile devices
import { getCloudimageUrl } from "../../../../common/images";
import styles from "./MasonryGallery.module.css"; // Assuming module-based CSS in Next.js
import GalleryCover from "../gallery-cover/GalleryCover";

const MasonryGallery = ({ name, images, description, showCover = true }) => {
  const masonryRef = useRef(null); // Ref for the Masonry container
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Detect mobile screen

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
    <div>
      {showCover && <GalleryCover name={name} description={description} />}

      <div className={`${styles.masonryGallery} h-screen`}>
        <div className="gallery-content flex-grow p-4 overflow-hidden">
          <div ref={masonryRef} className={isMobile ? "mt-16" : ""}>
            <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto -ml-5" columnClassName="pl-5">
              {images.map((image, index) => (
                <div key={index} className="mb-5">
                  <img
                    data-src={getCloudimageUrl(image, { width: 800, quality: 80 })}
                    className="w-full h-auto lazy-load transition-opacity duration-500 ease-in shadow-lg"
                    onError={(e) => e.target.classList.add("hidden")}
                    onClick={() => handleImageClick(image, images, router)} // Replaced navigate with Next.js router
                  />
                </div>
              ))}
            </Masonry>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasonryGallery;
