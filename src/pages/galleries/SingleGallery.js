import React from "react";
import { useParams } from "react-router-dom";
import Gallery from "../../components/image-displays/gallery/Gallery";
import { galleryData } from "./Galleries"; // Use galleryData from Galleries.js

const SingleGallery = () => {
  const { gallerySlug } = useParams();
  const gallery = galleryData.find((g) => g.slug === gallerySlug);
  if (!gallery) {
    return <div>Gallery not found</div>;
  }

  return <Gallery name={gallery.name} description={gallery.description} layout={gallery.layout} imagesFolderUrl={gallery.imagesFolderUrl} showCover={gallery.showCover} />;
};

export default SingleGallery;
