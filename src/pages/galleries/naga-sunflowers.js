import React from "react";
import Gallery from "../../components/image-displays/gallery/Gallery";

const NagaSunflowers = () => {
  return (
    <div>
      <Gallery name="Sunflowers with Naga" description="A dreamy evening with the sunflowers in Woodland." layout="horizontal" imagesFolderUrl="portraits/naga-sunflowers" showCover={true} />
    </div>
  );
};

export default NagaSunflowers;
