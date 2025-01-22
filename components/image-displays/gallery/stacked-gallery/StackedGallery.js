import React, { useEffect, useState } from "react";
import { handleImageClick, getCloudimageUrl } from "../../../../common/images"; // Adjust import paths
import { useRouter } from "next/router";
import styles from "./StackedGallery.module.css"; // Assuming module-based CSS in Next.js
import GalleryCover from "../gallery-cover/GalleryCover";

const StackedGallery = ({ name, images, description, showCover = true }) => {
  const [processedImages, setProcessedImages] = useState([]);
  const [imageLoadStates, setImageLoadStates] = useState({});
  const router = useRouter();

  // Normalize images to ensure consistent format
  const normalizedImages = images.map((image, index) => (typeof image === "string" ? { src: image, id: index } : { ...image, id: index }));

  // Calculate aspect ratios for all images if missing
  useEffect(() => {
    const calculateAspectRatios = async () => {
      const updatedImages = await Promise.all(
        normalizedImages.map((image) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const aspectRatio = img.width / img.height;
              resolve({ ...image, aspectRatio });
            };
            img.onerror = () => {
              resolve({ ...image, aspectRatio: 1 }); // Default to 1 if there's an error
            };
            img.src = image.src || ""; // Fallback to empty string
          });
        })
      );
      setProcessedImages(updatedImages);
    };

    calculateAspectRatios();
  }, [normalizedImages]);

  const handleImageLoad = (id) => {
    setImageLoadStates((prevStates) => ({
      ...prevStates,
      [id]: true, // Mark the specific image as loaded
    }));
  };

  // Separate vertical and horizontal images
  const verticalImages = processedImages.filter((image) => image.aspectRatio < 1);
  const horizontalImages = processedImages.filter((image) => image.aspectRatio >= 1);

  // Pair vertical images
  const verticalPairs = [];
  for (let i = 0; i < verticalImages.length; i += 2) {
    verticalPairs.push([verticalImages[i], verticalImages[i + 1]]);
  }

  // Alternate formats: horizontal photo, vertical pair
  const combinedRows = [];
  const maxLength = Math.max(horizontalImages.length, verticalPairs.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < horizontalImages.length) {
      combinedRows.push(horizontalImages[i]);
    }
    if (i < verticalPairs.length) {
      combinedRows.push(verticalPairs[i]);
    }
  }

  return (
    <div className="pb-20">
      {showCover && <GalleryCover name={name} description={description} />}
      <div className={`${styles.stackedGallery}`}>
        {combinedRows.map((entry, index) => (
          <div key={`row-${index}`} className="mb-8">
            {Array.isArray(entry) ? (
              // Vertical pairs
              <div
                className="flex flex-row items-center justify-center gap-4"
                style={{ width: "75%", margin: "0 auto" }} // Center pairs
              >
                {entry.map((image) =>
                  image ? (
                    <div
                      key={`vertical-${image.id}`}
                      className="flex justify-center relative"
                      style={{ width: "48%" }} // Ensure both images fit well
                      onClick={() => handleImageClick(image, processedImages, router)}>
                      {/* Placeholder Div */}
                      <div className={`absolute inset-0 bg-gray-300 rounded-3xl shadow-lg transition-opacity duration-500 ${imageLoadStates[image.id] ? "opacity-0" : "opacity-100"}`}></div>
                      {/* Lazy-loaded Image */}
                      <img
                        src={getCloudimageUrl(image.src, {
                          width: 700, // Reduced image resolution
                          quality: 85,
                        })}
                        className={`h-auto w-full object-cover shadow-lg rounded-3xl transition-opacity duration-500 ${imageLoadStates[image.id] ? "opacity-100" : "opacity-0"}`}
                        alt=""
                        onLoad={() => handleImageLoad(image.id)}
                      />
                    </div>
                  ) : null
                )}
              </div>
            ) : (
              // Horizontal image
              <div className="w-full flex justify-center relative" onClick={() => handleImageClick(entry, processedImages, router)}>
                {/* Placeholder Div */}
                <div className={`absolute w-[75%] max-h-[calc(100vw * 0.35)] bg-gray-300 rounded-3xl shadow-lg transition-opacity duration-500 ${imageLoadStates[entry.id] ? "opacity-0" : "opacity-100"}`}></div>
                {/* Lazy-loaded Image */}
                <img
                  src={getCloudimageUrl(entry.src, {
                    width: 1100, // Reduced width for horizontal images
                    quality: 85,
                  })}
                  className={`w-[75%] max-h-[calc(100vw * 0.35)] object-cover shadow-lg rounded-3xl transition-opacity duration-500 ${imageLoadStates[entry.id] ? "opacity-100" : "opacity-0"}`}
                  alt=""
                  onLoad={() => handleImageLoad(entry.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedGallery;
