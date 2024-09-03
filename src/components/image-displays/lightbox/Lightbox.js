import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineX } from "react-icons/hi";
import { imageMapping, generateUniqueId } from "../../../common/images";

const Lightbox = () => {
  const { imagePath } = useParams(); // This should be the unique ID
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    // Find the image URL from the unique ID
    const matchingImage = imageMapping[imagePath];
    if (matchingImage) {
      setCurrentImage(matchingImage);
    }
  }, [imagePath]);

  const handleClose = () => {
    navigate(-1); // Go back to the previous page
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
      </div>
    </div>
  );
};

export default Lightbox;
