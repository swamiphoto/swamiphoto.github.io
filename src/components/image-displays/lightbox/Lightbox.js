import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineX } from "react-icons/hi";
import { imageMapping, generateUniqueId } from "../../../common/images";

const Lightbox = () => {
  const { imagePath } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { previousImageUrls = [], nextImageUrls = [] } = location.state || {};

  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    // Find the image URL from the unique ID
    const matchingImage = imageMapping[imagePath];
    if (matchingImage) {
      setCurrentImage(matchingImage);
    }
  }, [imagePath]);

  const goToPreviousImage = () => {
    if (previousImageUrls.length > 0) {
      const previousImage = previousImageUrls[previousImageUrls.length - 1];

      // Find the key for the previous image
      const previousKey = Object.keys(imageMapping).find((key) => imageMapping[key] === previousImage);
      const uniqueId = generateUniqueId(previousKey);

      navigate(`/image/${uniqueId}`, { state: { previousImageUrls: previousImageUrls.slice(0, -1), nextImageUrls: [currentImage, ...nextImageUrls] } });
    }
  };

  const goToNextImage = () => {
    if (nextImageUrls.length > 0) {
      const nextImage = nextImageUrls[0];

      // Find the key for the next image
      const nextKey = Object.keys(imageMapping).find((key) => imageMapping[key] === nextImage);
      const uniqueId = generateUniqueId(nextKey);

      navigate(`/image/${uniqueId}`, { state: { previousImageUrls: [...previousImageUrls, currentImage], nextImageUrls: nextImageUrls.slice(1) } });
    }
  };

  // Close the Lightbox and navigate to the previous page or default to "/"
  const handleClose = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from); // Go back to the referring page
    } else {
      navigate("/"); // Default to home if no referrer
    }
  };

  if (!currentImage) {
    return <div>Image not found</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <button className="absolute top-4 right-4 text-white text-3xl p-2 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out z-60" onClick={handleClose} style={{ zIndex: 60 }}>
        <HiOutlineX />
      </button>
      <div className="relative w-full h-full flex items-center justify-center p-5">
        <img src={currentImage + "?width=1300"} alt="Current Image" className="max-h-full max-w-full object-contain" />
        {previousImageUrls.length > 0 && (
          <button onClick={goToPreviousImage} className="absolute left-4 text-white text-4xl p-2">
            <HiOutlineArrowLeft />
          </button>
        )}
        {nextImageUrls.length > 0 && (
          <button onClick={goToNextImage} className="absolute right-4 text-white text-4xl p-2">
            <HiOutlineArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
