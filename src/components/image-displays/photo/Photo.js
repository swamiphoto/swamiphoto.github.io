import React, { useState } from "react";
import "./Photo.css";
import CustomButton from "../../custom-button/CustomButton";
import { useScrollContext } from "../../../hooks/ScrollContext";

function Photo({ src, alt = "", layout = "default", caption = "", title = "", orientation = "horizontal", url = "#" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isScrolled } = useScrollContext();
  const srcResized = src + "?width=1300";

  const textColorClass = isScrolled ? "text-gray-400" : "text-gray-700";
  const imageClass = orientation === "vertical" ? "vertical-image" : "horizontal-image";

  const renderDefaultLayout = () => <img src={srcResized} alt={alt} loading="lazy" className={`transition-opacity duration-500 ease-in-out ${imageClass} mb-4 md:mb-10 ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setIsLoaded(true)} />;

  const renderPrintLayout = () => (
    <div className="flex flex-col xl:flex-row mb-10">
      <div className="w-full xl:w-2/3 flex justify-end p-0 xl:pl-6">
        <div className="md:m-3 max-w-full xl:max-w-[calc(100%-60px)]">
          <img src={srcResized} alt={alt} loading="lazy" className={`xl:max-h-screen shadow-lg transition-opacity duration-500 ease-in-out ${imageClass} ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setIsLoaded(true)} />
        </div>
      </div>

      <div className={`w-full xl:w-1/3 p-6 xl:pt-20 text-left font-medium font-geist-mono ${textColorClass}`}>
        <p className={`text-2xl font-bold ${textColorClass}`}>{title}</p>
        <p className={`text-lg mt-3 ${textColorClass}`}>{caption}</p>
        <p className="mt-6">
          <CustomButton label="Buy a Print" url={url} small={true} className="mt-4" />
        </p>
      </div>
    </div>
  );

  return <div className={`flex justify-center items-center ${!isLoaded ? "animate-pulse" : ""}`}>{layout === "print" ? renderPrintLayout() : renderDefaultLayout()}</div>;
}

export default Photo;
