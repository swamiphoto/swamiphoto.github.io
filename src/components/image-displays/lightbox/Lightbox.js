import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";
import { imageMapping, generateUniqueId } from "../../../common/images";

const Lightbox = () => {
  const { imagePath } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { previousImageUrls = [], nextImageUrls = [] } = location.state || {};

  const [currentImage, setCurrentImage] = useState(null);
  const [cursorType, setCursorType] = useState("default");
  const [isMiddleSection, setIsMiddleSection] = useState(false);

  useEffect(() => {
    // Find the image URL from the unique ID
    const matchingImage = imageMapping[imagePath];
    if (matchingImage) {
      setCurrentImage(matchingImage);
    }
  }, [imagePath]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Define middle 60% section of the screen
      const isInMiddleSection = mouseY > containerHeight * 0.2 && mouseY < containerHeight * 0.8;
      setIsMiddleSection(isInMiddleSection);

      if (isInMiddleSection) {
        if (mouseX < containerWidth / 2 && previousImageUrls.length > 0) {
          // Show left arrow only if there are previous images
          setCursorType("left");
        } else if (mouseX >= containerWidth / 2 && nextImageUrls.length > 0) {
          // Show right arrow only if there are next images
          setCursorType("right");
        } else {
          // Default cursor if no previous or next images are available
          setCursorType("default");
        }
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [previousImageUrls, nextImageUrls]);

  const handleClick = () => {
    if (cursorType === "left" && previousImageUrls.length > 0) {
      const previousImage = previousImageUrls[previousImageUrls.length - 1];

      // Find the key for the previous image
      const previousKey = Object.keys(imageMapping).find((key) => imageMapping[key] === previousImage);
      const uniqueId = generateUniqueId(previousKey);

      navigate(`/image/${uniqueId}`, { state: { previousImageUrls: previousImageUrls.slice(0, -1), nextImageUrls: [currentImage, ...nextImageUrls] } });
    }

    if (cursorType === "right" && nextImageUrls.length > 0) {
      const nextImage = nextImageUrls[0];

      // Find the key for the next image
      const nextKey = Object.keys(imageMapping).find((key) => imageMapping[key] === nextImage);
      const uniqueId = generateUniqueId(nextKey);

      navigate(`/image/${uniqueId}`, { state: { previousImageUrls: [...previousImageUrls, currentImage], nextImageUrls: nextImageUrls.slice(1) } });
    }
  };

  // Close the Lightbox and navigate to the previous page or default to "/"
  const handleClose = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent container
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
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={handleClick} // Enable clicking on the left and right cursor area
      style={{
        cursor: cursorType === "left" ? 'url("/left-arrow.svg") 24 24, auto' : cursorType === "right" ? 'url("/right-arrow.svg") 24 24, auto' : "default",
      }}>
      <button
        className="absolute top-4 right-4 text-white text-3xl p-2 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out z-60"
        onClick={handleClose} // Stop event propagation
        style={{ zIndex: 60 }}>
        <HiOutlineX />
      </button>
      <div className="relative w-full h-full flex items-center justify-center p-5">
        <img src={currentImage + "?width=1300"} alt="Current Image" className="max-h-full max-w-full object-contain" />
      </div>
    </div>
  );
};

export default Lightbox;
