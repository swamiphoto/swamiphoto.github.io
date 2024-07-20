import React, { useEffect } from "react";
import "./StackLayout.css";

const StackLayout = ({ imageUrls, onLoadMore, gridPreloadThreshold }) => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - gridPreloadThreshold) {
      onLoadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="grid-container">
      {imageUrls.map((url, index) => (
        <div key={index} className={`grid-item shadow-lg`}>
          <img src={url} alt={`Image ${index + 1}`} className="object-cover" />
        </div>
      ))}
    </div>
  );
};

export default StackLayout;
