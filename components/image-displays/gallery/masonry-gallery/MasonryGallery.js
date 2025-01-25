import React, { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";
import { handleImageClick, getCloudimageUrl, fetchImageUrls } from "../../../../common/images";
import { useRouter } from "next/router";
import styles from "./MasonryGallery.module.css";

const MasonryGallery = ({ images = [], imagesFolderUrl = "" }) => {
  const [processedImages, setProcessedImages] = useState([]);
  const masonryRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAndProcessImages = async () => {
      // Fetch images from folder if provided, otherwise use the provided `images` array
      const folderImages = imagesFolderUrl ? await fetchImageUrls(imagesFolderUrl) : images;
      setProcessedImages(folderImages);
    };

    fetchAndProcessImages();
  }, [images, imagesFolderUrl]);

  const breakpointColumnsObj = {
    default: 2, // Use 2 columns for larger screens
    700: 1, // Use 1 column for smaller screens (mobile)
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${styles.masonryGallery} w-full max-w-6xl mx-auto`}>
        <div className="gallery-content flex-grow p-4 overflow-hidden">
          <div ref={masonryRef}>
            <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto -ml-5" columnClassName="pl-5">
              {processedImages.length > 0 ? (
                processedImages.map((image, index) => {
                  const imageUrl = getCloudimageUrl(image, { width: 800, quality: 80 });
                  return (
                    <div key={index} className="mb-5">
                      <img src={imageUrl} alt={`Image ${index + 1}`} className="w-full h-auto transition-opacity duration-500 ease-in shadow-lg rounded-3xl" onError={() => console.error("Image failed to load:", imageUrl)} onClick={() => handleImageClick(image, processedImages, router)} />
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
