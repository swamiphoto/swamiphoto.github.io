import React from "react";
import "./Cover.css";

const Cover = ({ isMobile, imagesLoaded, imageUrls, handleStartClick, title, subtitle }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-cover bg-center z-50 w-full h-full">
    {isMobile ? (
      <div className="block md:hidden fixed inset-0 flex items-center justify-center bg-black text-gray-300 text-lg font-geist-mono p-4">
        <p className="text-center">This gallery is not available on mobile yet. Please view on a computer.</p>
      </div>
    ) : !imagesLoaded ? (
      <div className="flex items-center justify-center w-full h-full bg-black text-gray-300 text-2xl font-geist-mono">Preparing your show...please turn your sound on!</div>
    ) : (
      <>
        <div className="absolute inset-0 w-full h-full bg-black z-10"></div> {/* Fullscreen black layer */}
        <img src={imageUrls[4]} alt="" className="absolute inset-0 w-full h-full object-cover z-20 fade-in" />
        <div className="overlay absolute inset-0 bg-black opacity-60 z-30"></div>
        <div className="text-center text-white p-4 z-40 fade-in">
          <h1 className="text-6xl mb-2 font-extrabold tracking-tight">{title}</h1>
          <p className="text-xl mb-4 text-gray-300">{subtitle}</p>
          <button onClick={handleStartClick} className="hidden md:inline-block bg-white text-black text-2xl px-10 py-4 rounded-full opacity-60 hover:opacity-75 mt-7">
            Start the Show
          </button>
        </div>
      </>
    )}
  </div>
);

export default Cover;
