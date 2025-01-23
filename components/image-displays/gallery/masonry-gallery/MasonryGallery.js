import React, { useRef } from "react";
import Masonry from "react-masonry-css";
import { handleImageClick } from "../../../../common/images";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { getCloudimageUrl } from "../../../../common/images";
import styles from "./MasonryGallery.module.css";

const MasonryGallery = ({ name, images, texts, description }) => {
  const masonryRef = useRef(null);
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleDownClick = () => {
    if (masonryRef.current) {
      masonryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const breakpointColumnsObj = {
    default: 2, // Use 2 columns for larger screens
    700: 1, // Use 1 column for smaller screens (mobile)
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${styles.masonryGallery} w-full max-w-6xl mx-auto h-screen`}>
        <div className="gallery-content flex-grow p-4 overflow-hidden">
          <div ref={masonryRef} className={isMobile ? "mt-16" : ""}>
            <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto -ml-5" columnClassName="pl-5">
              {images && images.length > 0 ? (
                images.map((image, index) => {
                  const imageUrl = getCloudimageUrl(image, { width: 800, quality: 80 });
                  return (
                    <div key={index} className="mb-5">
                      <img src={imageUrl} className="w-full h-auto transition-opacity duration-500 ease-in shadow-lg rounded-3xl" onError={(e) => console.error("Image failed to load:", imageUrl)} onClick={() => handleImageClick(image, images, router)} />
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500">No images available.</p>
              )}
            </Masonry>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasonryGallery;
