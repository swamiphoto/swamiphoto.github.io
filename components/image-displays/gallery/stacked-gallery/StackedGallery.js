import React, { useEffect, useState } from "react";
import { handleImageClick, getCloudimageUrl } from "../../../../common/images"; // Adjust import paths
import { useRouter } from "next/router";
import styles from "./StackedGallery.module.css";

const StackedGallery = ({ name, images, texts, description }) => {
  const [processedImages, setProcessedImages] = useState([]);
  const router = useRouter();

  // Lazy load images and process aspect ratios
  useEffect(() => {
    const processImages = () => {
      images.forEach((url, index) => {
        const img = new window.Image(); // Use browser's Image constructor
        img.onload = () => {
          const aspectRatio = img.width / img.height;

          // Update state only if the image is not already processed
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

            return [...prev, { src: url, aspectRatio: 1, id: index }]; // Default aspect ratio
          });
        };
        img.src = url; // Trigger image loading
      });
    };

    processImages();
  }, [images]);

  // Separate vertical and horizontal images
  const verticalImages = processedImages.filter((image) => image.aspectRatio < 1);
  const horizontalImages = processedImages.filter((image) => image.aspectRatio >= 1);

  // Pair vertical images initially
  const verticalPairs = [];
  for (let i = 0; i < verticalImages.length; i += 2) {
    verticalPairs.push([verticalImages[i], verticalImages[i + 1]]);
  }

  // Combine rows: alternate horizontal and vertical pairs
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

  // Insert text intelligently based on the `texts` prop
  const rowsWithText = [...combinedRows];
  Object.keys(texts).forEach((key) => {
    const position = parseInt(key, 10) - 1; // Convert to 0-based index
    const text = texts[key];

    if (rowsWithText[position]) {
      const row = rowsWithText[position];

      if (Array.isArray(row)) {
        // Row is a vertical pair
        const [firstImage, secondImage] = row;

        // Unpair the images and insert text between them
        rowsWithText.splice(position, 1, firstImage, { text }, secondImage);
      } else {
        // Row is a horizontal image
        rowsWithText.splice(position, 0, { text }); // Insert text as a separate row
      }
    }
  });

  // Re-pair vertical images after text insertion
  const finalRows = [];
  let tempVerticalImages = [];

  rowsWithText.forEach((row) => {
    if (row.text) {
      // Push any pending vertical images as pairs
      while (tempVerticalImages.length >= 2) {
        finalRows.push(tempVerticalImages.splice(0, 2));
      }

      // Push the text row
      finalRows.push(row);
    } else if (Array.isArray(row)) {
      // Push vertical pair directly
      finalRows.push(row);
    } else if (row.aspectRatio < 1) {
      // Collect vertical images
      tempVerticalImages.push(row);
    } else {
      // Push any pending vertical images as pairs before horizontal
      while (tempVerticalImages.length >= 2) {
        finalRows.push(tempVerticalImages.splice(0, 2));
      }

      // Push the horizontal image
      finalRows.push(row);
    }
  });

  // Push any remaining vertical images as pairs
  while (tempVerticalImages.length >= 2) {
    finalRows.push(tempVerticalImages.splice(0, 2));
  }

  // Push any remaining vertical image as a single row
  if (tempVerticalImages.length > 0) {
    finalRows.push(tempVerticalImages[0]);
  }

  return (
    <div className="pb-20">
      <div className={`${styles.stackedGallery}`}>
        {finalRows.map((entry, index) => (
          <div key={`row-${index}`} className="mb-8">
            {entry.text ? (
              // Render text
              <div className="text-center text-2xl md:text-4xl text-gray-800 max-w-3xl mx-auto py-20">{entry.text}</div>
            ) : Array.isArray(entry) ? (
              // Vertical pairs
              <div
                className="flex flex-row items-center justify-center gap-4"
                style={{
                  width: "72%",
                  margin: "0 auto", // Center pairs
                }}>
                {entry.map((image, idx) =>
                  image ? (
                    <div
                      key={`vertical-${index}-${idx}`}
                      className="relative flex justify-center"
                      style={{
                        width: "48%", // Adjusted for consistent spacing
                      }}
                      onClick={() => handleImageClick(image.src, images, router)}>
                      <img
                        src={getCloudimageUrl(image.src, {
                          width: 600, // Lazy-load resolution
                          quality: 85,
                        })}
                        alt=""
                        className="h-auto w-full object-cover shadow-lg rounded-3xl transition-opacity duration-500"
                      />
                    </div>
                  ) : null
                )}
              </div>
            ) : (
              // Horizontal image
              <div className="w-full flex justify-center relative" onClick={() => handleImageClick(entry.src, images, router)}>
                <img
                  src={getCloudimageUrl(entry.src, {
                    width: 1100, // Lazy-load resolution
                    quality: 85,
                  })}
                  alt=""
                  className="w-[72%] max-h-[calc(100vw * 0.35)] object-cover shadow-lg rounded-3xl transition-opacity duration-500"
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
