import React from "react";
import Gallery from "../../components/image-displays/gallery/Gallery";

const NagaSunol = () => {
  return (
    <div>
      <Gallery name="Naga and Bharath" description="An evening hike in Sunlol Ridge" layout="masonry" imagesFolderUrl="portraits/sunol" showCover={false} />
    </div>
  );
};

export default NagaSunol;
