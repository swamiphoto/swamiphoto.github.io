import React, { useEffect, useState } from "react";
import MasonryGallery from "./masonry-gallery/MasonryGallery";
import HorizontalGallery from "./horizontal-gallery/HorizontalGallery";
import AdminGallery from "./admin-gallery/AdminGallery";
import { useRouter } from "next/router";
import StackedGallery from "./stacked-gallery/StackedGallery";
import GalleryCover from "./gallery-cover/GalleryCover";

const Gallery = ({ layout = "stacked", name, images, description, slug, showCover = true, enableSlideshow = false, enableClientView = false, clientView = false, setIsModalOpen, handleExitClientView }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Check for the presence of the `admin` query parameter
  useEffect(() => {
    if (router.isReady) {
      setIsAdmin(router.query.admin !== undefined);
    }
  }, [router.isReady, router.query.admin]);

  const handleBackClick = () => {
    router.push("/galleries");
  };

  const handleSlideshowClick = () => {
    if (slug) {
      router.push(`/galleries/${slug}/slideshow`);
    } else {
      console.error("Gallery slug is undefined");
    }
  };

  const handleClientLoginClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="gallery-container relative">
      {showCover && <GalleryCover name={name} description={description} enableSlideshow={enableSlideshow} enableClientView={enableClientView} onBackClick={handleBackClick} onSlideshowClick={handleSlideshowClick} onClientLoginClick={handleClientLoginClick} />}

      <div>
        {isAdmin ? (
          <AdminGallery images={images} name={name} description={description} showCover={showCover} />
        ) : layout === "stacked" ? (
          <StackedGallery images={images} name={name} description={description} showCover={false} />
        ) : layout === "masonry" ? (
          <MasonryGallery images={images} name={name} description={description} showCover={false} />
        ) : (
          <HorizontalGallery images={images} name={name} description={description} showCover={false} />
        )}
      </div>
    </div>
  );
};

export default Gallery;
