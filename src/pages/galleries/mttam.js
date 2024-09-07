import React from "react";
import Gallery from "../../components/image-displays/gallery/Gallery";

const MtTam = () => {
  return (
    <div>
      <Gallery name="Mt. Tam" description="Fog in Mt Tam" layout="horizontal" imagesFolderUrl="landscapes/mttam" showCover={false} />
    </div>
  );
};

export default MtTam;
