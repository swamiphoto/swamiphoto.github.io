import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigating to Lightbox
import "./Photo.css";
import { useScrollContext } from "../../../hooks/ScrollContext";
import { generateUniqueId, imageMapping } from "../../../common/images"; // Import unique ID generator and image mapping

function Photo({ src, alt = "", layout = "default", caption = "", title = "", orientation = "horizontal", url = "#", onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isScrolled } = useScrollContext();
  const navigate = useNavigate();

  // Default click handler for opening the image in Lightbox
  const defaultClickHandler = () => {
    // Find the unique key for the current image
    const key = Object.keys(imageMapping).find((k) => imageMapping[k] === src);
    const uniqueId = generateUniqueId(key);

    if (uniqueId) {
      navigate(`/image/${uniqueId}`, { state: { previousImageUrls: [], nextImageUrls: [] } }); // You can modify previous/next URLs if needed
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
      onClick={onClick || defaultClickHandler} // Use custom handler if provided, otherwise use default handler
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
            onClick={onClick || defaultClickHandler} // Use custom handler if provided, otherwise use default handler
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className={`w-full xl:w-1/3 p-6 xl:pt-20 text-left font-medium font-geist-mono ${textColorClass}`}>
        <p className={`text-2xl font-bold ${textColorClass}`}>{title}</p>
        <p className={`text-lg mt-3 ${textColorClass}`}>{caption}</p>
      </div>
    </div>
  );

  return <div className={`flex justify-center items-center ${!isLoaded ? "animate-pulse" : ""}`}>{layout === "print" ? renderPrintLayout() : renderDefaultLayout()}</div>;
}

export default Photo;
