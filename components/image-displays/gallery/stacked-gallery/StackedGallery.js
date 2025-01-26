import React, { useEffect, useState } from "react";
import { handleImageClick, getCloudimageUrl } from "../../../../common/images";
import { useRouter } from "next/router";
import styles from "./StackedGallery.module.css";

const StackedGallery = ({ images = [] }) => {
  const [processedImages, setProcessedImages] = useState([]);
  const router = useRouter();

  // Process the provided images
  useEffect(() => {
    const processImages = () => {
      images.forEach((url, index) => {
        const img = new window.Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;

          setProcessedImages((prev) => {
            const alreadyExists = prev.some((image) => image.src === url);
            if (alreadyExists) return prev;

            return [...prev, { src: url, aspectRatio, id: index }];
          });
        };
        img.onerror = () => {
          setProcessedImages((prev) => {
            const alreadyExists = prev.some((image) => image.src === url);
            if (alreadyExists) return prev;

            return [...prev, { src: url, aspectRatio: 1, id: index }];
          });
        };
        img.src = url;
      });
    };

    processImages();
  }, [images]);

  // Separate vertical and horizontal images
  const verticalImages = processedImages.filter((image) => image.aspectRatio < 1);
  const horizontalImages = processedImages.filter((image) => image.aspectRatio >= 1);

  // Pair vertical images
  const verticalPairs = [];
  for (let i = 0; i < verticalImages.length; i += 2) {
    verticalPairs.push([verticalImages[i], verticalImages[i + 1]]);
  }

  // Combine rows: alternate horizontal images and vertical pairs
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
      <div className={`${styles.stackedGallery}`}>
        {combinedRows.map((entry, index) => (
          <div key={`row-${index}`} className="mb-8">
            {Array.isArray(entry) ? (
              <div
                className="flex flex-row items-center justify-center gap-4"
                style={{
                  width: "72%",
                  margin: "0 auto",
                }}>
                {entry.map((image, idx) =>
                  image ? (
                    <div
                      key={`vertical-${index}-${idx}`}
                      className="relative flex justify-center"
                      style={{
                        width: "48%",
                      }}
                      onClick={() => handleImageClick(image.src, processedImages, router)}>
                      <img src={getCloudimageUrl(image.src, { width: 600, quality: 85 })} alt="" className="h-auto w-full object-cover shadow-lg rounded-3xl transition-opacity duration-500" />
                    </div>
                  ) : null
                )}
              </div>
            ) : (
              <div className="w-full flex justify-center relative" onClick={() => handleImageClick(entry.src, processedImages, router)}>
                <img src={getCloudimageUrl(entry.src, { width: 1100, quality: 85 })} alt="" className="w-[72%] max-h-[calc(100vw * 0.35)] object-cover shadow-lg rounded-3xl transition-opacity duration-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedGallery;
