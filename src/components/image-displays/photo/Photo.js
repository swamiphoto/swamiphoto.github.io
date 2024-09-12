import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Photo.css";
import { useScrollContext } from "../../../hooks/ScrollContext";
import { generateUniqueId, imageMapping, base64Encode } from "../../../common/images"; // Ensure correct imports

function Photo({ src, alt = "", layout = "default", caption = "", title = "", orientation = "horizontal", allPhotos = [] }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isScrolled } = useScrollContext();
  const navigate = useNavigate();

  // Click handler for opening the image in Lightbox
  const defaultClickHandler = () => {
    const key = Object.keys(imageMapping).find((k) => imageMapping[k] === src);
    const uniqueId = generateUniqueId(key);

    if (uniqueId) {
      let previousImageUrls = [];
      let nextImageUrls = [];

      // Only calculate previous/next images if allPhotos is provided
      if (allPhotos.length > 0) {
        const currentIndex = allPhotos.indexOf(src);
        previousImageUrls = allPhotos.slice(0, currentIndex); // Previous images
        nextImageUrls = allPhotos.slice(currentIndex + 1); // Next images
      }

      // Use navigate with properly encoded URL
      const encodedUniqueId = base64Encode(uniqueId);
      navigate(`/image/${encodedUniqueId}`, { state: { previousImageUrls, nextImageUrls } });
    }
  };

  const textColorClass = isScrolled ? "text-gray-400" : "text-gray-700";
  const imageClass = orientation === "vertical" ? "vertical-image" : "horizontal-image";

  const renderDefaultLayout = () => (
    <img
      src={src + "?width=1300"}
      alt={alt}
      loading="lazy"
      className={`transition-opacity duration-500 ease-in-out ${imageClass} mb-4 md:mb-10 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      onLoad={() => setIsLoaded(true)}
      onClick={defaultClickHandler} // Use default handler
      style={{ cursor: "pointer" }}
    />
  );

  const renderPrintLayout = () => (
    <div className="flex flex-col xl:flex-row mb-10">
      <div className="w-full xl:w-2/3 flex justify-end p-0 xl:pl-6">
        <div className="md:m-3 max-w-full xl:max-w-[calc(100%-60px)]">
          <img
            src={src + "?width=1300"}
            alt={alt}
            loading="lazy"
            className={`xl:max-h-screen shadow-lg transition-opacity duration-500 ease-in-out ${imageClass} ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsLoaded(true)}
            onClick={defaultClickHandler} // Use default handler
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className={`w-full xl:w-1/3 p-6 xl:pt-20 text-left`}>
        <p className={`text-2xl font-bold`}>{title}</p>
        <p className={`text-lg mt-3`}>{caption}</p>
      </div>
    </div>
  );

  return <div className={`flex justify-center items-center ${!isLoaded ? "animate-pulse" : ""}`}>{layout === "print" ? renderPrintLayout() : renderDefaultLayout()}</div>;
}

export default Photo;
