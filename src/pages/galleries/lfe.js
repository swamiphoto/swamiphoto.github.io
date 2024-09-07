import React from "react";
import Gallery from "../../components/image-displays/gallery/Gallery";

const LFE = () => {
  return (
    <div>
      <Gallery name="Golden Gate Bridge in Fog" description="A foggy evening in SF" layout="horizontal" imagesFolderUrl="landscapes/LFE" showCover={false} />
    </div>
  );
};

export default LFE;
