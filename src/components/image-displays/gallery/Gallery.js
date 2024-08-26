import React from "react";
import MasonryGallery from "./masonry-gallery/MasonryGallery";
import HorizontalGallery from "./horizontal-gallery/HorizontalGallery";

const Gallery = (props) => {
  const { layout = "horizontal" } = props;

  return layout === "masonry" ? <MasonryGallery {...props} /> : <HorizontalGallery {...props} />;
};

export default Gallery;
