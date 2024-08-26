import React from "react";
import Gallery from "../../components/image-displays/gallery/Gallery";

const Recent = () => {
  return (
    <div>
      <Gallery name="Naga and Bharath" description="An evening hike in Sunlol Ridge" layout="horizontal" imagesFolderUrl="portraits/sunol" showCover={true} />
    </div>
  );
};

export default Recent;
