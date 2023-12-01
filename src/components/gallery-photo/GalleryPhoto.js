import React from "react";

const GalleryPhoto = ({ src, caption, author }) => {
  return (
    <div className="snap-start w-screen h-screen flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-xl h-5/6 flex flex-col justify-between">
        <img src={src} alt={caption} className="w-full h-4/5 object-cover rounded-lg" />
        <div>
          <p className="text-xl font-semibold mb-3">{caption}</p>
          <p className="text-md">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryPhoto;
