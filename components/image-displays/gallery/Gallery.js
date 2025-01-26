import React from "react";
import GalleryCover from "./gallery-cover/GalleryCover";
import MasonryGallery from "./masonry-gallery/MasonryGallery";
import StackedGallery from "./stacked-gallery/StackedGallery";

const Gallery = ({ name, description, blocks, enableSlideshow, enableClientView, onBackClick, onSlideshowClick, onClientLoginClick }) => {
  return (
    <div className="gallery-container">
      {/* Render the GalleryCover */}
      <GalleryCover name={name} description={description} enableSlideshow={enableSlideshow} enableClientView={enableClientView} onBackClick={onBackClick} onSlideshowClick={onSlideshowClick} onClientLoginClick={onClientLoginClick} />

      {/* Render the blocks */}
      <div className="space-y-10 px-4 md:px-8">
        {blocks.map((block, index) => {
          switch (block.type) {
            case "stacked":
              return (
                <div key={`block-${index}`} className="stacked-gallery-block">
                  <StackedGallery images={block.imageUrls || []} />
                </div>
              );

            case "masonry":
              return (
                <div key={`block-${index}`} className="masonry-gallery-block">
                  <MasonryGallery images={block.imageUrls || []} />
                </div>
              );

            case "text":
              return (
                <div key={`block-${index}`} className="text-block text-center text-2xl md:text-4xl text-gray-800 max-w-3xl mx-auto py-10">
                  {block.content}
                </div>
              );

            default:
              console.error(`Unsupported block type: ${block.type}`);
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default Gallery;
