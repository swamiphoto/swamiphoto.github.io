import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Photo.css";
import { useScrollContext } from "../../../hooks/ScrollContext";
import { generateUniqueId, imageMapping, base64Encode } from "../../../common/images"; // Ensure correct imports

function Photo({ src, alt = "", layout = "default", caption = "", title = "", orientation = "horizontal", captionDesign = "design1", allPhotos = [] }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isScrolled } = useScrollContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine alt text based on available title or caption if alt is not provided
  const imageAltText = alt || title || caption || "© 2024 Swami Venkataramani";

  // Click handler for opening the image in Lightbox
  const defaultClickHandler = () => {
    // Check if the src exists in the imageMapping
    const key = Object.keys(imageMapping).find((k) => imageMapping[k] === src);
    const uniqueId = key ? generateUniqueId(key) : null;

    let finalUrl = null;

    if (uniqueId) {
      // Use the unique ID if we found it in the mapping
      finalUrl = base64Encode(uniqueId);
    } else {
      // Fallback to using the raw URL if there's no uniqueId
      finalUrl = base64Encode(src);
    }

    if (finalUrl) {
      let previousImageUrls = [];
      let nextImageUrls = [];

      // Only calculate previous/next images if allPhotos is provided
      if (allPhotos.length > 0) {
        const currentIndex = allPhotos.indexOf(src);
        previousImageUrls = allPhotos.slice(0, currentIndex); // Previous images
        nextImageUrls = allPhotos.slice(currentIndex + 1); // Next images
      }

      // Use navigate with the encoded URL
      navigate(`/image/${finalUrl}`, { state: { previousImageUrls, nextImageUrls, from: location.pathname } });
    }
  };

  const imageClass = orientation === "vertical" ? "vertical-image" : "horizontal-image";

  // Function to render caption based on design
  const renderCaption = () => {
    if (captionDesign === "design1") {
      return <p className={`my-4 font-medium text-sm md:text-xl italic max-w-3xl mx-auto`}>{caption}</p>;
    } else if (captionDesign === "design2") {
      return <p className={`my-4 font-bold text-sm md:text-lg tracking-widest uppercase text-red-600 max-w-3xl mx-auto`}>{caption}</p>;
    }
    return null;
  };

  const renderDefaultLayout = () => (
    <div className="text-center mb-4 md:mb-10">
      <img
        src={src + "?width=1300"}
        alt={imageAltText} // Use fallback for alt
        loading="lazy"
        className={`transition-opacity duration-500 ease-in-out ${imageClass} ${isLoaded ? "opacity-100" : "opacity-0"} shadow-lg`}
        onLoad={() => setIsLoaded(true)}
        onClick={defaultClickHandler} // Use default handler
        style={{ cursor: "pointer" }}
      />
      {caption && renderCaption()} {/* Render caption based on design */}
    </div>
  );

  const renderPrintLayout = () => (
    <div className="flex flex-col xl:flex-row mb-10">
      <div className="w-full xl:w-2/3 flex justify-end p-0 xl:pl-6">
        <div className="md:m-3 max-w-full xl:max-w-[calc(100%-60px)]">
          <img
            src={src + "?width=1300"}
            alt={imageAltText} // Use fallback for alt
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
