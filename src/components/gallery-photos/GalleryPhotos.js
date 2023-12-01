import React from "react";

const GalleryPhotos = ({ children }) => {
  const scrollContainerRef = React.useRef(null);

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
    }
  };

  return <div className="flex overflow-x-scroll snap-mandatory snap-x h-screen w-screen">{children}</div>;
};

export default GalleryPhotos;
